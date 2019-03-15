import axios from 'axios' // eslint-disable-line import/no-unresolved
import loadError from './error'
import $ from '../helper/query'

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
        Authorization: `bearer ${this.token}`,
      },
      data: { query },
    }

    $('html').addClass('loading')

    return new Promise((resolve) => {
      axios(config)
        .then(({ data }) => {
          $('html').removeClass('loading')
          if (data.errors) {
            throw new Error(data.errors.map(e => `[${e.type}]${e.message}`).join('\n'))
          }
          resolve(data.data)
        })
        .catch((err) => {
          $('html').removeClass('loading')
          loadError(err)
        })
    })
  }
}

export default Request
