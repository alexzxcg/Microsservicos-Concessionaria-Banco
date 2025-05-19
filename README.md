# PICB - Plataforma Integrada de Concessionária e Banco

## Visão Geral

**PICB (Plataforma Integrada de Concessionária e Banco)** é uma solução distribuída composta por dois sistemas principais:
- Um sistema monolítico para gestão de concessionária
- Um sistema de microsserviços para operações bancárias

A comunicação entre os sistemas é realizada por uma combinação de chamadas REST seguras e mensagens assíncronas via filas RabbitMQ, garantindo escalabilidade, segurança e respostas em tempo adequado para simulações, financiamentos e pagamentos veiculares.

---

## Sistema da Concessionária (Monolito)
- API RESTful em Java com Spring Boot
- Controle de estoque de veículos
- Registro de vendas
- Integração com o sistema bancário usando API REST segura e webhooks para recebimento assíncrono das respostas
- Geração de requisições para financiamento e pagamentos
- Gestão de usuários e segurança

---

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

### Contrato de API (Atualizado)

- A Concessionária se cadastra na API do Banco informando URLs de **webhooks diferentes para cada tipo de operação** (simulação, financiamento, pagamento).
- Para realizar uma operação, a Concessionária faz uma **requisição REST HTTP POST autenticada** para o Banco em uma URL segura.
- O Banco publica uma mensagem na fila RabbitMQ para processamento assíncrono interno.
- Após o processamento, o Banco envia a resposta para o webhook cadastrado da Concessionária, garantindo um fluxo assíncrono e escalável.

### Fluxo resumido:

1. Concessionária faz requisição REST segura para o Banco (ex: `POST /api/pagamentos`)
2. Banco valida a requisição e publica mensagem na fila RabbitMQ
3. Microsserviço de Pagamentos processa a mensagem da fila
4. Banco envia a resposta processada para o webhook da Concessionária previamente cadastrado

### Segurança dos Webhooks

- Os webhooks são URLs públicas protegidas por:
  - Autenticação via token secreto (API Key ou Bearer Token)
  - Validação de assinatura HMAC nas requisições para garantir autenticidade
  - Comunicação via HTTPS obrigatória
  - Opcionalmente filtro por IPs confiáveis

---

## Filas Disponibilizadas (Internas ao Banco)

- `simulacao-financiamento`: processa pedidos de simulação de financiamento
- `solicitacao-financiamento`: processa solicitações formais de financiamento
- `processar-pagamento`: processa requisições de pagamento (débito/crédito)

---

## Integração entre os Microsserviços do Banco

O **Microsserviço de Pagamentos** é responsável por:

- Validar e processar mensagens nas filas:
  - `simulacao-financiamento`
  - `solicitacao-financiamento`
  - `processar-pagamento`
- Registrar transações financeiras no banco de dados
- Orquestrar chamadas entre microsserviços de clientes, contas e financiamentos
- Enviar respostas para os webhooks cadastrados nas Concessionárias

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
- [Pagamentos-ms]()

---