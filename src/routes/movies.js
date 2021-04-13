import GetMovies from './../actions/movies/getMovies.js'
import PostMovies from './../actions/movies/postMovies.js'
import auth from './../middlewares/auth.js'

const routes = (router) => {
  router.route('/').post(auth, async (req, res, next) => {
    try {
      const { body, user } = req
      const response = await PostMovies.invoke(body, user)
      res.status(201).send(response)
    } catch (error) {
      next(error)
    }
  })
  router.route('/').get(async (req, res, next) => {
    try {
      const response = await GetMovies.invoke()
      res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  })
  return router
}

export default routes
