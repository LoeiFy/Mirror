import Request from './request'

class User extends Request {
  constructor(config) {
    const { user, token } = config
    super(token)
    this.user = user
  }

  get schema() {
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
    return this.fetch(this.schema)
  }
}

export default User