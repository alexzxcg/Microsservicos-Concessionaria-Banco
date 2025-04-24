const Services = require('./Services.js');
const ClienteServices = require('./ClienteServices.js');
const GerenciaFinanciamentoServices = require('./GerenciaFinanciamentoServices.js');
const dataSource = require('../models');

class FinanciamentoServices extends Services {
  constructor() {
    super('Financiamento');
    this.clienteServices = new ClienteServices();
  }

  async buscaTodosOsRegistros(contaId) {
    try {
      const conta = await dataSource.Conta.findByPk(contaId, {
        include: {
          model: dataSource.Financiamento,
          as: 'financiamentos'
        }
      });

      if (!conta) {
        return { status: 404, data: { mensagem: 'Conta não encontrada' } };
      }

      if (!conta.financiamentos || conta.financiamentos.length === 0) {
        return { status: 404, data: { mensagem: 'Nenhum financiamento encontrado para esta conta' } };
      }

      return { status: 200, data: conta.financiamentos };
    } catch (erro) {
      console.error('Erro ao buscar financiamentos no service:', erro);
      return { status: 500, data: { mensagem: 'Erro ao buscar financiamentos', erro } };
    }
  }

  async criaRegistro(dados) {
    const {
      conta_id,
      valor_total_financiamento,
      numero_de_parcelas,
      tipo_financiamento,
      valor_entrada = 0.00
    } = dados;

    // Busca os dados da conta
    const conta = await dataSource.Conta.findByPk(conta_id);
    if (!conta) {
      throw new Error('Conta não encontrada.');
    }

    // Verifica se o tipo da conta é corrente
    if (conta.tipo !== 'corrente') {
      throw new Error('Financiamentos só são permitidos para contas do tipo corrente.');
    }

    // Validações de regras de negócio
    if (numero_de_parcelas > 60) {
      throw new Error('O número máximo de parcelas permitido é 60.');
    }

    let valorBaseFinanciamento = valor_total_financiamento;

    // Se for PARCIAL, subtrai o valor da entrada
    if (tipo_financiamento === 'PARCIAL') {
      if (valor_entrada <= 0) {
        throw new Error('Valor de entrada deve ser maior que 0 em financiamento PARCIAL.');
      }

      valorBaseFinanciamento -= valor_entrada;

      if (valorBaseFinanciamento <= 0) {
        throw new Error('Valor restante do financiamento deve ser maior que zero.');
      }
    }

    // Chama os métodos da GerenciaFinanciamentoServices para os cálculos
    const valorTotalComJuros = GerenciaFinanciamentoServices.calcularJuros(valorBaseFinanciamento, numero_de_parcelas);
    const valor_parcela = GerenciaFinanciamentoServices.calcularParcelas(valorTotalComJuros, numero_de_parcelas);
    const data_termino_estimada = GerenciaFinanciamentoServices.calcularDataTermino(numero_de_parcelas);

    // Cria o registro no banco de dados
    return await dataSource[this.model].create({
      conta_id,
      valor_total_financiamento: Number(valorTotalComJuros.toFixed(2)),
      valor_entrada,
      tipo_financiamento,
      numero_de_parcelas,
      valor_parcela,
      data_termino_estimada
    });
  }

  async buscaUmPorId(contaId, financiamentoId) {
    try {
      const financiamento = await dataSource.Financiamento.findOne({
        where: {
          id: financiamentoId,
          conta_id: contaId
        }
      });

      if (!financiamento) {
        console.log('Nenhum financiamento encontrado para a conta:', contaId);
        return { status: 404, data: { mensagem: 'Financiamento não encontrado para esta conta' } };
      }

      return { status: 200, data: financiamento };
    } catch (erro) {
      return { status: 500, data: { mensagem: 'Erro ao buscar financiamento', erro: erro.message || erro } };
    }
  }

  async aprovaFinanciamento(financiamentoId) {
    try {
      const financiamento = await dataSource.Financiamento.findOne({
        where: { id: financiamentoId },
        include: [
          {
            model: dataSource.Conta,
            as: 'conta',
            include: [
              {
                model: dataSource.Cliente,
                as: 'cliente'
              }
            ]
          }
        ]
      });

      if (!financiamento) {
        return {
          status: 404,
          data: { mensagem: 'Financiamento não encontrado' }
        };
      }

      const tipoFinanciamento = financiamento.tipo_financiamento;

      let aprovado = false;
      let novaDataTermino;

      if (tipoFinanciamento === 'PARCIAL') {
        const conta = financiamento.conta;
        const cliente = conta.cliente;

        if (!conta || !cliente) {
          return {
            status: 500,
            data: { mensagem: 'Erro interno ao acessar os dados de conta ou cliente' }
          };
        }

        const saldoConta = parseFloat(conta.saldo);
        const rendaMensal = parseFloat(cliente.renda_mensal);
        const valorEntrada = parseFloat(financiamento.valor_entrada);
        const valorParcela = parseFloat(financiamento.valor_parcela);

        aprovado = GerenciaFinanciamentoServices.aprovarFinanciamento({
          tipoFinanciamento: tipoFinanciamento,
          saldoConta,
          rendaMensal,
          valorEntrada,
          valorParcela
        });

        if (aprovado) {
          financiamento.status = 'APROVADO';
          conta.saldo = saldoConta - valorEntrada;
        } else {
          financiamento.status = 'REJEITADO';
        }

      } else if (tipoFinanciamento === 'TOTAL') {
        const cliente = financiamento.conta.cliente;
        const rendaMensal = parseFloat(cliente.renda_mensal);
        const valorParcela = parseFloat(financiamento.valor_parcela);

        aprovado = GerenciaFinanciamentoServices.aprovarFinanciamento({
          tipoFinanciamento: tipoFinanciamento,
          rendaMensal,
          valorParcela
        });

        financiamento.status = aprovado ? 'APROVADO' : 'REJEITADO';
      }

      // Se aprovado, recalcular data de término estimada
      if (aprovado) {
        const numeroParcelas = financiamento.numero_de_parcelas;
        novaDataTermino = GerenciaFinanciamentoServices.calcularDataTermino(numeroParcelas);
        financiamento.data_termino_estimada = novaDataTermino;
      }

      await financiamento.save();

      if (tipoFinanciamento === 'PARCIAL' && aprovado) {
        await financiamento.conta.save(); // salvar saldo atualizado
      }

      return {
        status: 200,
        data: { mensagem: `Financiamento ${aprovado ? 'aprovado' : 'rejeitado'} com sucesso` }
      };

    } catch (erro) {
      console.error('Erro na aprovação do financiamento:', erro);
      return {
        status: 500,
        data: { mensagem: 'Erro interno ao aprovar financiamento', erro: erro.message || erro }
      };
    }
  }
}

module.exports = FinanciamentoServices;