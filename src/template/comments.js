import timeFormat from '../util/time'

class Comments {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.comments = { edges: [], totalCount: 0, pageInfo: {} }
    this.number = null
  }

  comment(data) {
    const { bodyHTML, updatedAt } = data.node
    const { url, login, avatarUrl } = data.node.author || {
      url: 'https://github.com/ghost',
      login: 'ghost',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10137?v=3'
    }

    return `
      <li>
        <a href="${url}" class="author">
          <img src="${avatarUrl}" alt="${login}" />
        </a>
        <div class="comment-body">
          <a target="_blank" href="${url}">${login}</a>
          <span>on ${timeFormat(updatedAt)}</span>
          <div class="markdown-body">${bodyHTML}</div>
        </div>
      </li>
    `
  }

  _(issue) {
    const {
      comments: { edges, totalCount, pageInfo },
      number
    } = issue

    this.comments.pageInfo = pageInfo
    if (!this.comments.edges.length) {
      this.comments.edges = edges
      this.comments.totalCount = totalCount
      this.number = number
    } else {
      this.comments.edges = this.comments.edges.concat(edges)
    }

    this._render()
  }

  get next() {
    const {
      comments: {
        edges,
        pageInfo: { endCursor, hasNextPage },
        totalCount
      },
      number
    } = this

    if (!hasNextPage) {
      return ''
    }

    return `
      <button
        value="${number}#${endCursor}"
        onclick="window.Mirror.getComments(this.value)"
      >${edges.length} / ${totalCount}
      </button>
    `
  }

  _render() {
    const { edges } = this.comments

    this.container.innerHTML = `
      <ul class="comment-list">
        ${edges.map(comment => this.comment(comment)).join('')}
      </ul>
      ${this.next}
    `
  }
}

export default Comments