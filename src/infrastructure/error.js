export class DBError extends Error {
  constructor (builder) {
    console.log('builder', builder)
    const { type, message } = builder
    super(message)
    this.type = type
    this.code = 503
    this.message = message
    Error.captureStackTrace(this)
  }
}

export class AuthError extends Error {
  constructor (builder) {
    const { message } = builder
    super(message)
    this.type = 'Auth Error'
    this.code = 403
    this.message = message
    Error.captureStackTrace(this)
  }
}

export class ValidationError extends Error {
  constructor (builder) {
    const { type, code, message } = builder
    super(message)
    this.type = type
    this.code = code
    this.message = message
    Error.captureStackTrace(this)
  }
}

export class NotFound extends Error {
  constructor (builder) {
    const { message } = builder
    super(message)
    this.type = 'Not Found'
    this.code = 404
    this.message = message
    Error.captureStackTrace(this)
  }
}

export class ServerError extends Error {
  constructor (builder) {
    const { message } = builder
    super(message)
    this.type = 'Server Error'
    this.code = 501
    this.message = message
    Error.captureStackTrace(this)
  }
}
