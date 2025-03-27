package com.microsservice.concessionaria.exception.veiculo;

public class VeiculoNaoEncontradoException extends RuntimeException {
    public VeiculoNaoEncontradoException(Long id) {
        super("Veículo com ID " + id + " não encontrado.");
    }
}
