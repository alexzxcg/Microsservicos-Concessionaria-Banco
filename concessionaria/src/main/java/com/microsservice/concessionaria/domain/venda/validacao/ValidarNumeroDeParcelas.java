package com.microsservice.concessionaria.domain.venda.validacao;

import com.microsservice.concessionaria.domain.venda.FormaDePagamento;
import com.microsservice.concessionaria.domain.venda.VendaDTO;
import com.microsservice.concessionaria.exception.validacao.ValidacaoException;
import org.springframework.stereotype.Component;

@Component
public class ValidarNumeroDeParcelas implements ValidarVenda {

    @Override
    public void validar(VendaDTO vendaDTO) {
        FormaDePagamento formaDePagamento = FormaDePagamento.valueOf(vendaDTO.formaDePagamento());

        Integer numeroParcelas = vendaDTO.numeroParcelas();

        // Validações sobre o número de parcelas
        if (formaDePagamento.exigeParcelamento() && (numeroParcelas == null || numeroParcelas <= 0)) {
            throw new ValidacaoException("Número de parcelas deve ser informado para financiamento e deve ser maior que zero.");
        }

        if (!formaDePagamento.exigeParcelamento() && numeroParcelas != null) {
            throw new ValidacaoException("Pagamento à vista não deve ter parcelamento.");
        }
    }
}
