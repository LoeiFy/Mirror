import timeFormat from './time'
import filter from './filter'
import footer from './footer'
import creator from '../helper/creator'
import $ from '../helper/query'

function post(issue) {
  const {
    number,
    title,
    createdAt,
  } = issue
  const labels = issue.labels.edges
    .map(label => `<span>#${label.node.name}</span>`)
    .join('')

  return creator('a', {
    className: 'post',
    href: `#/posts/${number}`,
    innerHTML: `
      <h2>${title}</h2>
      <div>${labels}</div>
      <p>${timeFormat(createdAt)}</p>
    `,
  })
}

function base64(s) {
  return window.btoa(s).split('=')[0]
}

class Issues {
  constructor(selector, mirror) {
    this.mirror = mirror
    this.container = $(selector)
    this.issues = null
  }

  get pagination() {
    const {
      endCursor,
      hasNextPage,
      hasPreviousPage,
      startCursor,
    } = this.issues.pageInfo
    const paginator = []

    if (hasPreviousPage) {
      paginator.push(creator('a', {
        className: 'button',
        href: `#/before/${base64(startCursor)}`,
        innerHTML: 'Previous',
      }))
    }

    if (hasNextPage) {
      paginator.push(creator('a', {
        className: 'button',
        href: `#/after/${base64(endCursor)}`,
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

    const { edges } = this.issues
    const frag = $(document.createDocumentFragment())

    edges.forEach(issue => frag.append(post(issue.node)))
    this.pagination.forEach(page => frag.append(page))
    frag.append(footer)

    this.container.html('').append(frag.dom[0])
  }
}

export default Issues
