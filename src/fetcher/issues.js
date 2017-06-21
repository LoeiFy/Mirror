import Request from './request'

class Issues extends Request {
  constructor(config) {
    const { user, repository, perpage, token } = config
    super(token)
    this.user = user
    this.repository = repository
    this.perpage = perpage
  }

  schema(after) {
    after = after ? `after: "${after}"` : ''
    return `{
      repository(owner: "${this.user}", name: "${this.repository}") {
        issues(first: ${this.perpage}, states: OPEN, ${after}, orderBy: {field: CREATED_AT, direction: ASC}) {
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
              labels(first: 1) {
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

  _(after) {
    return this.fetch(this.schema(after))
  }
}

export default Issues