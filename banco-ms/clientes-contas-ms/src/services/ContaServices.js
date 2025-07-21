const Services = require('./Services');
const ContaRepository = require('../repositories/ContaRepository');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO');
const { AppError } = require('../middlewares/erro/errorHandler.js');

class ContaServices extends Services {
    constructor() {
        super(ContaRepository);
        this.contaRepository = ContaRepository;
    }

    async buscarContaPorNumero(numero) {
        const conta = await this.contaRepository.findByNumero(numero);
        if (!conta) throw new AppError('Conta não encontrada', 404);
        return new ContaOutputDTO(conta);
    }

    async buscaDadosParaFinanciamento(contaId) {
        const conta = await this.contaRepository.findDadosFinanciamento(contaId);
        if (!conta || !conta.cliente) {
            throw new AppError('Conta ou cliente não encontrado', 404);
        }

        return {
            saldo: conta.saldo,
            renda_mensal: conta.cliente.renda_mensal
        };
    }

    async alterarSaldo(contaId, novoSaldo) {
        const conta = await this.contaRepository.updateSaldo(contaId, novoSaldo);
        if (!conta) throw new AppError('Conta não encontrada', 404);
        return { mensagem: 'Saldo atualizado com sucesso' };
    }

    async criaRegistro(dto) {
        const contaCriada = await this.repository.create(dto);
        return new ContaOutputDTO(contaCriada);
    }

    async atualizaRegistro(data, id) {
        const contaAtualizada = await this.repository.update(data, id);
        return new ContaOutputDTO(contaAtualizada);
    }

    async buscaUmPorId(id) {
        const conta = await this.repository.findById(id);
        return new ContaOutputDTO(conta);
    }

    async buscaTodosOsRegistros() {
        const contas = await this.repository.findAll();
        return contas.map(conta => new ContaOutputDTO(conta));
    }
}

module.exports = ContaServices;
