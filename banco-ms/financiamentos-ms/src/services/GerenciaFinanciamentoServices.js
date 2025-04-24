const { addMonths } = require('date-fns');

class GerenciaFinanciamentoServices {
    static calcularJuros(valorBaseFinanciamento, numero_de_parcelas) {
        let taxa_juros = 0;

        if (numero_de_parcelas <= 6) taxa_juros = 0.05;
        else if (numero_de_parcelas <= 12) taxa_juros = 0.07;
        else if (numero_de_parcelas <= 24) taxa_juros = 0.10;
        else if (numero_de_parcelas <= 36) taxa_juros = 0.15;
        else if (numero_de_parcelas <= 48) taxa_juros = 0.25;
        else if (numero_de_parcelas <= 60) taxa_juros = 0.50;

        const valorTotalComJuros = valorBaseFinanciamento * (1 + taxa_juros);
        return valorTotalComJuros;
    }

    static calcularParcelas(valorTotalComJuros, numero_de_parcelas) {
        return Number((valorTotalComJuros / numero_de_parcelas).toFixed(2));
    }

    static calcularDataTermino(numero_de_parcelas) {
        const hoje = new Date();
        const data_termino_estimada = addMonths(hoje, numero_de_parcelas + 1); // +1 mês de carência
        return data_termino_estimada;
    }

    static aprovarFinanciamento({ tipoFinanciamento, saldoConta, rendaMensal, valorEntrada, valorParcela }) {
        if (tipoFinanciamento === 'PARCIAL') {
          if (saldoConta < valorEntrada) return false;
    
          const percentualParcela = (valorParcela / rendaMensal) * 100;
          if (percentualParcela > 35) return false;
    
          return true;
    
        } else if (tipoFinanciamento === 'TOTAL') {
          const percentualParcela = (valorParcela / rendaMensal) * 100;
          if (percentualParcela > 35) return false;
    
          return true;
        }
    
        return false;
    }
}

module.exports = GerenciaFinanciamentoServices;