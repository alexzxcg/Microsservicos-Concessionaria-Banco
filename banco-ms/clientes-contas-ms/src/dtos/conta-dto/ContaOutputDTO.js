class ContaOutputDTO {
    constructor(conta) {
        this.id = conta.id;
        this.numero = conta.numero;
        this.agencia = conta.agencia;
        this.tipo = conta.tipo;
        this.saldo = conta.saldo;
        this.ativa = conta.ativa;
    }
}

module.exports = ContaOutputDTO;