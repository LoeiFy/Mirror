import Request from './request'

class Comments extends Request {
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
          comments(first: 10) {
            totalCount
            edges {
              node {
                updatedAt
                bodyHTML
                author {
                  avatarUrl
                  login
                  url
                }
              }
            }
          }
        }
      }
    }`
  }

  _(number) {
    return this.fetch(this.schema(number))
  }
}

export default Comments