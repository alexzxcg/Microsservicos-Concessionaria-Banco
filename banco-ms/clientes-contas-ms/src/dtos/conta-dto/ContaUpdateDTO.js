class ContaUpdateDTO {
    constructor(conta) {
        this.numero = conta.numero;
        this.agencia = conta.agencia;
        this.tipo = conta.tipo;
        this.ativa = conta.ativa;
    }
}

module.exports = ContaUpdateDTO;