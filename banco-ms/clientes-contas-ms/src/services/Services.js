const dataSource = require('../models');

class Services {
    constructor(nomeDoModel) {
        this.model = dataSource[nomeDoModel];
    }

    async buscaTodosOsRegistros() {
        return this.model.findAll();
    }

    async buscaUmPorId(id) {
        return this.model.findByPk(id);
    }

    async criaRegistro(dadosDoRegistro) {
        return this.model.create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const listadeRegistrosAtualizados = await this.model.update(dadosAtualizados, {
            where: { id: id }
        });
        return listadeRegistrosAtualizados[0] !== 0;
    }

    async excluiRegistro(id) {
        return this.model.destroy({ where: { id: id } });
    }
}

module.exports = Services;
