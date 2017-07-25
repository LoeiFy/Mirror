import Fetcher from './fetcher'

const { user, organization } = window.config

class User extends Fetcher {
  constructor() {
    super()
    this.user = user
  }

  get query() {
    if (organization) {
      return `{
        organization(login: "${this.user}") {
          name
          login
          avatarUrl
          organizationBillingEmail
          url
        }
      }`
    }

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

  get() {
    return this.fetch(this.query)
  }
}

export default User