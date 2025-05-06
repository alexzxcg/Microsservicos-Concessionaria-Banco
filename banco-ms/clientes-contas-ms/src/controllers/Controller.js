const yup = require('yup');
const { AppError, asyncHandler } = require('../middlewares/erro/errorHandler.js');

class Controller {
    constructor(entidadeService, inputDTO, outputDTO, updateDTO) {
        this.entidadeService = entidadeService;
        this.inputDTO = inputDTO;
        this.outputDTO = outputDTO;
        this.updateDTO = updateDTO;
    }

    buscaTodos = asyncHandler(async (req, res) => {
        const listaDeRegistro = await this.entidadeService.buscaTodosOsRegistros();
        
        if (!listaDeRegistro || listaDeRegistro.length === 0) {
            throw new AppError('Nenhum registro encontrado.', 404);
        }

        const listaDTO = listaDeRegistro.map(registro => new this.outputDTO(registro));
        
        return res.status(200).json(listaDTO);
    });

    buscaPorId = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const registroObtido = await this.entidadeService.buscaUmPorId(Number(id));
        
        if (!registroObtido) {
            throw new AppError('Registro não encontrado', 404);
        }
        
        const registroDTO = new this.outputDTO(registroObtido);
        return res.status(200).json(registroDTO);
    });

    criaRegistro = asyncHandler(async (req, res) => {
        const dadosParaCriacao = req.body;
        
        try {
            const dtoParaCriacao = new this.inputDTO(dadosParaCriacao);
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dtoParaCriacao);
            const respostaDTO = new this.outputDTO(novoRegistroCriado);
            return res.status(201).json(respostaDTO);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                throw new AppError('Erro de validação', 400, erro.errors);
            }
            throw erro; 
        }
    });

    atualiza = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        
        const dtoParaAtualizacao = new this.updateDTO(dadosAtualizados);
        const registroAtualizado = await this.entidadeService.atualizaRegistro(dtoParaAtualizacao, Number(id));
        
        if (!registroAtualizado) {
            throw new AppError('Registro não foi atualizado', 400);
        }

        const dtoDeResposta = new this.outputDTO(registroAtualizado);
        return res.status(200).json(dtoDeResposta);
    });

    exclui = asyncHandler(async (req, res) => {
        const { id } = req.params;
        await this.entidadeService.excluiRegistro(Number(id));
        return res.status(200).json({ mensagem: `ID ${id} deletado` });
    });
}

module.exports = Controller;