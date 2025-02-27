package com.microsservice.concessionaria.domain.caminhao;

import com.microsservice.concessionaria.domain.veiculo.Categoria;

import java.math.BigDecimal;

public record CaminhaoDetalhadoDTO(Long id, String marca, String modelo, Integer ano, BigDecimal preco, Integer eixo, Categoria categoria) {
    public CaminhaoDetalhadoDTO(Caminhao caminhao){
        this(caminhao.getId(), caminhao.getMarca(), caminhao.getModelo(), caminhao.getAno(), caminhao.getPreco(), caminhao.getEixos(), caminhao.getCategoria());
    }
}