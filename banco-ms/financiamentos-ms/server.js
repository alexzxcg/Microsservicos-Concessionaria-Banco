const app = require('./src/app.js');
const { startConsultaFinanciamentosConsumer,
  startConsultaFinanciamentoPorIdConsumer,
  startRespostaContaConsumer,
  startRespostaDadosContaParaAprovarFinanciamento,
  startRespostaAtualizaSaldoConta,
} = require('./src/consumers/consultaFinanciamentosConsumer');

const PORT = 3001;

startConsultaFinanciamentosConsumer();
startConsultaFinanciamentoPorIdConsumer();
startRespostaContaConsumer();
startRespostaDadosContaParaAprovarFinanciamento();
startRespostaAtualizaSaldoConta();

app.listen(PORT, () => {
  console.log('servidor escutando!');
});