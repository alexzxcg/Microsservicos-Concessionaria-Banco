package com.microsservice.concessionaria.repository;

import com.microsservice.concessionaria.domain.funcionario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
