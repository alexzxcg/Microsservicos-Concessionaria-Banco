package com.microsservice.concessionaria.domain.venda;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record VendaDetalhadaDTO (
        Long id,
        Long funcionarioId,
        Long clienteId,
        Long veiculoId,
        BigDecimal valorVenda,
        FormaDePagamento formaDePagamento,
        Integer numeroParcelas,
        LocalDateTime dataDaVenda
){
    public VendaDetalhadaDTO(Venda venda) {
        this(
                venda.getId(),
                venda.getFuncionario().getId(),
                venda.getCliente().getId(),
                venda.getVeiculo().getId(),
                venda.getValorVenda(),
                venda.getFormaDePagamento(),
                venda.getNumeroParcelas(),
                venda.getDataDaVenda()
        );
    }
}
