-- Criação da tabela de serviços que serão monitorados
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'unknown',
    last_check TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para histórico de logs (Observabilidade)
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    status_code INTEGER,
    response_time INTEGER, -- em milissegundos
    success BOOLEAN,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir alguns dados para termos o que testar
INSERT INTO services (name, url) VALUES 
('Google', 'https://www.google.com'),
('GitHub', 'https://github.com'),
('Meu Site Fake', 'http://localhost:9999'); -- Esse aqui vai dar erro de propósito