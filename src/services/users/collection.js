import getDB from './../../infrastructure/database.js'
import { ServerError } from './../../infrastructure/error.js'

export default class Collection {
  static async getUser (userId) {
    const db = await getDB()
    const searchCriteria = (userId)
      ? { userId }
      : {}
    return db.collection('users')
      .find(searchCriteria)
      .toArray()
      .then(result => result)
      .catch(error => error)
  }

  static async setUsers () {
    const db = await getDB()
    await db.dropCollection('movies', (err, delOK) => {
      if (err) console.log('Movies collection are empty')
      if (delOK) console.log('initialized')
    })
    await db.dropCollection('users', (err, delOK) => {
      if (err) console.log('Users collection are empty')
      if (delOK) console.log('initialized')
    })
    const users = [
      {
        id: 123,
        role: 'basic',
        name: 'Basic Thomas',
        username: 'basic-thomas',
        password: 'sR-_pcoow-27-6PAwCD8'
      },
      {
        id: 434,
        role: 'premium',
        name: 'Premium Jim',
        username: 'premium-jim',
        password: 'GBLtTyq3E_UNjFnpo9m6'
      }
    ]
    return await db.collection.insertMany(users, { ordered: true })
  }

  static async updateAddMovie (user) {
    const db = await getDB()
    const { userId } = user
    return db.collection('users')
      .findOneAndUpdate({ userId }, { $set: { ...user, lastModified: Number(Date.now()) } })
      .then(({ value, lastErrorObject: { updatedExisting = false } }) => {
        if (updatedExisting) { return value } else { throw new ServerError('System Error') }
      })
      .catch(error => {
        return error
      })
  }

  static async updateChangesLeft (user, changesLeft) {
    const db = await getDB()
    const { userId } = user
    return db.collection('users')
      .findOneAndUpdate({ userId }, { $set: { ...user, changesLeft } })
      .then(({ value, lastErrorObject: { updatedExisting = false } }) => {
        if (updatedExisting) { return value } else { throw new ServerError('System Error') }
      })
      .catch(error => {
        return error
      })
  }
}
