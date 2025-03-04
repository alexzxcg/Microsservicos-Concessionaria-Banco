package com.microsservice.concessionaria.service;

import com.microsservice.concessionaria.domain.carro.Carro;
import com.microsservice.concessionaria.domain.carro.CarroDTO;
import com.microsservice.concessionaria.domain.carro.CarroDetalhadoDTO;
import com.microsservice.concessionaria.domain.carro.CarroFactory;
import com.microsservice.concessionaria.domain.veiculo.StatusVeiculo;
import com.microsservice.concessionaria.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarroService {

    @Autowired
    private CarroRepository carroRepository;

    @Transactional
    public CarroDetalhadoDTO criarCarro(CarroDTO carroDTO){
        CarroFactory carroFactory = new CarroFactory(
                carroDTO.marca(),
                carroDTO.modelo(),
                carroDTO.ano(),
                carroDTO.preco(),
                carroDTO.motor()
        );

        Carro carro = carroFactory.criarVeiculo();
        carroRepository.save(carro);

        return new CarroDetalhadoDTO(carro);
    }

    public List<CarroDetalhadoDTO> listarCarros() {
        return carroRepository.findByStatus(StatusVeiculo.EM_ESTOQUE).stream()
                .map(CarroDetalhadoDTO::new)
                .collect(Collectors.toList());
    }
}
