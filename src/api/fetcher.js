import axios from 'axios'

const { token } = window.config

class Request {
  constructor() {
    this.host = 'https://api.github.com/graphql'
    this.token = token.split('#').join('')
    this._processing = false
  }

  fetch(query) {
    if (this._processing) {
      return Promise.reject('processing')
    }

    this._processing = true

    const config = {
      url: this.host,
      method: 'post',
      headers: {
        Authorization: `bearer ${this.token}`
      },
      data: { query }
    }

    return axios(config)
    .then(({ data }) => {
      this._processing = false

      if (!data.data) {
        throw new Error(JSON.stringify(data.errors))
      }

      return data.data
    })
  }
}

export default Request