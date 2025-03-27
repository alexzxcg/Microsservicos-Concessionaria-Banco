package com.microsservice.concessionaria.exception.funcionario;

public class FuncionarioException extends RuntimeException {
    public FuncionarioException(String mensagem) {
        super(mensagem);
    }
}