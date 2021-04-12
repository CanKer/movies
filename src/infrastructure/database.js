import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

let _db = null

const connection = () => {
  return MongoClient
          .connect(process.env.MONGO_URI, { useNewUrlParser: true })
          .then(client => {
            _db = client.db()
            return _db
          })
          .catch(error => {throw Error(error)})
}

const getDB = () => {
  if (_db) {
    return _db
  } else {
    return connection()
  }
}

export default getDB
