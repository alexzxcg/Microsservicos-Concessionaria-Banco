# PICB - Plataforma Integrada de Concessionária e Banco

## Visão Geral

**PICB (Plataforma Integrada de Concessionária e Banco)** é uma solução distribuída composta por dois sistemas principais:
- Um sistema monolítico para gestão de concessionária
- Um sistema de microsserviços para operações bancárias
  
Ambos os sistemas se comunicam de forma assíncrona por meio de filas RabbitMQ, permitindo a simulação, solicitação e processamento de financiamentos veiculares.

---

## Sistema da Concessionária (Monolito)
- API RESTful em Java com Spring Boot
- Controle de estoque de veículos
- Registro de vendas
- Integração com o sistema bancário usando RabbitMQ
- Geração de requisições para financiamento e pagamentos
- Gestão de usuários e segurança

## Sistema do Banco (Microsserviços)
- API RESTful em Node.js com Express e Java com Spring Boot
- Gerenciar clientes e contas bancárias
- Simular financiamentos
- Criar e aprovar financiamentos
- Processar pagamentos e transações
- Gestão de usuários e segurança
- Comunicação entre Microsserviços com RabbitMQ

---

## Diagrama C4
<details>
  <summary>Nivel-1</summary>
  Em desenvolvimento....
</details>

<details>
  <summary>Nivel-2</summary>
  Em desenvolvimento....
</details>

<details>
  <summary>Nivel-3</summary>
  Em desenvolvimento....
</details>

---

## Comunicação Entre Sistemas
**Contrato de API:**
- O sistema da Concessionária segue um contrato de API bem definido para se comunicar com o sistema do Banco.
- A Concessionária pode publicar mensagens em filas específicas disponibilizadas pelo Banco.
- O Banco se responsabiliza por processar essas mensagens conforme os fluxos de negócio.
  
Esse contrato define as operações permitidas, os formatos das mensagens e as filas que o sistema da Concessionária pode utilizar para interagir com os serviços bancários.
As principais funcionalidades disponibilizadas por esse contrato são:
- Simulação de financiamento
- Solicitação de financiamento
- Processamento de pagamento

**Filas Disponibilizadas:**
- simulacao-financiamento: recebe pedidos de simulação de financiamento de veículos enviados pela Concessionária.
- solicitacao-financiamento: recebe solicitações formais de financiamento para análise bancária.
- processar-pagamento: Recebe requisições de processamento de pagamento, debito ou crédito.

---

## Integração entre os Microsserviços do Banco

As mensagens recebidas nas filas são processadas pelo **Microsserviço de Pagamentos**, que atua como **orquestrador das operações financeiras** do sistema bancário.  
Além disso, ele é responsável por **registrar todas as transações financeiras realizadas**.

### Responsabilidades do Microsserviço de Pagamentos:

- **Validar e processar** as mensagens recebidas das filas:
  - `simulacao-financiamento`
  - `solicitacao-financiamento`
  - `processar-pagamento`

- **Registrar transações financeiras** no banco de dados.

- **Comunicar-se com os demais microsserviços bancários** para completar as operações, como:
  - **Serviço de Clientes-Contas**  
  - **Serviço de Financiamentos**  

---

## Documentação Detalhada
Cada sistema possui seu próprio README.md com:

- Requisitos

- Funcionalidades

- Endpoints disponíveis

- Regras de negócio

- Tecnologias

**Links:**
- [Concessionaria]()
- [Clientes-Contas-ms]()
- [Financiamentos-ms]()

---