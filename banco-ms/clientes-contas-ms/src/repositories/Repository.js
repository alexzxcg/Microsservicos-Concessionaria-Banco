const { AppError } = require('../middlewares/erro/errorHandler.js');

class Repository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        const registros = await this.model.findAll();
        if (!registros || registros.length === 0) {
            throw new AppError('Nenhum registro encontrado', 404);
        }
        return registros;
    }

    async findById(id) {
        const registro = await this.model.findByPk(id);
        if (!registro) {
            throw new AppError('Registro não encontrado', 404);
        }
        return registro;
    }

    async findOneByField(field, value) {
        const registro = await this.model.findOne({ where: { [field]: value } });
        if (!registro) {
            throw new AppError('Registro não encontrado', 404);
        }
        return registro;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new AppError('Erro ao criar registro', 400, [error.message]);
        }
    }

    async update(data, id) {
        const [atualizado] = await this.model.update(data, { where: { id } });
        if (atualizado === 0) {
            throw new AppError('Registro não encontrado para atualização', 404);
        }
        return this.model.findByPk(id);
    }

    async delete(id) {
        const deletado = await this.model.destroy({ where: { id } });
        if (deletado === 0) {
            throw new AppError('Registro não encontrado para exclusão', 404);
        }
        return true;
    }
}

module.exports = Repository;
