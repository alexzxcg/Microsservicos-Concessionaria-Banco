ALTER TABLE veiculos
    MODIFY COLUMN categoria ENUM(
        'CARRO_DE_PASSEIO',
        'SPORT',
        'ELETRICO',
        'TRUCK',
        'TRI_TRUCK',
        'BAIXA_CILINDRADA',
        'MEDIA_CILINDRADA',
        'ALTA_CILINDRADA',
        'BITREM',
        'RODOTREM'
    ) NOT NULL;
