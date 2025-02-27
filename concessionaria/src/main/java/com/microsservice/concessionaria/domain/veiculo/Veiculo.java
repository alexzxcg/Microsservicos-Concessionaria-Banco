package com.microsservice.concessionaria.domain.veiculo;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Estratégia para herança na JPA
@Table(name = "veiculos")
public abstract class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;
    private String modelo;
    private Integer ano;
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    private StatusVeiculo status;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    public Veiculo(String marca, String modelo, Integer ano, BigDecimal preco, Categoria categoria) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.preco = preco;
        this.status = StatusVeiculo.EM_ESTOQUE; // Status inicial padrão
        this.categoria = categoria;
    }

    public Veiculo() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public StatusVeiculo getStatus() {
        return status;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public void venderVeiculo() {
        if (this.status == StatusVeiculo.VENDIDO) {
            throw new IllegalStateException("Veículo já foi vendido.");
        }
        this.status = StatusVeiculo.VENDIDO;
    }

    @Override
    public String toString() {
        return "Veiculo{" +
                "id=" + id +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", ano=" + ano +
                ", preco=" + preco +
                ", status=" + status +
                '}';
    }
}
