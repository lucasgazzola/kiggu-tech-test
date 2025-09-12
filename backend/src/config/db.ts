import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

export const dbClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // logs útiles en dev
})

// Manejo de señales para cerrar la conexión cleanly
process.on('beforeExit', async () => {
  logger.info('🔌 Disconnecting Prisma...')
  await dbClient.$disconnect()
})
