package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.caminhao.CaminhaoDTO;
import com.microsservice.concessionaria.domain.caminhao.CaminhaoDetalhadoDTO;
import com.microsservice.concessionaria.service.CaminhaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/caminhoes")
public class CaminhaoController {

    @Autowired
    private CaminhaoService caminhaoService;

    @PostMapping
    public ResponseEntity<CaminhaoDetalhadoDTO> criarCaminhao(@Valid @RequestBody CaminhaoDTO dto, UriComponentsBuilder uriBuilder) {
        CaminhaoDetalhadoDTO caminhaoDevolvido = caminhaoService.criarCaminhao(dto);
        var uri = uriBuilder.path("/caminhoes/{id}").buildAndExpand(caminhaoDevolvido.id()).toUri();
        return ResponseEntity.created(uri).body(caminhaoDevolvido);
    }

    @GetMapping
    public ResponseEntity<List<CaminhaoDetalhadoDTO>> listagemDeCaminhoes() {
        List<CaminhaoDetalhadoDTO> caminhoesRecebidos = caminhaoService.listarCaminhoes();
        return ResponseEntity.ok(caminhoesRecebidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity listarCaminhaoPorId(@PathVariable Long id){
        CaminhaoDetalhadoDTO caminhaoDetalhadoDTO = caminhaoService.buscarCaminhaoPorId(id);
        return ResponseEntity.ok(caminhaoDetalhadoDTO);
    }
}
