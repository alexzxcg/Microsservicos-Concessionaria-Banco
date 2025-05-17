const app = require('./src/app.js');
const { startConsultaContaConsumer,
  startConsultaDadosContaParaFinanciamentoConsumer,
  startAtualizaSaldoContaConsumer,
  startRespostaFinanciamentoPorIdConsumer,
  startRespostaFinanciamentosConsumer
} = require('./src/consumers/consultarContaConsumer.js');

const PORT = 3000;

startConsultaContaConsumer();
startConsultaDadosContaParaFinanciamentoConsumer();
startAtualizaSaldoContaConsumer();
startRespostaFinanciamentoPorIdConsumer();
startRespostaFinanciamentosConsumer();

app.listen(PORT, () => {
  console.log('servidor escutando!');
});
