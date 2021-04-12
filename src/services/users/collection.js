import getDB from './../../infrastructure/database.js'


export default class Collection {
  static async getUser(userId)  {
    const db = await getDB()
    return db.collection('users')
            .find({userId})
            .then(result => result)
            .catch( error => {throw error})
  }

  static async updateAddMovie(user) {
    const db = await getDB()
    const { userId } = user
    return db.collection('users')
      .findOneAndUpdate({userId}, { $set: { ...user, lastModified: Number(Date.now()) } })
      .then(({ value, lastErrorObject: { updatedExisting = false } }) => {
        if (updatedExisting) { return value } else { throw new Error('Not found') }
      })
      .catch(error => { throw error })
  }

  static async updateChangesLeft(user, changesLeft) {
    const db = await getDB()
    const { userId } = user
    return db.collection('users')
      .findOneAndUpdate({userId}, { $set: { ...user, changesLeft } })
      .then(({ value, lastErrorObject: { updatedExisting = false } }) => {
        if (updatedExisting) { return value } else { throw new Error('Not found') }
      })
      .catch(error => { throw error })
  }

}
