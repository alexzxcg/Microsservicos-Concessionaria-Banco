package com.microsservice.concessionaria.exception.cliente;

public class ClienteException extends RuntimeException {
    public ClienteException(String mensagem) {
        super(mensagem);
    }
}