const GerenciaFinanciamentoServices = require('./GerenciaFinanciamentoServices.js');
const dataSource = require('../models');
const axios = require('axios');
const { AppError } = require('../middlewares/erro/errorHandler.js');

class FinanciamentoServices {
  async buscaTodosOsRegistros(contaId) {
    const financiamentos = await dataSource.Financiamento.findAll({
      where: { conta_id: contaId },
      raw: true
    });

    if (!financiamentos || financiamentos.length === 0) {
      throw new AppError('Nenhum financiamento encontrado para esta conta', 404);
    }

    return financiamentos;
  }

  async criaRegistro(dados) {
    try {
      const { numeroConta, valorTotalFinanciamento, numeroDeParcelas, tipoFinanciamento, valorEntrada = 0.00 } = dados;

      const resposta = await axios.get(`http://localhost:3000/contas/${numeroConta}`);
      const conta = resposta.data;

      if (!conta || !conta.id) {
        throw new AppError('Conta corrente não encontrada', 404);
      }

      if (numeroDeParcelas > 60) {
        throw new AppError('O número máximo de parcelas permitido é 60', 400);
      }

      let valorBaseFinanciamento = valorTotalFinanciamento;

      if (tipoFinanciamento === 'PARCIAL') {
        if (valorEntrada <= 0) {
          throw new AppError('Valor de entrada deve ser maior que 0 em financiamento PARCIAL', 400);
        }

        valorBaseFinanciamento -= valorEntrada;

        if (valorBaseFinanciamento <= 0) {
          throw new AppError('Valor restante do financiamento deve ser maior que zero', 400);
        }
      }

      const valorTotalComJuros = GerenciaFinanciamentoServices.calcularJuros(valorBaseFinanciamento, numeroDeParcelas);
      const valorParcela = GerenciaFinanciamentoServices.calcularParcelas(valorTotalComJuros, numeroDeParcelas);
      const dataTerminoEstimada = GerenciaFinanciamentoServices.calcularDataTermino(numeroDeParcelas);

      return await dataSource.Financiamento.create({
        conta_id: conta.id,
        valor_total_financiamento: Number(valorTotalComJuros.toFixed(2)),
        valor_entrada: valorEntrada,
        tipo_financiamento: tipoFinanciamento,
        numero_de_parcelas: numeroDeParcelas,
        valor_parcela: valorParcela,
        data_termino_estimada: dataTerminoEstimada,
        status: 'EM_ANALISE'
      });
    } catch (erro) {
      if (erro.response && erro.response.status === 404) {
        throw new AppError('Conta não encontrada', 404);
      }
      throw new AppError(erro.message || 'Erro ao criar financiamento', 400);
    }
  }

  async buscaUmPorId(contaId, financiamentoId) {
    const financiamento = await dataSource.Financiamento.findOne({
      where: {
        id: financiamentoId,
        conta_id: contaId,
      },
      raw: true
    });

    if (!financiamento) {
      throw new AppError('Financiamento não encontrado para esta conta', 404);
    }

    return financiamento;
  }

  async aprovaFinanciamento(financiamentoId) {
    try {
      const financiamento = await dataSource.Financiamento.findOne({
        where: { id: financiamentoId }
      });

      if (!financiamento) {
        throw new AppError('Financiamento não encontrado', 404);
      }

      const contaId = financiamento.conta_id;
      const tipoFinanciamento = financiamento.tipo_financiamento;

      const { data: dados } = await axios.get(`http://localhost:3000/contas/${contaId}/dados-financiamento`);

      const saldoConta = parseFloat(dados.saldo);
      const rendaMensal = parseFloat(dados.renda_mensal);
      const valorEntrada = parseFloat(financiamento.valor_entrada);
      const valorParcela = parseFloat(financiamento.valor_parcela);

      let aprovado = false;
      let novaDataTermino;

      if (tipoFinanciamento === 'PARCIAL') {
        aprovado = GerenciaFinanciamentoServices.aprovarFinanciamento({
          tipoFinanciamento,
          saldoConta,
          rendaMensal,
          valorEntrada,
          valorParcela
        });

        if (aprovado) {
          financiamento.status = 'APROVADO';
          const novoSaldo = saldoConta - valorEntrada;

          await axios.put(`http://localhost:3000/contas/${contaId}/alterar-saldo`, {
            novoSaldo
          });
        } else {
          financiamento.status = 'REJEITADO';
        }
      } else if (tipoFinanciamento === 'TOTAL') {
        aprovado = GerenciaFinanciamentoServices.aprovarFinanciamento({
          tipoFinanciamento,
          rendaMensal,
          valorParcela
        });

        financiamento.status = aprovado ? 'APROVADO' : 'REJEITADO';
      }

      if (aprovado) {
        novaDataTermino = GerenciaFinanciamentoServices.calcularDataTermino(financiamento.numero_de_parcelas);
        financiamento.data_termino_estimada = novaDataTermino;
      }

      await financiamento.save();

      return {
        mensagem: `Financiamento ${aprovado ? 'aprovado' : 'rejeitado'} com sucesso`,
        status: aprovado ? 'APROVADO' : 'REJEITADO'
      };
    } catch (erro) {
      throw new AppError(erro.message || 'Erro ao aprovar financiamento', 500);
    }
  }
}

module.exports = FinanciamentoServices;