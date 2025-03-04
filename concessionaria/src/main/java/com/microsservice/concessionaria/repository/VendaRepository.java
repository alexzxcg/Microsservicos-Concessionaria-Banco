package com.microsservice.concessionaria.repository;

import com.microsservice.concessionaria.domain.venda.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Venda, Long> {
}