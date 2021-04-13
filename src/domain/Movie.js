export default class Movie {
  constructor (data) {
    const { _id, Title, Released, Genre, Director } = data
    if (_id) this._id = _id
    this.title = Title
    this.released = Released
    this.genre = Genre
    this.director = Director
  }

  serialize (id) {
    const movie = {
      title: this.title,
      released: this.released,
      genre: this.genre,
      director: this.director
    }
    return (this._id) ? { ...movie, _id: this._id } : movie
  }

  setID (id) {
    this._id = id
    return this
  }
}
