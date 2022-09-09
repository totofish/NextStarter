import type { ErrorRequestHandler } from 'express'
import logger from '../utils/logger'

interface Error {
  statusCode?: number;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  const contentType = req.get('content-type')
  const accepts = req.accepts()
  const statusCode = err.statusCode as number || 500
  const { message } = err
  if (contentType === 'application/json' || accepts[0] === 'application/json') {
    res.status(statusCode).json({
      success: false,
      message,
    })
  } else {
    res.status(statusCode).render('error', {
      statusCode,
      message,
    })
  }
  logger.error(JSON.stringify({
    error: statusCode,
    message,
    method: req.method,
    params: req.params,
    body: req.body as unknown,
    cookie: req.cookies as unknown,
    browser: req.headers['user-agent'],
    originalUrl: req.originalUrl,
    referer: req.headers.referer,
    language: req.headers['accept-language'],
    'x-forwarded-for': req.headers['x-forwarded-for'],
    errStack: err instanceof Error ? err.stack : err,
  }))
}

export default errorHandler
