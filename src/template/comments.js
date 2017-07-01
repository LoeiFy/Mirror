import timeFormat from '../util/time'

const { user, repository } = window.config

class Comments {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.comments = {}
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
    const { comments, number } = issue
    this.comments = comments
    this.number = number
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
      return `
        <a href="https://github.com/${user}/${repository}/issues/${number}#new_comment_field" target="_blank">add comments</a>
      `
    }

    return `
      <button
        value="${number}#${endCursor}"
        onclick="window.Mirror.openComments(this.value)"
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