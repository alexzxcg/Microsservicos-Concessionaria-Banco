package com.microsservice.concessionaria.domain.moto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record MotoDTO(
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

        @NotNull(message = "As cilindradas não podem ser nulas")
        @Min(value = 50, message = "A cilindrada mínima permitida é 50")
        @Max(value = 2000, message = "A cilindrada máxima permitida é 2000")
        Integer cilindradas
) {
}
