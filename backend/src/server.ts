import { app } from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const server = app.listen(env.PORT, () => {
  logger.info(`Portfolio API ready on port ${env.PORT}`);
});

const handleShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Closing HTTP server.`);
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
