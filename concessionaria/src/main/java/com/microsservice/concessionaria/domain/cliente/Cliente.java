package com.microsservice.concessionaria.domain.cliente;

import com.microsservice.concessionaria.domain.endereco.Endereco;
import com.microsservice.concessionaria.domain.pessoa.Pessoa;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente extends Pessoa {

    private String cpf;

    public Cliente() {}

    public Cliente(ClienteDTO clienteDTO) {
        super(clienteDTO.nome(), new Endereco(clienteDTO.endereco()), clienteDTO.idade());
        this.cpf = clienteDTO.cpf();
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}

