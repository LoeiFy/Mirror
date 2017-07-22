import timeFormat from './time'
import titleFormat from './title'
import filter from './filter'
import footer from './footer'
import { $ } from '../util'

class Issues {
  constructor(selector, mirror) {
    this.mirror = mirror
    this.container = $(selector)
    this.issues = null
  }

  post(issue) {
    const { number, title, updatedAt } = issue
    const labels = issue.labels.edges
    .map(label => `<span>#${label.node.name}</span>`)
    .join('')

    return `
      <div class="post" onclick="location.hash='/posts/${number}'">
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

    if (!hasNextPage) {
      return null
    }

    const button = document.createElement('button')

    button.className = 'button'
    button.onclick = () => {
      this.mirror.getPosts(endCursor)
    }
    button.innerHTML = `More Posts (${totalCount - edges.length} / ${totalCount})`

    return button

    // if (hasNextPage) {
    //   return `
    //     <button class="button" value="${endCursor}" onclick="window.Mirror.getPosts(this.value)">
    //       More Posts (${totalCount - edges.length} / ${totalCount})
    //     </button>
    //   `
    // }

    // return ''
  }

  render(issues) {
    issues.edges = filter(issues.edges)
    this.issues = issues

    const { edges } = issues

    this.container.html(edges
    .map(issue => this.post(issue.node))
    .join(''))

    if (this.pagination) {
      this.container.dom[0].appendChild(this.pagination)
    }

    // this.container.html(edges
    // .map(issue => this.post(issue.node))
    // .join('') + this.pagination + footer)
  }
}

export default Issues