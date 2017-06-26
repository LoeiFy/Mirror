import Request from './request'

const { user, repository } = window.config

class Issue extends Request {
  constructor() {
    super()
    this.user = user
    this.repository = repository
  }

  query(number) {
    return `{
      repository(owner: "${this.user}", name: "${this.repository}") {
        issue(number: ${number}) {
          title
          author {
            avatarUrl
            login
            url
          }
          bodyHTML
          updatedAt
          labels(first: 3) {
            edges {
              node {
                color
                name
              }
            }
          }
          number
          comments {
            totalCount
          }
        }
      }
    }`
  }

  _(number) {
    return this.fetch(this.query(number))
  }
}

export default Issue