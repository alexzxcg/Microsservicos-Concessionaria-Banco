const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  return channel;
}

async function getChannel() {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };