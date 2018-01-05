import timeFormat from './time'
import titleFormat from './title'
import filter from './filter'
import footer from './footer'
import { $, creator } from '../util'

function post(issue) {
  const {
    number,
    title,
    updatedAt,
  } = issue
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
    `,
  })
}

class Issues {
  constructor(selector, mirror) {
    this.mirror = mirror
    this.container = $(selector)
    this.issues = null
  }

  get pagination() {
    const {
      edges,
      pageInfo: {
        endCursor,
        hasNextPage,
        hasPreviousPage,
        startCursor,
      },
      totalCount,
    } = this.issues
    const paginator = []

    if (hasPreviousPage) {
      paginator.push(creator('a', {
        className: 'button',
        href: `#/before/${startCursor}`,
        innerHTML: 'Previous',
      }))
    }

    if (hasNextPage) {
      paginator.push(creator('a', {
        className: 'button',
        href: `#/after/${endCursor}`,
        innerHTML: 'Next',
      }))
    }

    return paginator
  }

  render(issues) {
    this.issues = {
      ...issues,
      edges: filter(issues.edges),
    }

    const { edges } = issues
    const frag = $(document.createDocumentFragment())

    edges.forEach(issue => frag.append(post(issue.node)))
    this.pagination.forEach(page => frag.append(page))
    frag.append(footer)

    this.container.html('').append(frag.dom[0])
  }
}

export default Issues
