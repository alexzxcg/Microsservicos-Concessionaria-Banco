package com.microsservice.concessionaria.domain.moto;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "motos")
public class Moto extends Veiculo {

    private Integer cilindradas;

    public Moto(String marca, String modelo, Integer ano, BigDecimal preco, Integer cilindradas, Categoria categoria) {
        super(marca, modelo, ano, preco, categoria);
        this.cilindradas = cilindradas;
    }

    public Moto(){}

    public Integer getCilindradas() {
        return cilindradas;
    }

    public void setCilindradas(Integer cilindradas) {
        this.cilindradas = cilindradas;
    }
}
