package com.microsservice.concessionaria.domain.moto;

import com.microsservice.concessionaria.domain.veiculo.Categoria;
import com.microsservice.concessionaria.domain.veiculo.VeiculoFactory;
import com.microsservice.concessionaria.exception.veiculo.VeiculoException;

import java.math.BigDecimal;
import java.util.Optional;

public class MotoFactory extends VeiculoFactory {

    private int cilindrada;

    public MotoFactory(String marca, String modelo, Integer ano, BigDecimal preco, int cilindrada) {
        super(marca, modelo, ano, preco);
        this.cilindrada = cilindrada;
    }

    @Override
    public Moto criarVeiculo() {
        Categoria categoria = definirCategoriaDoVeiculo();
        return new Moto(marca, modelo, ano, preco, cilindrada, categoria);
    }

    //Mapeia a categoria da moto de acordo com a potencia da sua cilindrada
    @Override
    protected Categoria definirCategoriaDoVeiculo() {
        return Optional.ofNullable(
                (cilindrada >= 50 && cilindrada <= 250) ? Categoria.BAIXA_CILINDRADA
                : (cilindrada >= 300 && cilindrada <= 600) ? Categoria.MEDIA_CILINDRADA
                : (cilindrada > 600) ? Categoria.ALTA_CILINDRADA
                : null
        ).orElseThrow(() -> new VeiculoException("Cilindrada não é compativel com nenhuma categoria deve estar entre 50 a 2000"));
    }
}
