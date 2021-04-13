import { AuthError } from './../infrastructure/error.js'
import { authVerify, userVerify } from './../auth.js'

const auth = async (req, res, next) => {
  if (!req.headers.authorization) throw new AuthError('Invalid Session')
  const { authorization } = req.headers

  const user = await authVerify(authorization)
  if (!userVerify(user)) {
    throw new AuthError('Invalid Session')
  }
  req.user = user
  next()
}

export default auth
