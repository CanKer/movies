import MovieService from '../../services/movies/service.js'
import UserService from '../../services/users/service.js'

import { ValidationError } from './../../infrastructure/error.js'

export default class PostMovies {
  static async invoke (request, user) {
    const validateCreate = MovieService.validateCreate(user)
    if (validateCreate) {
      const { userId } = await UserService.updateAddMovie(user)
      await UserService.updateChangesLeft(userId)
      const { title } = request
      const movie = await MovieService.fetchMovie(title)
      const response = await MovieService.saveMovie(movie)
      return response
    } else throw new ValidationError('EXCEEDED QUOTA', 400, 'User cannot add more movies by the moment')
  }
}
