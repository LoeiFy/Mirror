
const host = 'https://api.github.com'

export const ISSUES = (user, repo) => `${host}/repos/${user}/${repo}/issues`

export const ISSUE = (user, repo, id) => `${host}/repos/${user}/${repo}/issues/${id}`

export const USER = (user) => `${host}/users/${user}`

export const COMMENTS = (user, repo, id) => `${ISSUE(user, repo, id)}/comments`

const api = 'https://api.github.com/graphql'

const schema = {
  user: `{
    user(login: "LoeiFy") {
      name
      avatarUrl
      email
      websiteUrl
      url
      bio
      login
    }
  }`,
  issues: `{
    repository(owner: "LoeiFy", name: "Recordum") {
      issues(first: 3, states: OPEN, after: "Y3Vyc29yOnYyOpLOB48Tds4HjxN2", orderBy: {field: CREATED_AT, direction: ASC}) {
        pageInfo {
          hasNextPage
          hasPreviousPage
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
  }`,
  issue: `{
    repository(owner: "LoeiFy", name: "Recordum") {
      issue(number: 18) {
        title
        author {
          avatarUrl
          login
          url
        }
        bodyHTML
        createdAt
        updatedAt
        id
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
  }`,
  comments: `{
    repository(owner: "LoeiFy", name: "Recordum") {
      issue(number: 11) {
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
  }`,
}
