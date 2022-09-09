import expressSession from 'express-session'

export default expressSession({
  name: 'next-site.sid',
  secret: process.env.SESSION_SECRET_KEY!,
  // store
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  },
})
