class ContaInputDTO {
    constructor({ numero, agencia, tipo, clienteId }) {
      this.numero = numero;
      this.agencia = agencia;
      this.tipo = tipo;
      this.clienteId = clienteId;
    }
  }
  
module.exports = ContaInputDTO;