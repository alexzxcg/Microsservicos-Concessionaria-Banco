package com.microsservice.concessionaria.controller;

import com.microsservice.concessionaria.domain.cliente.ClienteDTO;
import com.microsservice.concessionaria.domain.cliente.ClienteDetalhadoDTO;
import com.microsservice.concessionaria.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteDetalhadoDTO> criarCliente(@Valid @RequestBody ClienteDTO dto, UriComponentsBuilder uriBuilder) {
        ClienteDetalhadoDTO clienteDevolvido = clienteService.criarCliente(dto);
        var uri = uriBuilder.path("/clientes/{id}").buildAndExpand(clienteDevolvido.id()).toUri();
        return ResponseEntity.created(uri).body(clienteDevolvido);
    }

    @GetMapping
    public ResponseEntity<List<ClienteDetalhadoDTO>> listagemDeClientes() {
        List<ClienteDetalhadoDTO> clientesRecebidos = clienteService.listarClientes();
        return ResponseEntity.ok(clientesRecebidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDetalhadoDTO> listarClientePorId(@PathVariable Long id) {
        ClienteDetalhadoDTO clienteDetalhadoDTO = clienteService.buscarClientePorId(id);
        return ResponseEntity.ok(clienteDetalhadoDTO);
    }
}
