import Fetcher from './fetcher'

const { user, repository, perpage, order } = window.config

class Issues extends Fetcher {
  constructor() {
    super()
    this.user = user
    this.repository = repository
    this.perpage = perpage
    this.labelsNum = 3
    this.order = order === 'CREATED_AT' || order === 'UPDATED_AT' ? order : 'UPDATED_AT'
  }

  query(after) {
    let variables = `first: ${this.perpage}, states: OPEN, orderBy: {field: ${this.order}, direction: DESC}`

    if (after) {
      variables += `, after: "${after}"`
    }

    return `{
      repository(owner: "${this.user}", name: "${this.repository}") {
        issues(${variables}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
          edges {
            node {
              number
              title
              author {
                avatarUrl
                login
                url
              }
              updatedAt
              labels(first: ${this.labelsNum}) {
                edges {
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`
  }

  get(after) {
    return this.fetch(this.query(after))
  }
}

export default Issues