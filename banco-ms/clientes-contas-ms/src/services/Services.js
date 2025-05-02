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
    
    async buscaPorCampo(campo, valor) {
        return this.model.findOne({ where: { [campo]: valor } });
    }

    async criaRegistro(dadosDoRegistro) {
        return this.model.create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const [quantidadeAtualizada] = await this.model.update(dadosAtualizados, {
            where: { id: id }
        });
    
        if (quantidadeAtualizada === 0) {
            return null;
        }
    
        const registroAtualizado = await this.model.findByPk(id);
        return registroAtualizado;
    }

    async excluiRegistro(id) {
        return this.model.destroy({ where: { id: id } });
    }
}

module.exports = Services;
