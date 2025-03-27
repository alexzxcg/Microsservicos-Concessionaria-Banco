package com.microsservice.concessionaria.domain.venda;

import com.microsservice.concessionaria.domain.cliente.Cliente;
import com.microsservice.concessionaria.domain.funcionario.Funcionario;
import com.microsservice.concessionaria.domain.veiculo.Veiculo;
import com.microsservice.concessionaria.exception.validacao.ValidacaoException;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @OneToOne
    @JoinColumn(name = "veiculo_id", nullable = false, unique = true)
    private Veiculo veiculo;

    private BigDecimal valorVenda;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FormaDePagamento formaDePagamento;

    private Integer numeroParcelas;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataDaVenda;

    public Venda() {}

    public Venda(VendaDTO dto, Funcionario funcionario, Cliente cliente, Veiculo veiculo) {
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.veiculo = veiculo;
        this.valorVenda = veiculo.getPreco(); // O preço do veículo define o valor da venda
        this.formaDePagamento = FormaDePagamento.valueOf(dto.formaDePagamento().toUpperCase());

        // Verifica se a forma de pagamento exige parcelamento
        this.numeroParcelas = this.formaDePagamento.exigeParcelamento()
                ? dto.numeroParcelas()
                : null; // Caso pagamento não exige parcela, define como null.

        this.dataDaVenda = LocalDateTime.now(); // Atribui automaticamente a data e hora da venda
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Veiculo getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
        this.valorVenda = veiculo.getPreco(); // Atualiza o valor da venda conforme o veículo
    }

    public BigDecimal getValorVenda() {
        return valorVenda;
    }

    public FormaDePagamento getFormaDePagamento() {
        return formaDePagamento;
    }

    public void setFormaDePagamento(FormaDePagamento formaDePagamento) {
        this.formaDePagamento = formaDePagamento;
    }

    public Integer getNumeroParcelas() {
        return numeroParcelas;
    }

    public LocalDateTime getDataDaVenda() {
        return dataDaVenda;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Venda venda = (Venda) object;
        return Objects.equals(id, venda.id) && Objects.equals(funcionario, venda.funcionario) && Objects.equals(cliente, venda.cliente) && Objects.equals(veiculo, venda.veiculo) && Objects.equals(valorVenda, venda.valorVenda) && formaDePagamento == venda.formaDePagamento && Objects.equals(numeroParcelas, venda.numeroParcelas) && Objects.equals(dataDaVenda, venda.dataDaVenda);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, funcionario, cliente, veiculo, valorVenda, formaDePagamento, numeroParcelas, dataDaVenda);
    }
}