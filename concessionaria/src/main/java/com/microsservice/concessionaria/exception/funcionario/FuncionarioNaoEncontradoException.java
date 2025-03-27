package com.microsservice.concessionaria.exception.funcionario;

public class FuncionarioNaoEncontradoException extends RuntimeException {
    public FuncionarioNaoEncontradoException(Long id) {
        super("Funcionário não encontrado com ID: " + id);
    }
}