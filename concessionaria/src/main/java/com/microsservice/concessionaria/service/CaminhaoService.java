package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.caminhao.Caminhao;
import com.microsservice.concessionaria.domain.caminhao.CaminhaoDTO;
import com.microsservice.concessionaria.domain.caminhao.CaminhaoDetalhadoDTO;
import com.microsservice.concessionaria.domain.caminhao.CaminhaoFactory;
import com.microsservice.concessionaria.domain.veiculo.StatusVeiculo;
import com.microsservice.concessionaria.exception.veiculo.VeiculoNaoEncontradoException;
import com.microsservice.concessionaria.repository.CaminhaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CaminhaoService {

    @Autowired
    private CaminhaoRepository caminhaoRepository;

    @Transactional
    public CaminhaoDetalhadoDTO criarCaminhao(CaminhaoDTO caminhaoDTO) {
        CaminhaoFactory caminhaoFactory = new CaminhaoFactory(
                caminhaoDTO.marca(),
                caminhaoDTO.modelo(),
                caminhaoDTO.ano(),
                caminhaoDTO.preco(),
                caminhaoDTO.eixos()
        );
        Caminhao caminhao = caminhaoFactory.criarVeiculo();
        caminhaoRepository.save(caminhao);

        return new CaminhaoDetalhadoDTO(caminhao);
    }

    //Lista apenas os veiculo em estoque
    public List<CaminhaoDetalhadoDTO> listarCaminhoes() {
        return caminhaoRepository.findByStatus(StatusVeiculo.EM_ESTOQUE).stream()
                .map(CaminhaoDetalhadoDTO::new)
                .collect(Collectors.toList());
    }

    public CaminhaoDetalhadoDTO buscarCaminhaoPorId(Long id) {
        return caminhaoRepository.findById(id).map(CaminhaoDetalhadoDTO::new)
                .orElseThrow(() -> new VeiculoNaoEncontradoException(id));
    }
}
