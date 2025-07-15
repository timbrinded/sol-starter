import pino from 'pino'
import pinoPretty from 'pino-pretty'

const logLevel = process.env.LOG_LEVEL || 'info'

const stream = pinoPretty({
  colorize: true,
  destination: 2,
  sync: true,
})

// Custom logger type with success method
interface CustomLogger extends pino.Logger {
  success(msg: string, ...args: unknown[]): void
}

// Create the base logger with proper configuration
export const logger: CustomLogger = pino(
  {
    level: logLevel,
  },
  stream,
) as CustomLogger

// Add custom success method to the logger
logger.success = function (message: string) {
  this.info(`✅ ${message}`)
}
