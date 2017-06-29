import timeFormat from '../util/time'
import titleFormat from '../util/title'

function stringFormat(s) {
  return s.toString().toLowerCase().trim()
}

const { authors, user } = window.config

class Issues {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.issues = { edges: [], pageInfo: {}, totalCount: 0 }
  }

  get authors() {
    const trimAuthors = (authors || []).map(author => stringFormat(author))
    const trimUser = stringFormat(user)

    if (trimAuthors.indexOf(trimUser) === -1) {
      trimAuthors.push(trimUser)
    }

    return trimAuthors
  }

  get posts() {
    return this.issues.edges
  }

  _(issues) {
    const { edges, totalCount, pageInfo } = issues

    this.issues.pageInfo = pageInfo
    if (!this.issues.edges.length) {
      this.issues.edges = this.filterPosts(edges)
      this.issues.totalCount = totalCount
    } else {
      this.issues.edges = this.issues.edges.concat(this.filterPosts(edges))
    }

    this.render()
  }

  filterPosts(issues) {
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
      <a href="#/posts/${number}">
        <h2>${titleFormat(title)}</h2>
        <div>${labels}</div>
        <p>${timeFormat(updatedAt)}</p>
      </a>
    `
  }

  get pagination() {
    const {
      edges,
      pageInfo: { endCursor, hasNextPage },
      totalCount
    } = this.issues

    if (hasNextPage) {
      return `
        <button value="${endCursor}" onclick="window.trigger.getPosts(this.value)">
          ${edges.length} / ${totalCount}
        </button>
      `
    }

    return ''
  }

  render() {
    const { edges } = this.issues

    this.container.innerHTML = edges
    .map(issue => this.post(issue.node))
    .join('') + this.pagination
  }
}

export default Issues