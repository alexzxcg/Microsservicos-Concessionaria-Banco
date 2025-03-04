package com.microsservice.concessionaria.domain.venda;

import jakarta.validation.constraints.NotNull;

public record VendaDTO(
        @NotNull Long funcionarioId,
        @NotNull Long clienteId,
        @NotNull Long veiculoId,
        @NotNull FormaDePagamento formaDePagamento,
        Integer numeroParcelas
) {}