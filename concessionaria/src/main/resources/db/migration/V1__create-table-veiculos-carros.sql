CREATE TABLE veiculos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    status ENUM('EM_ESTOQUE', 'VENDIDO') NOT NULL
);

CREATE TABLE carros (
    id BIGINT PRIMARY KEY,  -- chave primária que referencia a tabela veiculos
    motor VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES veiculos(id) ON DELETE CASCADE
);
