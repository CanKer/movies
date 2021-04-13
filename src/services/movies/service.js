import Movie from './../../domain/Movie.js'
import MovieCollection from './collection.js'
import AxiosInstance from './../../infrastructure/axios.js'

export default class Service {
  static async validateCreate (user) {
    const { role, lastModified, changesLeft } = user
    if (role === 'premium') return true
    // considering one month is 31 days...
    // Ideally is to get total days of actual month and convert in epochtime
    // to check if Date.now() minus total epoch for 31 days is greater than lastModified
    // plus total changesLeft
    if (Date.now() - 2678400 > lastModified && changesLeft > 0) return true
    else return false
  }

  static async getMovies () {
    const movies = await MovieCollection.getMovies()
    return movies.map(movie => Service.getMovie(movie))
  }

  static getMovie (movieData) {
    const movie = new Movie(movieData)
    return movie.serialize()
  }

  static async fetchMovie (title) {
    try {
      const { data } = await AxiosInstance.get(`?t=${title}&apikey=${process.env.OMDb_API_KEY}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  static async saveMovie (rawMovie) {
    const objMovie = new Movie(rawMovie)
    const movieID = await MovieCollection.saveMovie(objMovie)
    return objMovie.setID(movieID).serialize()
  }
}
