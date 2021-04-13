import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

let _db = null

const connection = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    _db = client.db()
    return _db
  } catch (error) {
    console.error('error: ', error)
    throw Error(error)
  }
}

const getDB = async () => {
  if (_db) {
    return _db
  } else {
    return await connection()
  }
}

export default getDB
