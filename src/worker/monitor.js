const db = require('../shared/database/index');
const logger = require('../shared/utils/logger');

async function checkServices() {
  logger.info('🔍 Iniciando rodada de monitoramento...');
  
  try {
    const { rows: services } = await db.query('SELECT * FROM services');

    for (const service of services) {
      const start = Date.now();
      let statusCode = null;
      let success = false;
      let errorMessage = null;

      try {
        const response = await fetch(service.url, { method: 'GET', signal: AbortSignal.timeout(5000) });
        statusCode = response.status;
        success = response.ok;
      } catch (error) {
        errorMessage = error.message;
        logger.error(`❌ Falha ao acessar ${service.name} (${service.url}): ${errorMessage}`);
      }

      const responseTime = Date.now() - start;

      // 1. Atualiza o status atual do serviço
      await db.query(
        'UPDATE services SET status = $1, last_check = NOW() WHERE id = $2',
        [success ? 'online' : 'offline', service.id]
      );

      // 2. Registra o log histórico (Métrica de Observabilidade)
      await db.query(
        'INSERT INTO logs (service_id, status_code, response_time, success, error_message) VALUES ($1, $2, $3, $4, $5)',
        [service.id, statusCode, responseTime, success, errorMessage]
      );

      logger.info(`✅ ${service.name}: ${success ? 'ONLINE' : 'OFFLINE'} (${responseTime}ms)`);
    }
  } catch (error) {
    logger.error('🚨 Erro crítico no worker:', error);
  }
}

module.exports = { checkServices };