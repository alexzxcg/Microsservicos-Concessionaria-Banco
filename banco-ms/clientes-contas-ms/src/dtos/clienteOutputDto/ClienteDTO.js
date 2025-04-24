class ClienteDTO {
    constructor(cliente) {
        this.id = cliente.id;
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.cpf = cliente.cpf;
        this.renda_mensal = cliente.renda_mensal;
        this.data_nascimento = cliente.data_nascimento;
        this.telefone = cliente.telefone;
        this.rua = cliente.rua;
        this.numero = cliente.numero;
        this.bairro = cliente.bairro;
        this.cidade = cliente.cidade;
        this.estado = cliente.estado;
        this.cep = cliente.cep;
    }
}

module.exports = ClienteDTO;