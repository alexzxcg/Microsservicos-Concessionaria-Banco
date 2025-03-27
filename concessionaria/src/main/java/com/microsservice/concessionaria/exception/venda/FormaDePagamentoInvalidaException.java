package com.microsservice.concessionaria.exception.venda;

public class FormaDePagamentoInvalidaException extends RuntimeException {
    public FormaDePagamentoInvalidaException(String message) {
        super(message);
    }
}