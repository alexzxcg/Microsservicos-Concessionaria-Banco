package com.microsservice.concessionaria.domain.carro;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "carros")
public class Carro extends Veiculo {

    private String motor;

    public Carro() {}

    public Carro(String marca, String modelo, Integer ano, BigDecimal preco, String motor, Categoria categoria) {
        super(marca, modelo, ano, preco, categoria);
        this.motor = motor;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    @Override
    public String toString() {
        return "Carro{" + "motor='" + motor + '\'' + '}';
    }
}
