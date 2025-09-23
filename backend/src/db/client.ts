import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
});

function enableShutdownHooks(client: PrismaClient) {
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}. Closing Prisma connection.`);
      await client.$disconnect();
      process.exit(0);
    });
  });
}

enableShutdownHooks(prisma);
