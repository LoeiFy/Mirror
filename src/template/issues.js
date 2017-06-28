import timeFormat from '../util/time'

function titleFormat(title) {
  return title.split(/\[.*?\]/g).join('')
}

function stringFormat(s) {
  return s.toString().toLowerCase().trim()
}

const { authors, user } = window.config

class Posts {
  constructor(selector) {
    this.container = document.querySelector(selector)
  }

  get authors() {
    const trimAuthors = (authors || []).map(author => stringFormat(author))
    const trimUser = stringFormat(user)

    if (trimAuthors.indexOf(trimUser) === -1) {
      trimAuthors.push(trimUser)
    }

    return trimAuthors
  }

  posts(issues) {
    return issues.filter((issue) => {
      const author = stringFormat(issue.node.author.login)
      return this.authors.indexOf(author) > -1
    })
  }

  post(issue) {
    const { number, title, updatedAt } = issue
    const labels = issue.labels.edges
    .map(label => `<span>#${label.node.name}</span>`)
    .join('')

    return `
      <a href="#${number}">
        <h2>${titleFormat(title)}</h2>
        <div>${labels}</div>
        <p>${timeFormat(updatedAt)}</p>
      </a>
    `
  }

  pagination(issues) {
    const {
      pageInfo: { endCursor, hasNextPage },
      totalCount
    } = issues
  }

  render(issues) {
    const { repository: { issues: { edges } } } = issues

    this.container.innerHTML = this.posts(edges)
    .map(issue => this.post(issue.node))
    .join('')
  }
}

export default Posts