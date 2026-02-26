
# 🛡️ InfraWatch
[![Node.js CI](https://github.com/marioedvianna/InfraWatch/actions/workflows/ci.yml/badge.svg)](https://github.com/marioedvianna/InfraWatch/actions)
**Monitoramento de Serviços e Observabilidade com Node.js, Docker e PostgreSQL.**

O InfraWatch é um sistema para verificação automática da disponibilidade de serviços HTTP.
Ele combina conceitos de administração de sistemas, observabilidade e arquitetura desacoplada, utilizando containerização para garantir consistência de ambiente.

---

## 🚀 Tecnologias Utilizadas

* **Runtime:** Node.js
* **Banco de Dados:** PostgreSQL (Relacional)
* **Containerização:** Docker & Docker Compose
* **Agendamento:** Node-Cron
* **Logs & Observabilidade:** Pino (Structured Logging)
* **API:** Express.js

---

## 🛠️ Arquitetura e Diferenciais Técnicos

Este projeto foi construído focando em **separação de responsabilidades** e **resiliência**:

* **Worker Independente:** Um robô em segundo plano que executa as verificações de forma assíncrona.
* **Histórico de Logs:** Diferente de um simples monitor, o InfraWatch salva o tempo de resposta e o código de status de cada verificação, permitindo análises futuras de performance (Observabilidade).
* **Ambiente Imutável:** Graças ao Docker, o ambiente de desenvolvimento é idêntico ao de produção.
* **SQL de Inicialização:** O banco de dados se autoconfigura ao subir o container pela primeira vez.

---

## ⚙️ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/marioedvianna/InfraWatch.git
    ```

2.  **Certifique-se de ter o Docker e o Docker Compose instalados.**

3.  **Inicie a stack completa:**
    ```bash
    docker-compose up --build -d
    ```

4.  **Acesse a API:**
    * **Lista de serviços:** `http://localhost:3000/services`
    * **Health Check:** `http://localhost:3000/`

---

## 📖 Guia de Uso

O InfraWatch permite gerenciar os serviços monitorados de duas formas:

### 1️⃣ Adição Estática (Antes de subir o ambiente)

Se você deseja iniciar o sistema com uma lista pré-definida de sites:
1. Localize o arquivo: `docker/postgres/init.sql`
2. Adicione novas linhas na instrução `INSERT INTO services`.
3. Suba o ambiente com:
    ```bash
    docker-compose up --build -d
    ```

> ⚠️ **Observação:** Esta ação só terá efeito se o volume do banco ainda não tiver sido criado. Caso já exista, será necessário remover o volume com: `docker-compose down -v`.

### 2️⃣ Adição Dinâmica (Com o sistema em execução)

Você pode cadastrar novos serviços em tempo real através da API REST, sem precisar reiniciar os containers.

**Via Terminal (cURL):**
```bash
curl -X POST http://localhost:3000/services \
    -H "Content-Type: application/json" \
    -d '{"name": "Meu Novo Site", "url": "https://exemplo.com"}'
```

## 🎯 Próximas Evoluções

-   [ ] Implementação de notificações via Telegram.
    
-   [ ] Dashboard simples para visualização dos logs.
    
-   [ ] Testes automatizados de integração.
