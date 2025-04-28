const yup = require('yup');

class Controller {
    constructor(entidadeService, inputDTO, outputDTO, updateDTO) {
        this.entidadeService = entidadeService;
        this.inputDTO = inputDTO;
        this.outputDTO = outputDTO;
        this.updateDTO = updateDTO;
    }

    async buscaTodos(req, res) {
        try {
            const listaDeRegistro = await this.entidadeService.buscaTodosOsRegistros();
            
            if (!listaDeRegistro || listaDeRegistro.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum registro encontrado.' });
            }

            // Mapear para DTO de saída
            const listaDTO = listaDeRegistro.map(registro => new this.outputDTO(registro));
            
            return res.status(200).json(listaDTO);
        } catch (erro) {
            return res.status(500).json({ error: "Erro ao buscar os registros." });
        }
    }

    async buscaPorId(req, res) {
        const { id } = req.params;
        try {
            const registroObtido = await this.entidadeService.buscaUmPorId(Number(id));
            if (!registroObtido) {
                return res.status(404).json({ mensagem: 'Registro não encontrado' });
            }
            const registroDTO = new this.outputDTO(registroObtido);
            return res.status(200).json(registroDTO);
        } catch (erro) {
            return res.status(500).json({ error: "Erro ao buscar o registro." });
        }
    }

    async criaRegistro(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const dtoParaCriacao = new this.inputDTO(dadosParaCriacao);
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dtoParaCriacao);
            const respostaDTO = new this.outputDTO(novoRegistroCriado);
            return res.status(201).json(respostaDTO);
        } catch (erro) {
            if (erro instanceof yup.ValidationError) {
                return res.status(400).json({ mensagens: erro.errors });
            }
            return res.status(500).json({ mensagem: 'Erro interno ao criar o registro.', erro: erro.message });
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const dtoParaAtualizacao = new this.updateDTO(dadosAtualizados);
            const registroAtualizado = await this.entidadeService.atualizaRegistro(dtoParaAtualizacao, Number(id));
            
            if (!registroAtualizado) {
                return res.status(400).json({ mensagem: 'Registro não foi atualizado' });
            }

            const dtoDeResposta = new this.outputDTO(registroAtualizado);
            return res.status(200).json(dtoDeResposta);
        } catch (erro) {
            return res.status(500).json({ error: "Erro ao atualizar o registro." });
        }
    }

    async exclui(req, res) {
        const { id } = req.params;
        try {
            await this.entidadeService.excluiRegistro(Number(id));
            return res.status(200).json({ mensagem: `ID ${id} deletado` });
        } catch (erro) {
            return res.status(500).json({ error: erro.message });
        }
    }
}

module.exports = Controller;