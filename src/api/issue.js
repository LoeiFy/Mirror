import Fetcher from './fetcher'

const { user, repository } = window.config

class Issue extends Fetcher {
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

  get(number) {
    return this.fetch(this.query(number))
  }
}

export default Issue