package com.microsservice.concessionaria.domain.cliente;


import com.microsservice.concessionaria.domain.endereco.Endereco;

public record ClienteDetalhadoDTO(Long id, String nome,Endereco endereco, int idade, String cpf) {
    public ClienteDetalhadoDTO(Cliente cliente) {
        this(cliente.getId(), cliente.getNome(),cliente.getEndereco(), cliente.getIdade(), cliente.getCpf());
    }
}
