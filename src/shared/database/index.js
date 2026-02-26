const { Pool } = require('pg');
require('dotenv').config();

// Configurações do Pool usando as variáveis do seu arquivo .env
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Helper para executarmos queries sem precisar abrir/fechar a conexão manualmente
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Exportamos o pool caso precisemos de funções específicas depois
};