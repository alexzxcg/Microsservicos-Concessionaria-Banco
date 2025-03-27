package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.venda.VendaDTO;
import com.microsservice.concessionaria.domain.venda.VendaDetalhadaDTO;
import com.microsservice.concessionaria.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public ResponseEntity<VendaDetalhadaDTO> criarVenda(@Valid @RequestBody VendaDTO dto, UriComponentsBuilder uriBuilder) {
        VendaDetalhadaDTO vendaDevolvida = vendaService.criarVenda(dto);
        var uri = uriBuilder.path("/vendas/{id}").buildAndExpand(vendaDevolvida.id()).toUri();
        return ResponseEntity.created(uri).body(vendaDevolvida);
    }
}

