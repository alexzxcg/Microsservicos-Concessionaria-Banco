CREATE TABLE motos (
    id BIGINT PRIMARY KEY,  -- chave primária que referencia a tabela veiculos
    cilindradas INT NOT NULL CHECK (cilindradas >= 50 AND cilindradas <= 2000),  -- restrição para as cilindradas entre 50 e 2000
    FOREIGN KEY (id) REFERENCES veiculos(id) ON DELETE CASCADE
);

CREATE TABLE caminhoes (
    id BIGINT PRIMARY KEY,  -- chave primária que referencia a tabela veiculos
    eixos INT NOT NULL CHECK (eixos >= 2 AND eixos <= 11),  -- restrição para o número de eixos entre 2 e 11
    FOREIGN KEY (id) REFERENCES veiculos(id) ON DELETE CASCADE
);
