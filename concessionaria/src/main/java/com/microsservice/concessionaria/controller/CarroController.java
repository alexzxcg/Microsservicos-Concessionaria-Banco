package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.carro.CarroDTO;
import com.microsservice.concessionaria.domain.carro.CarroDetalhadoDTO;
import com.microsservice.concessionaria.service.CarroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/carros")
public class CarroController {

    @Autowired
    private CarroService carroService;

    @PostMapping
    public ResponseEntity<CarroDetalhadoDTO> criarCarro(@Valid @RequestBody CarroDTO dto, UriComponentsBuilder uriBuilder) {
        CarroDetalhadoDTO carroDevolvido = carroService.criarCarro(dto);
        var uri = uriBuilder.path("/carros/{id}").buildAndExpand(carroDevolvido.id()).toUri();
        return ResponseEntity.created(uri).body(carroDevolvido);
    }

    @GetMapping
    public ResponseEntity<List<CarroDetalhadoDTO>> listagemDeCarros() {
        List<CarroDetalhadoDTO> carrosRecebidos = carroService.listarCarros();
        return ResponseEntity.ok(carrosRecebidos);
    }
}