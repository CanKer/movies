import MovieService from '../../services/movies/service.js';

export default class GetMovies {
  static async invoke () {
    return await MovieService.getMovies()
  }
}
