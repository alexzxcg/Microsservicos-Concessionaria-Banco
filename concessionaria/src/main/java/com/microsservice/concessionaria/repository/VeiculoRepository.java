package com.microsservice.concessionaria.repository;

import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import com.microsservice.concessionaria.domain.veiculo.StatusVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VeiculoRepository<T extends Veiculo> extends JpaRepository<T, Long> {
    List<T> findByStatus(StatusVeiculo status);
}
