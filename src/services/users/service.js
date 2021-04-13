import User from './../../domain/User.js'
import UserCollection from './collection.js'
import { NotFound, ServerError } from './../../infrastructure/error.js'

export default class Service {
  static async getUser (userId) {
    try {
      const user = await UserCollection.getUser(userId)
      const userObj = new User(user).serialize()
      return userObj
    } catch (error) {
      throw new NotFound('User not Found')
    }
  }

  static async updateAddMovie (userId) {
    try {
      const user = await Service.getUser(userId)
      await UserCollection.updateAddMovie(user)
      return
    } catch ({ message }) {
      throw new ServerError(message)
    }
  }

  static async updateChangesLeft (userId) {
    const user = await UserCollection.getUser(userId)
    const changesLeft = ((user.lastModified - 2678400) > 0) ? --user.changesLeft : 5
    try {
      await UserCollection.updateChangesLeft(userId, changesLeft)
      return await Service.getUser(userId)
    } catch ({ message }) {
      throw new ServerError(message)
    }
  }
}
