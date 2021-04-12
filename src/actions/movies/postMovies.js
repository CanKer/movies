import MovieService from '../../services/movies/service.js';
import UserService from '../../services/users/service.js';

export default class PostMovies {
  static async invoke (request, user) {
    const validateCreate = MovieService.validateCreate(user)
    if(validateCreate) {
      const { title } = request
      const movie = await MovieService.fetchMovie(title)
      const response = await MovieService.saveMovie(movie)
      UserService.updateAddMovie(user.userId)
      UserService.updateChangesLeft(user.userId)
      return response
    } else throw new Error('User cannot add more movies by the moment')
  }
}
