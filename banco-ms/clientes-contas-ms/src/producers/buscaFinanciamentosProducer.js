const { getChannel } = require('../config/rabbitmq');
const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middlewares/erro/errorHandler.js');
const pendingRequests = require('../utils/pendingRequests');

async function buscarFinanciamentosPorConta(contaId) {
  const channel = await getChannel();
  const correlationId = uuidv4();
  const respostaFila = 'resposta_financiamentos';

  await channel.assertQueue(respostaFila, { durable: false });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new AppError('Timeout ao buscar financiamentos', 504));
    }, 5000);

    pendingRequests.set(correlationId, { resolve, reject, timeout });

    const payload = { contaId };

    channel.sendToQueue(
      'consulta_financiamentos',
      Buffer.from(JSON.stringify(payload)),
      {
        correlationId,
        replyTo: respostaFila,
      }
    );
  });
}

async function buscarFinanciamentoPorId(contaId, financiamentoId) {
  const channel = await getChannel();
  const correlationId = uuidv4();
  const consultaFila = 'consulta_financiamento_por_id';
  const payload = { contaId, financiamentoId };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(correlationId);
      reject(new AppError('Timeout ao buscar financiamento por ID', 504));
    }, 5000);

    pendingRequests.set(correlationId, { resolve, reject, timeout });

    channel.sendToQueue(
      consultaFila,
      Buffer.from(JSON.stringify(payload)),
      {
        correlationId,
        replyTo: 'resposta_financiamento_por_id',
      }
    );
  });
}

module.exports = {
  buscarFinanciamentosPorConta,
  buscarFinanciamentoPorId,
};