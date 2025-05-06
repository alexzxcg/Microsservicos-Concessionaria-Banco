const dataSource = require('../models');
const { AppError } = require('../middlewares/erro/errorHandler.js');

class Services {
    constructor(nomeDoModel) {
        this.model = dataSource[nomeDoModel];
    }

    async buscaTodosOsRegistros() {
        const registros = await this.model.findAll();
        if (!registros || registros.length === 0) {
            throw new AppError('Nenhum registro encontrado', 404);
        }
        return registros;
    }

    async buscaUmPorId(id) {
        const registro = await this.model.findByPk(id);
        if (!registro) {
            throw new AppError('Registro não encontrado', 404);
        }
        return registro;
    }
    
    async buscaPorCampo(campo, valor) {
        const registro = await this.model.findOne({ where: { [campo]: valor } });
        if (!registro) {
            throw new AppError('Registro não encontrado', 404);
        }
        return registro;
    }

    async criaRegistro(dadosDoRegistro) {
        try {
            return await this.model.create(dadosDoRegistro);
        } catch (error) {
            throw new AppError('Erro ao criar registro', 400, [error.message]);
        }
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const [quantidadeAtualizada] = await this.model.update(dadosAtualizados, {
            where: { id: id }
        });
    
        if (quantidadeAtualizada === 0) {
            throw new AppError('Registro não encontrado para atualização', 404);
        }
    
        return await this.model.findByPk(id);
    }

    async excluiRegistro(id) {
        const quantidadeExcluida = await this.model.destroy({ where: { id: id } });
        if (quantidadeExcluida === 0) {
            throw new AppError('Registro não encontrado para exclusão', 404);
        }
        return true;
    }
}

module.exports = Services;