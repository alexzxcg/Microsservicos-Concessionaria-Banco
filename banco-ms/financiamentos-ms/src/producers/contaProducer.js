const { getChannel } = require('../config/rabbitmq');
const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middlewares/erro/errorHandler.js');
const pendingRequests = require('../utils/pendingRequests');

async function buscaContaPorNumero(numeroConta) {
  const channel = await getChannel();
  const correlationId = uuidv4();
  const respostaFila = 'resposta_dados_conta';

  await channel.assertQueue(respostaFila, { durable: false });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(correlationId);
      reject(new AppError('Timeout ao buscar conta', 504));
    }, 5000);

    pendingRequests.set(correlationId, { resolve, reject, timeout });

    const payload = { numeroConta };

    channel.sendToQueue(
      'consulta_dados_conta',
      Buffer.from(JSON.stringify(payload)),
      {
        correlationId,
        replyTo: respostaFila,
      }
    );
  });
}

async function consultaDadosContaParaAprovarFinanciamento(contaId) {
  const channel = await getChannel();
  const correlationId = uuidv4();
  const respostaFila = 'resposta_dados_conta_para_financiamento';

  await channel.assertQueue(respostaFila, { durable: false });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(correlationId);
      reject(new AppError('Timeout ao obter dados da conta', 504));
    }, 5000);

    pendingRequests.set(correlationId, { resolve, reject, timeout });

    const payload = { contaId };

    channel.sendToQueue(
      'solicita_dados_conta_para_financiamento',
      Buffer.from(JSON.stringify(payload)),
      {
        correlationId,
        replyTo: respostaFila
      }
    );
  });
}

async function atualizaSaldoDaConta(contaId, novoSaldo) {
  const channel = await getChannel();
  const correlationId = uuidv4();
  const respostaFila = 'resposta_atualiza_saldo_conta';

  await channel.assertQueue(respostaFila, { durable: false });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(correlationId);
      reject(new AppError('Timeout ao tentar atualizar o saldo da conta', 504));
    }, 5000);

    pendingRequests.set(correlationId, { resolve, reject, timeout });

    const payload = { contaId, novoSaldo };

    channel.sendToQueue(
      'atualiza_saldo_conta',
      Buffer.from(JSON.stringify(payload)),
      {
        correlationId,
        replyTo: respostaFila,
      }
    );
  });
}

module.exports = { buscaContaPorNumero, consultaDadosContaParaAprovarFinanciamento, atualizaSaldoDaConta };