package com.microsservice.concessionaria.exception.cliente;

public class ClienteNaoEncontradoException extends RuntimeException {
    public ClienteNaoEncontradoException(Long id) {
        super("Cliente não encontrado com ID: " + id);
    }
}