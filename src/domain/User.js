export default class User {
  constructor (data) {
    const { _id, userId, name, role, username, password, lastModified, changesLeft } = data

    if (_id) this._id = _id
    this.userId = userId
    this.name = name
    this.role = role
    this.username = username
    this.password = password
    this.lastModified = lastModified
    this.changesLeft = changesLeft
  }

  serialize (id) {
    const user = {
      userId: this.userId,
      name: this.name,
      role: this.role,
      username: this.username,
      password: this.password,
      lastModified: this.lastModified,
      changesLeft: this.changesLeft
    }
    return (this._id) ? { ...user, _id: this._id } : user
  }

  setID (id) {
    this._id = id
    return this
  }
}
