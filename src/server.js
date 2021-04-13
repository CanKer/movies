import express from 'express'
import bodyParser from 'body-parser'
import { authFactory, AuthError } from './auth.js'
import movieRoutes from './routes/movies.js'
const router = express.Router()

const PORT = 3000
const { JWT_SECRET, MONGO_URI } = process.env
console.log('JWT_SECRET: ', process.env.JWT_SECRET, 'MONGO_URI: ', MONGO_URI)
if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server')
}

const auth = authFactory(JWT_SECRET)
const app = express()

app.use(bodyParser.json())
app.use('/movies', movieRoutes(router))

app.post('/auth', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: 'invalid payload' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'invalid payload' })
  }

  try {
    const token = auth(username, password)

    return res.status(200).json({ token })
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message })
    }

    next(error)
  }
})

app.use((error, _, res, __) => {
  const status = error.statusCode || 500
  const errorResponse = prepareErrorResponse(error)
  console.error(`Error processing request ${error}. See next message for details`)
  console.error(error)
  res.status(status).json(errorResponse)
})

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`)
})

const prepareErrorResponse = (err) => {
  const { code, type, message } = err
  return { code, type, message }
}

export default app
