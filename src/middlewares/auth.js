import { AuthError, authVerify, userVerify } from './../auth.js'

const auth = async (req, res, next) => {
  if (!req.headers.authorization) throw AuthError
  const { authorization } = req.headers

  const user = await authVerify(authorization)
  if (!userVerify(user)) {
    throw AuthError
  }
  req.user = user
  next()
}

export default auth
