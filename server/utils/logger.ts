import winston from 'winston'
import 'winston-daily-rotate-file'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
}

winston.addColors(colors)

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `[${info.timestamp as string}] ${info.level}: ${info.message as string}`,
  ),
)

const maxFiles = '7d'

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles,
    level: 'error',
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/all-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles,
  }),
]

const logger = winston.createLogger({
  exitOnError: false,
  level: level(),
  levels,
  format,
  transports,
})

export default logger
