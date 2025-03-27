package com.microsservice.concessionaria.domain.caminhao;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.VeiculoFactory;
import com.microsservice.concessionaria.exception.veiculo.VeiculoException;

import java.math.BigDecimal;
import java.util.Optional;

public class CaminhaoFactory extends VeiculoFactory {

    Integer eixo;

    public CaminhaoFactory(String marca, String modelo, Integer ano, BigDecimal preco, Integer eixo) {
        super(marca, modelo, ano, preco);
        this.eixo = eixo;
    }

    @Override
    public Caminhao criarVeiculo() {
        Categoria categoria = definirCategoriaDoVeiculo();
        return new Caminhao(marca, modelo, ano, preco, eixo, categoria);
    }

    //Mapeia a categoria do caminhao de acordo com o numero de eixos
    @Override
    protected Categoria definirCategoriaDoVeiculo() {
        return Optional.ofNullable(
                 (eixo == 2) ? Categoria.TRUCK
                : (eixo > 2 && eixo <= 4) ? Categoria.TRI_TRUCK
                : (eixo > 4 && eixo <= 7) ? Categoria.BITREM
                : (eixo > 7 && eixo <= 11) ? Categoria.RODOTREM
                : null
        ).orElseThrow(() -> new VeiculoException("Número de eixos inválido para qualquer categoria de caminhão."));
    }
}
