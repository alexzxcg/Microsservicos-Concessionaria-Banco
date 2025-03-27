package com.microsservice.concessionaria.domain.venda.validacao;

import com.microsservice.concessionaria.domain.venda.VendaDTO;

public interface ValidarVenda {

    void validar(VendaDTO vendaDTO);
}
