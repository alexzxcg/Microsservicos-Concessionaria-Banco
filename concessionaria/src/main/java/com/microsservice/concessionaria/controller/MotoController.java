package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.moto.MotoDTO;
import com.microsservice.concessionaria.domain.moto.MotoDetalhadaDTO;
import com.microsservice.concessionaria.service.MotoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/motos")
public class MotoController {
    @Autowired
    private MotoService motoService;

    @PostMapping
    public ResponseEntity<MotoDetalhadaDTO> criarMoto(@Valid @RequestBody MotoDTO dto, UriComponentsBuilder uriBuilder) {
        MotoDetalhadaDTO motoDevolvida = motoService.criarMoto(dto);
        var uri = uriBuilder.path("/motos/{id}").buildAndExpand(motoDevolvida.id()).toUri();
        return ResponseEntity.created(uri).body(motoDevolvida);
    }

    @GetMapping
    public ResponseEntity<List<MotoDetalhadaDTO>> listagemDeMotos() {
        List<MotoDetalhadaDTO> motosRecebidas = motoService.listarMotos();
        return ResponseEntity.ok(motosRecebidas);
    }

}
