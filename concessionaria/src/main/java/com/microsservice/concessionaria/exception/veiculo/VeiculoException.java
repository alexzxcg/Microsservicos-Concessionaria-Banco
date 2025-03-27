package com.microsservice.concessionaria.exception.veiculo;

public class VeiculoException extends RuntimeException {
    public VeiculoException(String mensagem) {
        super(mensagem);
    }
}