import { AuthError, authVerify, userVerify } from './../auth.js'
import UserService from './../services/users/service'

const auth = async (req, res, next) => {
  if(!req.headers.authorization) throw new AuthError
  const { authorization } = req.headers

  const user = await authVerify(authorization)
  if (!userVerify(user)) {
    throw AuthError
  }
  req.user = user
  next()
}

export default auth
