import express from 'express'
import next from 'next'
import cookieParser from 'cookie-parser'
import helmet from './middlewares/helmet'
import cspViolationReport from './middlewares/csp-violation-report'
import morgan from './middlewares/morgan'
import session from './middlewares/session'
import errorHandler from './middlewares/errorHandler'
import logger from './utils/logger'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

void app.prepare().then(() => {
  const server = express()
  server.set('views', 'server/views')
  server.set('view engine', 'ejs')
  server.set('trust proxy', 1)
  server.use('/', express.static('public', { maxAge: '30d' }))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(cookieParser())
  server.use(helmet)
  server.use(cspViolationReport)
  server.use(morgan)
  server.use(session)
  server.all('*', (req, res) => void handle(req, res))
  server.use(errorHandler)

  server.listen(port, () => {
    logger.info(`> Ready on ${process.env.BASE_URL!}`)
  })

  logger.info(
    `> Server listening at ${process.env.BASE_URL!} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  )
})
