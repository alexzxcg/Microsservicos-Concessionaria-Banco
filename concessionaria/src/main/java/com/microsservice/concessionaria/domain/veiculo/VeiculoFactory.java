package com.microsservice.concessionaria.domain.veiculo;

import java.math.BigDecimal;

public abstract class VeiculoFactory {
    protected String marca;
    protected String modelo;
    protected Integer ano;
    protected BigDecimal preco;

    public VeiculoFactory(String marca, String modelo, Integer ano, BigDecimal preco) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.preco = preco;
    }

    public abstract Veiculo criarVeiculo();

    protected abstract Categoria definirCategoriaDoVeiculo();
}
