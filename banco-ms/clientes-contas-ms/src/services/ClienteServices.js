const Services = require('./Services');
const ClienteRepository = require('../repositories/ClienteRepository');
const ClienteOutputDTO = require('../dtos/cliente-dto/ClienteOutputDTO');
const ContaOutputDTO = require('../dtos/conta-dto/ContaOutputDTO');
const { AppError } = require('../middlewares/erro/errorHandler');
const { buscarFinanciamentosPorConta, buscarFinanciamentoPorId } = require('../producers/buscaFinanciamentosProducer');

class ClienteServices extends Services {
    constructor() {
        super(ClienteRepository);
        this.clienteRepository = ClienteRepository;
    }

    async buscaContas(clienteId) {
        const cliente = await this.clienteRepository.findById(clienteId);
        const contas = await cliente.getContas();
        if (!contas || contas.length === 0) {
            throw new AppError('Nenhuma conta encontrada para este cliente', 404);
        }
        return contas.map(conta => new ContaOutputDTO(conta));
    }

    async buscaContaCorrentePorCpf(cpf) {
        const cliente = await this.clienteRepository.findOneByField('cpf', cpf);
        const contas = await cliente.getContas();
        const contaCorrente = contas.find(conta => conta.tipo === 'corrente');
        if (!contaCorrente) throw new AppError('Conta corrente não encontrada', 404);
        return new ContaOutputDTO(contaCorrente);
    }

    async buscaContaPorId(clienteId, contaId) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);
        return { data: new ContaOutputDTO(conta), status: 200 };
    }

    async buscaContaFinanciamentos(clienteId, contaId) {
        await this._verificaClienteEConta(clienteId, contaId);
        return await buscarFinanciamentosPorConta(contaId);
    }

    async buscaContaFinanciamentoPorId(clienteId, contaId, financiamentoId) {
        await this._verificaClienteEConta(clienteId, contaId);
        return await buscarFinanciamentoPorId(contaId, financiamentoId);
    }

    async atualizaContaDeCliente(clienteId, contaId, dadosAtualizados) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);
        const contaAtualizada = await conta.update(dadosAtualizados);
        return new ContaOutputDTO(contaAtualizada);
    }

    async desativaConta(clienteId, contaId) {
        const conta = await this._verificaClienteEConta(clienteId, contaId);
        if (!conta.ativa) throw new AppError('Conta já está desativada', 400);
        await conta.update({ ativa: false });
        return { mensagem: 'Conta desativada com sucesso' };
    }

    async criaRegistro(dto) {
        const clienteCriado = await this.repository.create(dto);
        return new ClienteOutputDTO(clienteCriado);
    }

    async atualizaRegistro(data, id) {
        const clienteAtualizado = await this.repository.update(data, id);
        return new ClienteOutputDTO(clienteAtualizado);
    }

    async buscaUmPorId(id) {
        const cliente = await this.repository.findById(id);
        return new ClienteOutputDTO(cliente);
    }

    async buscaTodosOsRegistros() {
        const clientes = await this.repository.findAll();
        return clientes.map(cliente => new ClienteOutputDTO(cliente));
    }

    async _verificaClienteEConta(clienteId, contaId) {
        const contas = await this.clienteRepository.findWithContas(clienteId, contaId);
        if (!contas || contas.length === 0) {
            throw new AppError('Conta não encontrada para este cliente', 404);
        }
        return contas[0];
    }
}

module.exports = ClienteServices;
