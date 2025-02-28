package com.microsservice.concessionaria.domain.funcionario;

import com.microsservice.concessionaria.domain.endereco.EnderecoDTO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record FuncionarioDTO(

        @NotNull(message = "Nome não pode ser nulo")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,

        @NotNull(message = "Idade não pode ser nula")
        @Min(value = 18, message = "Idade deve ser maior ou igual a 18")
        int idade,

        @NotNull(message = "Endereço não pode ser nulo")
        EnderecoDTO endereco,

        @NotNull(message = "Salário não pode ser nulo")
        @Positive(message = "Salário deve ser um valor positivo")
        double salario
) {
}
