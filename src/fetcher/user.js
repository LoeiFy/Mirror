import Request from './request'

const { user } = window.config

class User extends Request {
  constructor() {
    super()
    this.user = user
  }

  get query() {
    return `{
      user(login: "${this.user}") {
        name
        avatarUrl
        email
        websiteUrl
        url
        bio
        login
      }
    }`
  }

  _() {
    return this.fetch(this.query)
  }
}

export default User