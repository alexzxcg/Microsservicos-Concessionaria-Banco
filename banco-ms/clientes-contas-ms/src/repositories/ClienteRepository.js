const Repository = require('./Repository');
const { Cliente } = require('../models');

class ClienteRepository extends Repository {
    constructor() {
        super(Cliente);
    }

    async findWithContas(clienteId, contaId = null) {
        const includeOptions = contaId
            ? { where: { id: contaId } }
            : undefined;

        const cliente = await this.model.findByPk(clienteId);
        if (!cliente) return null;

        const contas = await cliente.getContas(includeOptions);
        return contas || [];
    }
}

module.exports = new ClienteRepository();
