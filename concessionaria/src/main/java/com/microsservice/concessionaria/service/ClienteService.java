package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.cliente.Cliente;
import com.microsservice.concessionaria.domain.cliente.ClienteDTO;
import com.microsservice.concessionaria.domain.cliente.ClienteDetalhadoDTO;
import com.microsservice.concessionaria.domain.funcionario.Funcionario;
import com.microsservice.concessionaria.domain.funcionario.FuncionarioDetalhadoDTO;
import com.microsservice.concessionaria.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    public ClienteDetalhadoDTO criarCliente(ClienteDTO clienteDTO) {
        // Converte o DTO em Cliente, usando o construtor da classe Funcionario
        Cliente cliente= new Cliente(clienteDTO);

        // Salva e transforma o Cliente em ClienteoDetalhadoDTO usando lambda
        return Optional.of(clienteRepository.save(cliente))
                .map(ClienteDetalhadoDTO::new)
                .orElseThrow(() -> new RuntimeException("Erro ao criar Funcionario")); // Lança exceção se não for encontrado
    }

    public List<ClienteDetalhadoDTO> listarClientes() {
        // Recupera todos os clientes do banco e converte para o DTO detalhado
        return clienteRepository.findAll().stream()
                .map(ClienteDetalhadoDTO::new)
                .collect(Collectors.toList());
    }

    public ClienteDetalhadoDTO buscarClientePorId(Long id) {
        return clienteRepository.findById(id)
                .map(ClienteDetalhadoDTO::new)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));
    }
}
