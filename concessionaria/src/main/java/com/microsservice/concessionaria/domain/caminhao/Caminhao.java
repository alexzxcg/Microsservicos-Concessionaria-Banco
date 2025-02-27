package com.microsservice.concessionaria.domain.caminhao;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "caminhoes")
public class Caminhao extends Veiculo {

    private Integer eixos;

    public Caminhao(String marca, String modelo, Integer ano, BigDecimal preco, Integer eixos, Categoria categoria) {
        super(marca, modelo, ano, preco, categoria);
        this.eixos = eixos;
    }

    public Caminhao(){}

    public Integer getEixos() {
        return eixos;
    }

    public void setEixo(Integer eixos) {
        this.eixos = eixos;
    }
}
