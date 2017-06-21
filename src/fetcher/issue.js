import Request from './request'

class Issue extends Request {
  constructor(config) {
    const { user, repository, token } = config
    super(token)
    this.user = user
    this.repository = repository
  }

  schema(number) {
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
    return this.fetch(this.schema(number))
  }
}

export default Issue