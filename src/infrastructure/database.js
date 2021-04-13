import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

let _db = null

const connection = () => {
  return MongoClient
          .connect(process.env.MONGO_URI, { useNewUrlParser: true })
          .then(client => {
            console.log("connected to DB")
            _db = client.db()
            return _db
          })
          .catch(error => {
            console.error("error: ", error)
            throw Error(error)})
}

const getDB = () => {
  if (_db) {
    return _db
  } else {
    return connection()
  }
}

export default getDB
