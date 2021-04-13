import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://omdbapi.com/'
})

export default instance
