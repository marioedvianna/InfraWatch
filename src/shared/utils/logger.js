const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty', // Deixa o log legível para humanos no terminal
    options: {
      colorize: true,
    },
  },
});

module.exports = logger;