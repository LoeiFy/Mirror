import axios from 'axios'

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
      data: query
    }
    return axios(config)
  }
}

export default Request