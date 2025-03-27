package com.microsservice.concessionaria.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.microsservice.concessionaria.exception.cliente.ClienteException;
import com.microsservice.concessionaria.exception.cliente.ClienteNaoEncontradoException;
import com.microsservice.concessionaria.exception.funcionario.FuncionarioException;
import com.microsservice.concessionaria.exception.funcionario.FuncionarioNaoEncontradoException;
import com.microsservice.concessionaria.exception.validacao.ValidacaoException;
import com.microsservice.concessionaria.exception.veiculo.VeiculoException;
import com.microsservice.concessionaria.exception.veiculo.VeiculoNaoEncontradoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Captura exceções personalizadas da aplicação
    @ExceptionHandler(VeiculoException.class)
    public ResponseEntity<ResponseError> veiculoException(VeiculoException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Captura erros de validação de DTOs (exemplo: @NotNull, @Min, @Max, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseError> handleValidationException(MethodArgumentNotValidException ex) {
        // Obtém todas as mensagens de erro da validação
        List<String> erros = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();

        // Constrói a resposta com a lista de erros
        ResponseError response = new ResponseError(
                "Erro de validação nos campos",
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now(),
                erros
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Captura a exceção personalizada de Veiculo não encontrado
    @ExceptionHandler(VeiculoNaoEncontradoException.class)
    public ResponseEntity<ResponseError> handleVeiculoNaoEncontrado(VeiculoNaoEncontradoException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Captura exceções relacionadas a Funcionário
    @ExceptionHandler(FuncionarioException.class)
    public ResponseEntity<ResponseError> handleFuncionarioException(FuncionarioException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Captura a exceção personalizada de Funcionário não encontrado
    @ExceptionHandler(FuncionarioNaoEncontradoException.class)
    public ResponseEntity<ResponseError> handleFuncionarioNaoEncontrado(FuncionarioNaoEncontradoException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Captura exceções relacionadas a Cliente
    @ExceptionHandler(ClienteException.class)
    public ResponseEntity<ResponseError> handleClienteException(ClienteException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Captura a exceção personalizada de Cliente não encontrado
    @ExceptionHandler(ClienteNaoEncontradoException.class)
    public ResponseEntity<ResponseError> handleClienteNaoEncontrado(ClienteNaoEncontradoException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.NOT_FOUND,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseError> handleIllegalArgumentException(IllegalArgumentException ex) {
        ResponseError response = new ResponseError(
                "Erro de negócio",
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now(),
                List.of(ex.getMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    //Captura exceção de validação e devolve e trata o erro 400
    @ExceptionHandler(ValidacaoException.class)
    public ResponseEntity<ResponseError> handleValidacaoException(ValidacaoException ex) {
        ResponseError response = new ResponseError(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<ResponseError> handleInvalidFormatException(InvalidFormatException ex) {
        ResponseError response = new ResponseError(
                "Erro de formatação: O valor fornecido não é válido.",
                HttpStatus.BAD_REQUEST,
                LocalDateTime.now(),
                List.of(ex.getOriginalMessage())
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Captura qualquer outra exceção não tratada
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseError> trataException(Exception ex) {
        ResponseError response = new ResponseError(
                "Erro interno no servidor: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}