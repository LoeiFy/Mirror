import axios from 'axios'
import Loader from '../loader/'

const { token } = window.config

class Request {
  constructor() {
    this.host = 'https://api.github.com/graphql'
    this.token = token.split('#').join('')
    this.loader = new Loader()
  }

  fetch(query) {
    const config = {
      url: this.host,
      method: 'post',
      headers: {
        Authorization: `bearer ${this.token}`
      },
      data: { query }
    }

    this.loader.loading()

    return axios(config)
    .then(({ data }) => {
      this.loader.loaded()

      if (data.errors) {
        throw new Error(data.errors.map(e => `[${e.type}]${e.message}`).join('\n'))
      }

      return data.data
    })
  }
}

export default Request