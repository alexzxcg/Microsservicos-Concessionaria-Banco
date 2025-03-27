package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.cliente.Cliente;
import com.microsservice.concessionaria.domain.funcionario.Funcionario;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import com.microsservice.concessionaria.domain.venda.FormaDePagamento;
import com.microsservice.concessionaria.domain.venda.Venda;
import com.microsservice.concessionaria.domain.venda.VendaDTO;
import com.microsservice.concessionaria.domain.venda.VendaDetalhadaDTO;
import com.microsservice.concessionaria.domain.venda.validacao.ValidarVenda;
import com.microsservice.concessionaria.exception.cliente.ClienteNaoEncontradoException;
import com.microsservice.concessionaria.exception.funcionario.FuncionarioNaoEncontradoException;
import com.microsservice.concessionaria.exception.veiculo.VeiculoNaoEncontradoException;
import com.microsservice.concessionaria.exception.venda.FormaDePagamentoInvalidaException;
import com.microsservice.concessionaria.repository.ClienteRepository;
import com.microsservice.concessionaria.repository.FuncionarioRepository;
import com.microsservice.concessionaria.repository.VeiculoRepository;
import com.microsservice.concessionaria.repository.VendaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Autowired
    private List<ValidarVenda> validadores;

    @Transactional
    public VendaDetalhadaDTO criarVenda(@Valid VendaDTO dto) {

        // Buscar os objetos associados pelos IDs passados no DTO
        Funcionario funcionario = findEntityById(funcionarioRepository, dto.funcionarioId(), Funcionario.class);
        Cliente cliente = findEntityById(clienteRepository, dto.clienteId(), Cliente.class);
        Veiculo veiculo = findEntityById(veiculoRepository, dto.veiculoId(), Veiculo.class);

        //Percorre todos os validadores e faz suas validações
        validadores.forEach(v -> v.validar(dto));

        // Criar e salvar a venda
        Venda venda = vendaRepository.save(new Venda(dto, funcionario, cliente, veiculo));

        // Calcular comissão do vendedor
        funcionario.calcularComissao(veiculo.getPreco().doubleValue());

        // Atualizar status do veículo para "VENDIDO"
        veiculo.venderVeiculo();

        return new VendaDetalhadaDTO(venda);
    }

    // Método genérico para encontrar a entidade por ID
    private <T> T findEntityById(JpaRepository<T, Long> repository, Long id, Class<T> entityClass) {
        // Verifica se a entidade foi encontrada, se não, lança a exceção correspondente
        return repository.findById(id)
                .orElseThrow(() -> {
                    if (entityClass.equals(Funcionario.class)) {
                        return new FuncionarioNaoEncontradoException(id);
                    } else if (entityClass.equals(Cliente.class)) {
                        return new ClienteNaoEncontradoException(id);
                    } else if (entityClass.equals(Veiculo.class)) {
                        return new VeiculoNaoEncontradoException(id);
                    }
                    return new RuntimeException("Entidade não encontrada");
                });
    }

}
