import express, { Router } from 'express'
import type { Request, Response } from 'express'

// 接收 content-security-policy 回傳的違規報告 server/middlewares/helmet.ts
const router = Router()
router.use(
  '/csp-violation-report-endpoint',
  express.json({ type: 'application/json' }), // for old browsers
  express.json({ type: 'application/reports+json' }), // for report-to directive
  express.json({ type: 'application/csp-report' }), // for report-uri directive
  (req: Request, res: Response) => {
    const report = {
      'content-type': req.get('content-type'),
      'user-agent': req.get('user-agent'),
      'x-forwarded-for': req.headers['x-forwarded-for'],
      ...req.body,
    } as unknown
    console.log('CSP Violation Report:', report)
    res.status(204).end()
  },
)

export default router
