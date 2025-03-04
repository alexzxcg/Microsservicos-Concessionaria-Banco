package com.microsservice.concessionaria.domain.funcionario;

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
@Table(name = "funcionarios")
public class Funcionario extends Pessoa {

    private double salario;
    private double comissao;

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Venda> vendas = new ArrayList<>();

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
        this.comissao += valorCarro * 0.05; // Define a comissão como 5% do valor do carro
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Funcionario that = (Funcionario) object;
        return Double.compare(salario, that.salario) == 0 && Double.compare(comissao, that.comissao) == 0 && Objects.equals(vendas, that.vendas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(salario, comissao, vendas);
    }
}