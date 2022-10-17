import expressSession from 'express-session'

export default expressSession({
  name: 'next-site.sid',
  secret: process.env.SESSION_SECRET_KEY!,
  /* Defaults to a new MemoryStore instance.
     MemoryStore is purposely not designed for a production environment.
     It will leak memory under most conditions, does not scale past a single process,
     and is meant for debugging and developing. */
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
