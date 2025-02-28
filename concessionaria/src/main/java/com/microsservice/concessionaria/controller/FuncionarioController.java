package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.funcionario.FuncionarioDTO;
import com.microsservice.concessionaria.domain.funcionario.FuncionarioDetalhadoDTO;
import com.microsservice.concessionaria.service.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping
    public ResponseEntity<FuncionarioDetalhadoDTO> criarFuncionario(@Valid @RequestBody FuncionarioDTO dto, UriComponentsBuilder uriBuilder) {
        FuncionarioDetalhadoDTO funcionarioDevolvido = funcionarioService.criarFuncionario(dto);
        var uri = uriBuilder.path("/carros/{id}").buildAndExpand(funcionarioDevolvido.id()).toUri();
        return ResponseEntity.created(uri).body(funcionarioDevolvido);
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioDetalhadoDTO>> listagemDeFuncionarios() {
        List<FuncionarioDetalhadoDTO> funcionariosRecebidos = funcionarioService.listarFuncionarios();
        return ResponseEntity.ok(funcionariosRecebidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity listarFuncionarioPorId(@PathVariable Long id){
        FuncionarioDetalhadoDTO funcionarioDetalhadoDTO = funcionarioService.buscarFuncionarioPorId(id);
        return ResponseEntity.ok(funcionarioDetalhadoDTO);
    }
}
