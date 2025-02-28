package com.microsservice.concessionaria.domain.funcionario;

import com.microsservice.concessionaria.domain.endereco.Endereco;

public record FuncionarioDetalhadoDTO(Long id, String nome, Endereco endereco, int idade, double salario, double comissao) {
    public FuncionarioDetalhadoDTO(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEndereco(), funcionario.getIdade(), funcionario.getSalario(), funcionario.getComissao());
    }
}
