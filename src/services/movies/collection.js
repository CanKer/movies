import getDB from './../../infrastructure/database.js'


export default class Collection {
  static async getMovies()  {
    const db = await getDB()
    return db.collection('movies')
            .find()
            .toArray()
            .then(result => result)
            .catch( error => {throw error})
  }

  static async saveMovie(movie) {
    const db = await getDB()
    return db.collection('movies')
      .insertOne({...movie})
      .then(({insertedId}) => insertedId)
      .catch(error => {throw error})
  }

}
