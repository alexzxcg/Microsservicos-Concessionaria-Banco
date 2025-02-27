package com.microsservice.concessionaria.domain.caminhao;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import com.microsservice.concessionaria.domain.veiculo.VeiculoFactory;

import java.math.BigDecimal;
import java.util.Optional;

public class CaminhaoFactory extends VeiculoFactory {

    Integer eixo;

    public CaminhaoFactory(String marca, String modelo, Integer ano, BigDecimal preco, Integer eixo) {
        super(marca, modelo, ano, preco);
        this.eixo = eixo;
    }

    @Override
    public Veiculo criarVeiculo() {
        Categoria categoria = definirCategoriaDoVeiculo();
        return new Caminhao(marca, modelo, ano, preco, eixo, categoria);
    }

    @Override
    protected Categoria definirCategoriaDoVeiculo() {
        return Optional.ofNullable(
                 (eixo == 2) ? Categoria.TRUCK
                : (eixo > 2 && eixo <= 4) ? Categoria.TRI_TRUCK
                : (eixo > 4 && eixo <= 7) ? Categoria.BITREM
                : (eixo > 7 && eixo <= 11) ? Categoria.RODOTREM
                : null
        ).orElseThrow(() -> new IllegalArgumentException("Eixo não é compativel com nenhuma categoria."));
    }
}
