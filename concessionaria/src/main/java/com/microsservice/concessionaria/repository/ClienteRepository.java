package com.microsservice.concessionaria.repository;

import com.microsservice.concessionaria.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}