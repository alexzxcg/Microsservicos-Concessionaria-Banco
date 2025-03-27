package com.microsservice.concessionaria.domain.venda.validacao;

import com.microsservice.concessionaria.domain.venda.FormaDePagamento;
import com.microsservice.concessionaria.domain.venda.VendaDTO;
import com.microsservice.concessionaria.exception.validacao.ValidacaoException;
import org.springframework.stereotype.Component;

import java.util.EnumSet;

@Component
public class ValidarFormaDePagamento implements ValidarVenda{

    @Override
    public void validar(VendaDTO vendaDTO) {
        try {
            FormaDePagamento formaDePagamento = FormaDePagamento.valueOf(vendaDTO.formaDePagamento().toUpperCase());

            if (!EnumSet.of(FormaDePagamento.A_VISTA,
                            FormaDePagamento.FINANCIAMENTO_PARCIAL,
                            FormaDePagamento.FINANCIAMENTO_TOTAL)
                    .contains(formaDePagamento)) {
                throw new ValidacaoException("Forma de pagamento inválida");
            }

        } catch (IllegalArgumentException | NullPointerException e) {
            throw new ValidacaoException("Forma de pagamento inválida");
        }
    }
}
