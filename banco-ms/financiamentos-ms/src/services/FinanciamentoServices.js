const GerenciaFinanciamentoServices = require('./GerenciaFinanciamentoServices.js');
const dataSource = require('../models');
const axios = require('axios');

class FinanciamentoServices  {

  async buscaTodosOsRegistros(contaId) {
    try {
        const financiamentos = await dataSource.Financiamento.findAll({
            where: { conta_id: contaId },
            raw: true
        });
        return financiamentos;
    } catch (erro) {
        console.error('Erro ao buscar financiamentos no service:', erro);
        throw new Error('Erro ao buscar financiamentos');
    }
  }

  async criaRegistro(dados) {
    const {
      numeroConta,
      valorTotalFinanciamento,
      numeroDeParcelas,
      tipoFinanciamento,
      valorEntrada = 0.00
    } = dados;

    // Requisição ao microsserviço de clientes para buscar conta corrente via CPF
    let conta;
    try {
      const resposta = await axios.get(`http://localhost:3000/contas/${numeroConta}`);
      conta = resposta.data; // esperado: { id: <idConta> }
    } catch (erro) {
      throw new Error('Erro ao buscar conta corrente do cliente no serviço de contas.');
    }

    if (!conta || !conta.id) {
      throw new Error('Conta corrente não encontrada para o CPF informado.');
    }

    // Validação de parcelas
    if (numeroDeParcelas > 60) {
      throw new Error('O número máximo de parcelas permitido é 60.');
    }

    let valorBaseFinanciamento = valorTotalFinanciamento;

    if (tipoFinanciamento === 'PARCIAL') {
      if (valorEntrada <= 0) {
        throw new Error('Valor de entrada deve ser maior que 0 em financiamento PARCIAL.');
      }

      valorBaseFinanciamento -= valorEntrada;

      if (valorBaseFinanciamento <= 0) {
        throw new Error('Valor restante do financiamento deve ser maior que zero.');
      }
    }

    const valorTotalComJuros = GerenciaFinanciamentoServices.calcularJuros(valorBaseFinanciamento, numeroDeParcelas);
    const valorParcela = GerenciaFinanciamentoServices.calcularParcelas(valorTotalComJuros, numeroDeParcelas);
    const dataTerminoEstimada = GerenciaFinanciamentoServices.calcularDataTermino(numeroDeParcelas);

    // Cria o financiamento com o ID da conta retornado
    return await dataSource.Financiamento.create({
      conta_id: conta.id,
      valor_total_financiamento: Number(valorTotalComJuros.toFixed(2)),
      valor_entrada: valorEntrada,
      tipo_financiamento: tipoFinanciamento,
      numero_de_parcelas: numeroDeParcelas,
      valor_parcela: valorParcela,
      data_termino_estimada: dataTerminoEstimada
    });
  }

  async buscaUmPorId(contaId, financiamentoId) {
    try {
      const financiamento = await dataSource.Financiamento.findOne({
        where: {
          id: financiamentoId,
          conta_id: contaId,
        },
        raw: true
      });

      if (!financiamento) {
        console.log('Nenhum financiamento encontrado para a conta:', contaId);
        return { status: 404, data: { mensagem: 'Financiamento não encontrado para esta conta' } };
      }

      return  financiamento;
    } catch (erro) {
      return { status: 500, data: { mensagem: 'Erro ao buscar financiamento', erro: erro.message || erro } };
    }
  }

  async aprovaFinanciamento(financiamentoId) {
    try {
      const financiamento = await dataSource.Financiamento.findOne({
        where: { id: financiamentoId }
      });
  
      if (!financiamento) {
        return {
          status: 404,
          data: { mensagem: 'Financiamento não encontrado' }
        };
      }
  
      const contaId = financiamento.conta_id;
      const tipoFinanciamento = financiamento.tipo_financiamento;
  
      // Chamada para o microsserviço de clientes-contas
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
  
          // Requisição PUT para atualizar saldo da conta
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
  
      // Se aprovado, calcula nova data de término
      if (aprovado) {
        novaDataTermino = GerenciaFinanciamentoServices.calcularDataTermino(financiamento.numero_de_parcelas);
        financiamento.data_termino_estimada = novaDataTermino;
      }
  
      await financiamento.save();
  
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