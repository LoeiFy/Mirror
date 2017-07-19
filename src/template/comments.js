import timeFormat from './time'
import footer from './footer'
import { $ } from '../util' 

const { user, repository } = window.config

class Comments {
  constructor(selector) {
    this.container = $(selector)
    this.comments = null
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
        <a class="button" href="https://github.com/${user}/${repository}/issues/${number}#new_comment_field" target="_blank">Add Comments</a>
      `
    }

    return `
      <button
        class="button"
        value="${number}#${endCursor}"
        onclick="window.Mirror.getComments(this.value)"
      >Load More (${totalCount - edges.length} / ${totalCount})
      </button>
    `
  }

  render(issue) {
    const { comments, number } = issue
    const { edges } = comments

    this.comments = comments
    this.number = number

    this.container.html(`
      <ul class="comment-list">
        ${edges.map(comment => this.comment(comment)).join('')}
      </ul>
      ${this.next}
      ${footer}
    `)
  }
}

export default Comments