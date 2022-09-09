import { Router } from 'express'
import type { Request, Response } from 'express'
import helmet from 'helmet'

const router = Router()
router.use(
  (req: Request, res: Response, next) => {
    res.setHeader(
      'Report-To',
      JSON.stringify({
        group: 'csp-endpoint',
        max_age: 10886400,
        endpoints: [{ url: `${process.env.NEXT_PUBLIC_BASE_URL!}/csp-violation-report-endpoint` }],
      }),
    )
    next()
  },
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      reportOnly: false,
      directives: {
        'default-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https:', 'wss:'],
        'font-src': ["'self'", 'https:', 'data:'],
        'img-src': ["'self'", 'https:', 'data:', 'blob:'],
        'media-src': ["'self'", 'https:', 'blob:'],
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
        'report-uri': ['/csp-violation-report-endpoint'],
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to
        'report-to': ['csp-endpoint'],
      },
    },
    referrerPolicy: { policy: 'same-origin' },
    crossOriginEmbedderPolicy: true,
    /*
      Avoiding COEP blockage with CORS
      <img crossorigin src="https://example.com/img.png" />
      <script crossorigin src="https://example.com/script.js"></script>
    */
  }),
)

export default router
