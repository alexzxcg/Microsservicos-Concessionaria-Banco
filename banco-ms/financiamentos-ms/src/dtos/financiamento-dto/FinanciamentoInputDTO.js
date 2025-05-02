class FinanciamentoInputDTO {
    constructor({ numeroConta, valorTotalFinanciamento, numeroDeParcelas, tipoFinanciamento, valorEntrada = 0.00 }) {
      this.numeroConta = numeroConta;
      this.valorTotalFinanciamento = Number(valorTotalFinanciamento);
      this.numeroDeParcelas = Number(numeroDeParcelas);
      this.tipoFinanciamento = tipoFinanciamento;
      this.valorEntrada = Number(valorEntrada);
    }
  }
  
  module.exports = FinanciamentoInputDTO;
  