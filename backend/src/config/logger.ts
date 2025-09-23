import { createLogger, format, transports } from 'winston';
import { env } from './env';

const { combine, timestamp, errors, splat, colorize, printf } = format;

const logFormat = printf(({ level, message, timestamp: ts, stack, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${ts} [${level}] ${stack ?? message}${metaString}`;
});

export const logger = createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    env.NODE_ENV === 'development' ? colorize() : format.uncolorize(),
    logFormat,
  ),
  transports: [new transports.Console()],
});
