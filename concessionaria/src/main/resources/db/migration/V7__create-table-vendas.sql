CREATE TABLE venda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    funcionario_id BIGINT NOT NULL,
    cliente_id BIGINT NOT NULL,
    veiculo_id BIGINT NOT NULL UNIQUE,
    valor_venda DECIMAL(10, 2) NOT NULL,
    forma_de_pagamento VARCHAR(50) NOT NULL,
    numero_parcelas INT,
    data_da_venda TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);
