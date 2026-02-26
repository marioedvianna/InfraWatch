const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    console.log('🔄 Tentando conectar ao PostgreSQL no CI...');
    await client.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    await client.end();
    process.exit(0); // Sucesso
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.stack);
    process.exit(1); // Falha (faz o CI ficar vermelho)
  }
}

testConnection();