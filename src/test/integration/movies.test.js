process.env.MONGO_URI = 'mongodb://localhost:27017/test'
import request from "supertest";
import app from './../../server.js'

import getDB from './../../infrastructure/database.js'

import { saveMovie } from './../tech_support/movie.js'


describe('Movie', () =>   {
  beforeAll(async () => {
    const db = await getDB()
    db.collection('movies').drop()
  })
  afterAll(async () => {
    const db = await getDB()
    db.collection('movies').drop()
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


  test('can save new movie: ', async () => {
    const response = await createNewMovie()
    expectCreateMovie(response, 'createMovie')
  })

  test('can get all movies: ', async () => {
    await createNewMovie()
    await createNewMovie()
    await createNewMovie()
    await createNewMovie()
    const response = await getAllMovies()
    expectGetAllMovies(response)
  })
})
