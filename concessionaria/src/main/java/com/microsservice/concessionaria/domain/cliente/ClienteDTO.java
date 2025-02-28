package com.microsservice.concessionaria.domain.cliente;

import com.microsservice.concessionaria.domain.endereco.EnderecoDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ClienteDTO(
        @NotNull(message = "Nome não pode ser nulo")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,

        @NotNull(message = "Idade não pode ser nula")
        int idade,

        @NotNull(message = "CPF não pode ser nulo")
        @Size(min = 11, max = 11, message = "CPF deve ter 11 caracteres")
        String cpf,

        @NotNull(message = "Endereço não pode ser nulo")
        EnderecoDTO endereco
) {
}
