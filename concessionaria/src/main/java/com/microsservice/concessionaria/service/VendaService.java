package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.cliente.Cliente;
import com.microsservice.concessionaria.domain.funcionario.Funcionario;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import com.microsservice.concessionaria.domain.venda.Venda;
import com.microsservice.concessionaria.domain.venda.VendaDTO;
import com.microsservice.concessionaria.domain.venda.VendaDetalhadaDTO;
import com.microsservice.concessionaria.repository.ClienteRepository;
import com.microsservice.concessionaria.repository.FuncionarioRepository;
import com.microsservice.concessionaria.repository.VeiculoRepository;
import com.microsservice.concessionaria.repository.VendaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Transactional
    public VendaDetalhadaDTO criarVenda(@Valid VendaDTO dto) {
        // Buscar os objetos associados pelos IDs passados no DTO
        Funcionario funcionario = findEntityById(funcionarioRepository, dto.funcionarioId(), "Funcionário não encontrado");
        Cliente cliente = findEntityById(clienteRepository, dto.clienteId(), "Cliente não encontrado");
        Veiculo veiculo = (Veiculo) findEntityById(veiculoRepository, dto.veiculoId(), "Veículo não encontrado");

        // Criar e salvar a venda
        Venda venda = vendaRepository.save(new Venda(dto, funcionario, cliente, veiculo));

        // Calcular comissão do vendedor
        funcionario.calcularComissao(veiculo.getPreco().doubleValue());

        // Atualizar status do veículo para "VENDIDO"
        veiculo.venderVeiculo();

        return new VendaDetalhadaDTO(venda);
    }

    // Método genérico para encontrar a entidade por ID
    private <T> T findEntityById(JpaRepository<T, Long> repository, Long id, String errorMessage) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(errorMessage));
    }
}
