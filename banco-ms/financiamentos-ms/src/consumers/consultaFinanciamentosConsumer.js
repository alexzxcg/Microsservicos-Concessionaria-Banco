const { getChannel } = require('../config/rabbitmq');
const FinanciamentoServices = require('../services/FinanciamentoServices.js');
const pendingRequests = require('../utils/pendingRequests');

const financiamentoServices = new FinanciamentoServices();

async function startRespostaContaConsumer() {
  const channel = await getChannel();
  const respostaFila = 'resposta_dados_conta';

  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(respostaFila, (msg) => {
    const correlationId = msg.properties.correlationId;
    const dados = JSON.parse(msg.content.toString());

    if (pendingRequests.has(correlationId)) {
      const { resolve, reject, timeout } = pendingRequests.get(correlationId);

      clearTimeout(timeout);
      channel.ack(msg);

      if (!dados || dados.error || !dados.id) {
        reject(new Error(dados?.error || 'Conta não encontrada'));
      } else {
        resolve(dados);
      }

      pendingRequests.delete(correlationId);
    } else {
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Consumer de resposta_dados_conta iniciado.');
}

async function startRespostaDadosContaParaAprovarFinanciamento() {
  const channel = await getChannel();
  const respostaFila = 'resposta_dados_conta_para_financiamento';

  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(respostaFila, (msg) => {
    const correlationId = msg.properties.correlationId;
    const dados = JSON.parse(msg.content.toString());

    if (pendingRequests.has(correlationId)) {
      const { resolve, reject, timeout } = pendingRequests.get(correlationId);
      clearTimeout(timeout);
      channel.ack(msg);

      if (dados.erro) {
        console.warn('⚠️ Erro recebido ou dados incompletos:', dados);
        reject(new Error(dados.erro || 'Dados da conta não encontrados'));
      } else {
        resolve(dados);
      }

      pendingRequests.delete(correlationId);
    } else {
      console.warn('⚠️ CorrelationId não encontrado em pendingRequests');
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Consumer de resposta_dados_conta_para_financiamento iniciado.');
}

async function startRespostaAtualizaSaldoConta() {
  const channel = await getChannel();
  const respostaFila = 'resposta_atualiza_saldo_conta';

  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(respostaFila, (msg) => {
    const correlationId = msg.properties.correlationId;
    const resposta = JSON.parse(msg.content.toString());

    if (pendingRequests.has(correlationId)) {
      const { resolve, reject, timeout } = pendingRequests.get(correlationId);
      clearTimeout(timeout);
      channel.ack(msg);

      if (resposta.erro) {
        reject(new Error(resposta.erro || 'Erro ao atualizar saldo da conta'));
      } else {
        resolve(resposta);
      }

      pendingRequests.delete(correlationId);
    } else {
      // Mensagem inesperada
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log('Consumer de resposta_atualiza_saldo_conta iniciado.');
}

async function startConsultaFinanciamentosConsumer() {
  const channel = await getChannel();
  const fila = 'consulta_financiamentos';

  await channel.assertQueue(fila, { durable: false });

  channel.consume(fila, async (msg) => {
    try {
      const { contaId } = JSON.parse(msg.content.toString());

      const financiamentos = await financiamentoServices.buscaTodosOsRegistros(contaId);

      const resposta = JSON.stringify(financiamentos);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(resposta),
        {
          correlationId: msg.properties.correlationId
        }
      );
    } catch (error) {
      console.error('Erro no processamento da fila:', error);
      const respostaErro = JSON.stringify({ erro: error.message });

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(respostaErro),
        {
          correlationId: msg.properties.correlationId
        }
      );
    } finally {
      channel.ack(msg);
    }
  });

  console.log(`Consumer "consulta_financiamentos" iniciado.`);
}

async function startConsultaFinanciamentoPorIdConsumer() {
  const channel = await getChannel();

  const consultaFila = 'consulta_financiamento_por_id';
  await channel.assertQueue(consultaFila, { durable: false });

  const respostaFila = 'resposta_financiamento_por_id';
  await channel.assertQueue(respostaFila, { durable: false });

  channel.consume(consultaFila, async (msg) => {
    const { contaId, financiamentoId } = JSON.parse(msg.content.toString());
    const correlationId = msg.properties.correlationId;

    try {
      const financiamento = await financiamentoServices.buscaUmPorId(contaId, financiamentoId);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(financiamento)),
        { correlationId }
      );

      channel.ack(msg);
    } catch (error) {
      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify({ error: error.message })),
        { correlationId }
      );
      channel.ack(msg);
    }
  }, { noAck: false });

  console.log(`Consumer "consulta_financiamento_por_id" iniciado.`);
}

module.exports = {
  startConsultaFinanciamentosConsumer,
  startConsultaFinanciamentoPorIdConsumer,
  startRespostaContaConsumer,
  startRespostaDadosContaParaAprovarFinanciamento,
  startRespostaAtualizaSaldoConta,
};