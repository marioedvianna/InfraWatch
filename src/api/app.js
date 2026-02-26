const express = require('express');
const db = require('../shared/database/index');
const logger = require('../shared/utils/logger');

const app = express();
app.use(express.json());

// Rota para listar todos os serviços e o status atual
app.get('/services', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM services ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    logger.error('Erro ao buscar serviços:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota para cadastrar um novo serviço para monitorar
app.post('/services', async (req, res) => {
  const { name, url } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ error: 'Nome e URL são obrigatórios' });
  }

  try {
    const { rows } = await db.query(
      'INSERT INTO services (name, url) VALUES ($1, $2) RETURNING *',
      [name, url]
    );
    logger.info(`Novo serviço cadastrado: ${name} (${url})`);
    res.status(201).json(rows[0]);
  } catch (err) {
    logger.error('Erro ao inserir serviço:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota Raiz - Boas-vindas/Health Check
app.get('/', (req, res) => {
  res.json({
    message: 'InfraWatch API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;