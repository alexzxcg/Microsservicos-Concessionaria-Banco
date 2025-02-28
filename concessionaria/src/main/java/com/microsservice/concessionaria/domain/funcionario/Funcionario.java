package com.microsservice.concessionaria.domain.funcionario;

import com.microsservice.concessionaria.domain.endereco.Endereco;
import com.microsservice.concessionaria.domain.pessoa.Pessoa;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "funcionarios")
public class Funcionario extends Pessoa {

    private double salario;
    private double comissao;

    public Funcionario() {}

    public Funcionario(FuncionarioDTO funcionarioDTO) {
        super(funcionarioDTO.nome(), new Endereco(funcionarioDTO.endereco()), funcionarioDTO.idade());
        this.salario = funcionarioDTO.salario();
        this.comissao = 0.00;
    }

    public double getSalario() {
        return salario;
    }

    public double getComissao() {
        return comissao;
    }

    public void calcularComissao(double valorCarro) {
        this.comissao = valorCarro * 0.05; // Define a comissão como 5% do valor do carro
    }
}