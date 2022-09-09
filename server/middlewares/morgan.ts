import morgan, { StreamOptions } from 'morgan'
import logger from '../utils/logger'

const stream: StreamOptions = {
  write: (message) => logger.http(message.replace(/\n$/, '')),
}

export default morgan('tiny', {
  stream,
})
