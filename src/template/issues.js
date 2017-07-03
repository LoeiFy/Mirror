import timeFormat from '../util/time'
import titleFormat from '../util/title'
import filterPosts from '../util/posts'
import footer from './footer'

class Issues {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.issues = {}
  }

  _(issues) {
    issues.edges = filterPosts(issues.edges)
    this.issues = issues
    this._render()
  }

  post(issue) {
    const { number, title, updatedAt } = issue
    const labels = issue.labels.edges
    .map(label => `<span>#${label.node.name}</span>`)
    .join('')

    return `
      <div class="post" onclick="location.hash='#/posts/${number}'">
        <h2>${titleFormat(title)}</h2>
        <div>${labels}</div>
        <p>${timeFormat(updatedAt)}</p>
      </div>
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
        <button class="button" value="${endCursor}" onclick="window.Mirror.getPosts(this.value)">
          More Posts (${totalCount - edges.length} / ${totalCount})
        </button>
      `
    }

    return ''
  }

  _render() {
    const { edges } = this.issues

    this.container.innerHTML = edges
    .map(issue => this.post(issue.node))
    .join('') + this.pagination + footer
  }
}

export default Issues