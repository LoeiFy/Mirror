import Fetcher from './fetcher'

const { user, repository } = window.config

class Comments extends Fetcher {
  constructor() {
    super()
    this.user = user
    this.repository = repository
    this.perpage = 10
  }

  query(number, after) {
    let variables = `first: ${this.perpage}`

    if (after) {
      variables += `after: "${after}"`
    }

    return `{
      repository(owner: "${this.user}", name: "${this.repository}") {
        issue(number: ${number}) {
          number
          comments(${variables}) {
            pageInfo {
              hasNextPage
              endCursor
            }
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

  get(number, after) {
    return this.fetch(this.query(number, after))
  }
}

export default Comments