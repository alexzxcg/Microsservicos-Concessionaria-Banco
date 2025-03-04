package com.microsservice.concessionaria.domain.venda;

public enum FormaDePagamento {
    A_VISTA(false),
    FINANCIAMENTO_PARCIAL(true),
    FINANCIAMENTO_TOTAL(true);

    private final boolean exigeParcelamento;

    FormaDePagamento(boolean exigeParcelamento) {
        this.exigeParcelamento = exigeParcelamento;
    }

    public boolean exigeParcelamento() {
        return exigeParcelamento;
    }
}
