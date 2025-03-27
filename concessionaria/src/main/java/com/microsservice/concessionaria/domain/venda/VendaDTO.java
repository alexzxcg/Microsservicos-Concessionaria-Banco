package com.microsservice.concessionaria.domain.venda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VendaDTO(
        @NotNull(message = "O id do funcionario não pode ser nulo")
        Long funcionarioId,

        @NotNull(message = "O id do cliente não pode ser nulo")
        Long clienteId,

        @NotNull(message = "O id do veiculo não pode ser nulo")
        Long veiculoId,

        @NotBlank(message = "Forma de pagamento não pode ser vazia")
        String formaDePagamento,

        Integer numeroParcelas
) {}