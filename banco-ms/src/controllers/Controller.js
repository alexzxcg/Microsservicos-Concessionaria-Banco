class Controller {
    constructor(entidadeService) {
        this.entidadeService = entidadeService;
    }

    async buscaTodos(req, res) {
        try {
            console.log("Buscando todos os registros...");
            const listaDeResgistro = await this.entidadeService.buscaTodosOsRegistros();
            console.log("Lista de registros:", listaDeResgistro);
            return res.status(200).json(listaDeResgistro);
        } catch (erro) {
            console.error("Erro ao buscar todos os registros:", erro);
            return res.status(500).json({ error: "Erro ao buscar os registros." });
        }
    }

    async buscaPorId(req, res) {
        const { id } = req.params;
        try {
            console.log(`Buscando registro com id: ${id}`);
            const registroObtido = await this.entidadeService.buscaUmPorId(Number(id));
            console.log("Registro obtido:", registroObtido);
            if (!registroObtido) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }
            return res.status(200).json(registroObtido);
        } catch (erro) {
            console.error("Erro ao buscar o registro por id:", erro);
            return res.status(500).json({ error: "Erro ao buscar o registro." });
        }
    }

    async criaRegistro(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
            return res.status(201).json(novoRegistroCriado);
        } catch (erro) {
            
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));
            if (!foiAtualizado) {
                return res.status(400).json({ mensagem: 'registro não foi atualizado' });
            }
            return res.status(200).json({ mensagem: 'Atualizado com sucesso' });
        } catch (erro) {
            //erro
        }
    }

    async exclui(req, res) {
        const { id } = req.params;
        try {
            await this.entidadeService.excluiRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = Controller;