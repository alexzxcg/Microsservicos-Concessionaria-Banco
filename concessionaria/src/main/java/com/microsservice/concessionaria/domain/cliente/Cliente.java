package com.microsservice.concessionaria.domain.cliente;

import com.microsservice.concessionaria.domain.endereco.Endereco;
import com.microsservice.concessionaria.domain.pessoa.Pessoa;
import com.microsservice.concessionaria.domain.venda.Venda;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "clientes")
public class Cliente extends Pessoa {

    private String cpf;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Venda> compras = new ArrayList<>();


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

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Cliente cliente = (Cliente) object;
        return Objects.equals(cpf, cliente.cpf) && Objects.equals(compras, cliente.compras);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cpf, compras);
    }
}

