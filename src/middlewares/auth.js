import { AuthError } from './../infrastructure/error.js'
import { authVerify, userVerify } from './../auth.js'

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    const user = await authVerify(authorization)
    if (!userVerify(user)) {
      next(new AuthError('Invalid Session'))
    }
    req.user = user
    next()
  } catch (e) {
    next(new AuthError('Invalid Session'))
  }
}

export default auth
