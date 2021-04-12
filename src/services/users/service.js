import User from './../../domain/User.js'
import UserCollection from './collection.js'


export default class Service {

  static async getUser(userId) {
    const user = await UserCollection.get(id)
    const userObj = new Status(user).serialize()
    return userObj
  }

  static async updateAddMovie(userId) {
    try{
      await UserCollection.updateAddMovie(user)
      return await Service.getUser(userId)
    } catch (error) {
      throw Error(error)
    }
  }

  static async updateChangesLeft(userId) {
    const user = await UserCollection.getUser(userId)
    const changesLeft = ((user.lastModified - 2678400) > 0) ? --user.changesLeft : 5
    try{
      await UserCollection.updateChangesLeft(userId, changesLeft)
      return await Service.getUser(userId)
    } catch (error) {
      throw Error(error)
    }
  }

}
