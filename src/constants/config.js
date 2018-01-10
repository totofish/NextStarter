// Fetch Error
export const FetchException     = 'Failed Fetch'
// Processing
export const PROCESS_GLOBAL     = 'global'
export const PROCESS_ALL        = 'all'
// NODE_ENV
export const DEVELOPMENT        = 'development'
export const PRODUCTION         = 'production'
// router basename
export const BASE_PAGE_BASENAME = '/base'

const config = {
  FetchException,
  PROCESS_GLOBAL, PROCESS_ALL,
  DEVELOPMENT, PRODUCTION,
  BASE_PAGE_BASENAME,
  mode   : PRODUCTION,
  IP_API : 'http://api.ipify.org',
  UTC_API: 'http://www.timeapi.org/utc/now.json'
}

if (process.env.NODE_ENV === DEVELOPMENT) {
  config.mode   = DEVELOPMENT
  config.IP_API = 'https://api.ipify.org'
}

export default config;
