const { getChannel } = require('../config/rabbitmq');
const ContaServices = require('../services/ContaServices');
const pendingRequests = require('../utils/pendingRequests');

const contaService = new ContaServices();

async function startRespostaFinanciamentoPorIdConsumer() {
  const channel = await getChannel();
  const respostaFila = 'resposta_financiamento_por_id';

  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(respostaFila, (msg) => {
    const correlationId = msg.properties.correlationId;
    const dados = JSON.parse(msg.content.toString());

    if (pendingRequests.has(correlationId)) {
      const { resolve, reject, timeout } = pendingRequests.get(correlationId);
      clearTimeout(timeout);
      channel.ack(msg);

      if (dados.error || !dados.id) {
        reject(new Error(dados.error || 'Financiamento não encontrado'));
      } else {
        resolve(dados);
      }

      pendingRequests.delete(correlationId);
    } else {
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Consumer de resposta_financiamento_por_id iniciado.');
}

async function startRespostaFinanciamentosConsumer() {
  const channel = await getChannel();
  const respostaFila = 'resposta_financiamentos';

  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(respostaFila, (msg) => {
    const correlationId = msg.properties.correlationId;
    const dados = JSON.parse(msg.content.toString());

    if (pendingRequests.has(correlationId)) {
      const { resolve, reject, timeout } = pendingRequests.get(correlationId);
      clearTimeout(timeout);
      channel.ack(msg);

      if (dados.error || !Array.isArray(dados)) {
        reject(new Error(dados.error || 'Financiamentos não encontrados'));
      } else {
        resolve(dados);
      }

      pendingRequests.delete(correlationId);
    } else {
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('✅ Consumer de resposta_financiamentos iniciado.');
}

async function startConsultaContaConsumer() {
  const channel = await getChannel();
  const fila = 'consulta_dados_conta';

  await channel.assertQueue(fila, { durable: false });

  channel.consume(fila, async (msg) => {
    try {
      const { numeroConta } = JSON.parse(msg.content.toString());
      const conta = await contaService.buscarContaPorNumero(numeroConta);
      const resposta = JSON.stringify(conta);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(resposta),
        { correlationId: msg.properties.correlationId }
      );
    } catch (error) {
      const respostaErro = JSON.stringify({ erro: error.message });

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(respostaErro),
        { correlationId: msg.properties.correlationId }
      );
    } finally {
      channel.ack(msg);
    }
  });

  console.log(`Consumer "consulta_dados_conta" iniciado.`);
}

async function startConsultaDadosContaParaFinanciamentoConsumer() {
  const channel = await getChannel();
  const fila = 'solicita_dados_conta_para_financiamento';

  await channel.assertQueue(fila, { durable: false });

  channel.consume(fila, async (msg) => {
    try {
      const { contaId } = JSON.parse(msg.content.toString());
      const dados = await contaService.buscaDadosParaFinanciamento(contaId);
      console.log('Dados da conta para financiamento:', dados);
      const resposta = JSON.stringify(dados);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(resposta),
        { correlationId: msg.properties.correlationId }
      );
    } catch (error) {
      const respostaErro = JSON.stringify({ erro: error.message });

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(respostaErro),
        { correlationId: msg.properties.correlationId }
      );
    } finally {
      channel.ack(msg);
    }
  });

  console.log(`Consumer "solicita_dados_conta_para_financiamento" iniciado.`);
}

async function startAtualizaSaldoContaConsumer() {
  const channel = await getChannel();
  const fila = 'atualiza_saldo_conta';

  await channel.assertQueue(fila, { durable: false });

  channel.consume(fila, async (msg) => {
    try {
      const { contaId, novoSaldo } = JSON.parse(msg.content.toString());
      const resultado = await contaService.alterarSaldo(contaId, novoSaldo);
      const resposta = JSON.stringify(resultado);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(resposta),
        { correlationId: msg.properties.correlationId }
      );
    } catch (error) {
      const respostaErro = JSON.stringify({ erro: error.message });

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(respostaErro),
        { correlationId: msg.properties.correlationId }
      );
    } finally {
      channel.ack(msg);
    }
  });

  console.log(`Consumer "atualiza_saldo_conta" iniciado.`);
}

module.exports = {
  startConsultaContaConsumer,
  startConsultaDadosContaParaFinanciamentoConsumer,
  startAtualizaSaldoContaConsumer,
  startRespostaFinanciamentoPorIdConsumer,
  startRespostaFinanciamentosConsumer,
};
