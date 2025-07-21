const yup = require('yup');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler.js');

class Controller {
    constructor(entidadeService, InputDTO) {
        this.entidadeService = entidadeService;
        this.InputDTO = InputDTO;
    }

    buscaTodos = asyncHandler(async (req, res) => {
        const lista = await this.entidadeService.buscaTodosOsRegistros();
        return res.status(200).json(lista); 
    });

    buscaPorId = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const registro = await this.entidadeService.buscaUmPorId(Number(id));
        return res.status(200).json(registro); 
    });

    criaRegistro = asyncHandler(async (req, res) => {
        try {
            const dto = new this.InputDTO(req.body);
            const criado = await this.entidadeService.criaRegistro(dto);
            return res.status(201).json(criado);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                throw new AppError('Erro de validação', 400, erro.errors);
            }
            throw erro;
        }
    });

    atualiza = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const atualizado = await this.entidadeService.atualizaRegistro(req.body, Number(id));
        return res.status(200).json(atualizado);
    });

    exclui = asyncHandler(async (req, res) => {
        const { id } = req.params;
        await this.entidadeService.excluiRegistro(Number(id));
        return res.status(200).json({ mensagem: `ID ${id} deletado` });
    });
}

module.exports = Controller;
