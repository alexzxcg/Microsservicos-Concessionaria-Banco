class Services {
    constructor(repository) {
        this.repository = repository;
    }

    async buscaTodosOsRegistros() {
        return await this.repository.findAll();
    }

    async buscaUmPorId(id) {
        return await this.repository.findById(id);
    }

    async buscaPorCampo(campo, valor) {
        return await this.repository.findOneByField(campo, valor);
    }

    async criaRegistro(data) {
        return await this.repository.create(data);
    }

    async atualizaRegistro(data, id) {
        return await this.repository.update(data, id);
    }

    async excluiRegistro(id) {
        return await this.repository.delete(id);
    }
}

module.exports = Services;
