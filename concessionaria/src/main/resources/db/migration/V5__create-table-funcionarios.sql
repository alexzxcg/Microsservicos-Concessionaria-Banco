CREATE TABLE funcionarios (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    salario DOUBLE NOT NULL,
    comissao DOUBLE DEFAULT 0.00,
    logradouro VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    complemento VARCHAR(255),
    numero VARCHAR(20),
    PRIMARY KEY (id)
);