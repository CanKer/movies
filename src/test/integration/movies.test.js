process.env.MONGO_URI = 'mongodb://localhost:27017/test'
import request from "supertest";
import app from './../../server.js'

import getDB from './../../infrastructure/database.js'

import { saveMovie } from './../tech_support/movie.js'


describe('Movie', () =>   {

  beforeAll(async () => {
    const db = await getDB()
    await db.collection('movies').drop()
  })
  afterEach(async () => {
    const db = await getDB()
    await db.collection('movies').drop()
  })

function createNewMovie () {
    return request(app)
      .post(`/movies`)
      .set('Content-Type', 'application/json')
      .send(saveMovie)
  }
function getAllMovies () {
    return request(app)
      .get(`/movies`)
      .set('Content-Type', 'application/json')
  }
  function expectCreateMovie(response) {
    const { statusCode, body: result } = response
    const { title, released, genre, director } = body
    expect(title).toBe("Matrix")
    expect(released).toBe("01 Mar 1993")
    expect(genre).toBe("Action, Drama, Fantasy, Thriller")
    expect(director).toBe("N/A")
    expect(statusCode).toBe()
  }
  function expectGetAllMovies(response) {
    const { statusCode, body: result } = response
    expect(result.length).toBe(5)
    expect(result[0].title).toBe("Matrix")
    expect(result[0].released).toBe("01 Mar 1993")
    expect(result[0].genre).toBe("Action, Drama, Fantasy, Thriller")
    expect(result[0].director).toBe("N/A")
    expect(statusCode).toBe(200)
  }
  function expectToGetError(response) {

  }

  test.only('can\'t save if not auth', async () => {
    const response = await createNewMovie()
    expectToGetError('auth')
  })
  test('can save new movie if you\'re auth: ', async () => {
    const response = await createNewMovie()
    expectCreateMovie(response, 'createMovie')
  })
  test('can\'t save more than 5 movies if basic account', async () => {

  })
  test('can save more than 5 movies if premium account', async () => {

  })
  test('can get all movies: ', async () => {
    await Promise.all([createNewMovie(), createNewMovie(), createNewMovie(), createNewMovie(), createNewMovie()])
    const response = await getAllMovies()
    expectGetAllMovies(response)
  })

})
