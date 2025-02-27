package com.microsservice.concessionaria.domain.moto;

import com.microsservice.concessionaria.domain.veiculo.Categoria;

import java.math.BigDecimal;

public record MotoDetalhadaDTO(Long id, String marca, String modelo, Integer ano, BigDecimal preco, int cilindrada, Categoria categoria) {
    public MotoDetalhadaDTO(Moto moto){
        this(moto.getId(), moto.getMarca(), moto.getModelo(), moto.getAno(), moto.getPreco(), moto.getCilindradas(), moto.getCategoria());
    }
}
