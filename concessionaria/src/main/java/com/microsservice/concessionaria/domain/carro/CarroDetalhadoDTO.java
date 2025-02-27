package com.microsservice.concessionaria.domain.carro;

import com.microsservice.concessionaria.domain.veiculo.Categoria;

import java.math.BigDecimal;

public record CarroDetalhadoDTO(Long id, String marca, String modelo, Integer ano, BigDecimal preco, String motor, Categoria categoria) {
    public CarroDetalhadoDTO(Carro carro){
        this(carro.getId(), carro.getMarca(), carro.getModelo(), carro.getAno(), carro.getPreco(), carro.getMotor(), carro.getCategoria());
    }
}
