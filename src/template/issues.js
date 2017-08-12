import timeFormat from './time'
import titleFormat from './title'
import filter from './filter'
import footer from './footer'
import { $, creator } from '../util'

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

    return creator('a', {
      className: 'post',
      href: `#/posts/${number}`,
      innerHTML: `
        <h2>${titleFormat(title)}</h2>
        <div>${labels}</div>
        <p>${timeFormat(updatedAt)}</p>
      `
    })
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

    return creator('button', {
      className: 'button',
      onclick: () => {
        this.mirror.getPosts(endCursor)
      },
      innerHTML: `More Posts (${totalCount - edges.length} / ${totalCount})`
    })
  }

  render(issues) {
    issues.edges = filter(issues.edges)
    this.issues = issues

    const { edges } = issues
    const frag = $(document.createDocumentFragment())

    edges.forEach((issue) => {
      frag.append(this.post(issue.node))
    })
    frag.append(this.pagination).append(footer)

    this.container.html('').append(frag.dom[0])
  }
}

export default Issues