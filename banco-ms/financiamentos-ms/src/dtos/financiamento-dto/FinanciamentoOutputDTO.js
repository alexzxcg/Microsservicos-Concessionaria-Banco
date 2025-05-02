class FinanciamentoOutputDTO {
    constructor(financiamento) {
        this.id = financiamento.id;
        this.valorTotalFinanciamento = financiamento.valor_total_financiamento;
        this.numeroDeParcelas = financiamento.numero_de_parcelas;
        this.valorParcela = financiamento.valor_parcela;
        this.dataTerminoEstimada = financiamento.data_termino_estimada;
        this.status = financiamento.status;
        this.tipoFinanciamento = financiamento.tipo_financiamento;
        this.valorEntrada = financiamento.valor_entrada;
    }
}

module.exports = FinanciamentoOutputDTO;