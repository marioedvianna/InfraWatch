const cron = require('node-cron');
const app = require('./api/app');
const { checkServices } = require('./worker/monitor');
const logger = require('./shared/utils/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// 1. Inicia o Servidor API
app.listen(PORT, () => {
  logger.info(`🚀 API do InfraWatch rodando na porta ${PORT}`);
});

// 2. Agenda o Monitoramento (Worker)
// Roda a cada 1 minuto
cron.schedule('*/1 * * * *', () => {
  checkServices();
});

// Execução imediata ao iniciar
checkServices();