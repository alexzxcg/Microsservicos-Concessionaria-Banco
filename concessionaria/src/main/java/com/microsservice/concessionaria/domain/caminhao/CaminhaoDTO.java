package com.microsservice.concessionaria.domain.caminhao;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record CaminhaoDTO(
        @NotBlank(message = "A marca não pode estar vazia")
        String marca,

        @NotBlank(message = "O modelo não pode estar vazio")
        String modelo,

        @NotNull(message = "O ano não pode ser nulo")
        @Min(value = 2000, message = "Ano inválido")
        @Max(value = 2025)
        Integer ano,

        @NotNull(message = "O preço não pode ser nulo")
        @DecimalMin(value = "0.01", message = "O preço deve ser maior que zero")
        BigDecimal preco,

        @NotNull(message = "O número de eixos não pode ser nulo")
        @Min(value = 2, message = "O caminhão deve ter no mínimo 2 eixos")
        @Max(value = 11, message = "O caminhão deve ter no máximo 11 eixos")
        Integer eixos
) {
}
