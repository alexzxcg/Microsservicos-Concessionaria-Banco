package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.moto.Moto;
import com.microsservice.concessionaria.domain.moto.MotoDTO;
import com.microsservice.concessionaria.domain.moto.MotoDetalhadaDTO;
import com.microsservice.concessionaria.domain.moto.MotoFactory;
import com.microsservice.concessionaria.domain.veiculo.StatusVeiculo;
import com.microsservice.concessionaria.repository.MotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MotoService {

    @Autowired
    private MotoRepository motoRepository;

    @Transactional
    public MotoDetalhadaDTO criarMoto(MotoDTO motoDTO){
        MotoFactory motoFactory = new MotoFactory(
                motoDTO.marca(),
                motoDTO.modelo(),
                motoDTO.ano(),
                motoDTO.preco(),
                motoDTO.cilindradas()
        );

        Moto moto= (Moto) motoFactory.criarVeiculo();
        motoRepository.save(moto);

        return new MotoDetalhadaDTO(moto);
    }

    public List<MotoDetalhadaDTO> listarMotos(){
        return motoRepository.findByStatus(StatusVeiculo.EM_ESTOQUE).stream()
                .map(MotoDetalhadaDTO::new)
                .collect(Collectors.toList());
    }
}
