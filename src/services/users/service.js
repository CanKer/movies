import User from './../../domain/User.js'
import UserCollection from './collection.js'
import { NotFound, ServerError } from './../../infrastructure/error.js'

export default class Service {
  static async getUser (userId) {
    let user
    try {
      user = await UserCollection.getUser(userId)
      if (user.length > 0) {
        const userObj = new User(user).serialize()
        return userObj
      } else throw new NotFound('Invalid User')
    } catch (e) {
      throw new NotFound('Invalid User')
    }
  }

  static async updateAddMovie (userId) {
    const user = await Service.getUser(userId)
    try {
      await UserCollection.updateAddMovie(user)
      return user
    } catch (error) {
      throw new ServerError(error.message)
    }
  }

  static async updateChangesLeft (user) {
    let { userId, lastModified, changesLeft } = user
    changesLeft = ((lastModified - 2678400) > 0) ? --changesLeft : 5
    try {
      await UserCollection.updateChangesLeft(userId, changesLeft)
      return await Service.getUser(userId)
    } catch ({ message }) {
      throw new ServerError(message)
    }
  }
}
