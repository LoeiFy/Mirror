import axios from 'axios'

const { token } = window.config

class Request {
  constructor() {
    this.host = 'https://api.github.com/graphql'
    this.token = token.split('#').join('')
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

    return axios(config)
    .then(({ data }) => {
      if (data.errors) {
        throw new Error(data.errors.map(e => `[${e.type}]${e.message}`).join('\n'))
      }

      return data.data
    })
  }
}

export default Request