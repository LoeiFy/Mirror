import timeFormat from './time'
import footer from './footer'
import { $, creator } from '../util'

const { user, repository } = window.config

class Comments {
  constructor(selector, mirror) {
    this.container = $(selector)
    this.comments = null
    this.number = null
    this.mirror = mirror
  }

  comment(data) {
    const { bodyHTML, updatedAt } = data.node
    const { url, login, avatarUrl } = data.node.author || {
      url: 'https://github.com/ghost',
      login: 'ghost',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10137?v=3'
    }

    return creator('li', {
      innerHTML: `
        <a href="${url}" class="author">
          <img src="${avatarUrl}" alt="${login}" />
        </a>
        <div class="comment-body">
          <a target="_blank" href="${url}">${login}</a>
          <span>on ${timeFormat(updatedAt)}</span>
          <div class="markdown-body">${bodyHTML}</div>
        </div>
      `
    })
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
      return creator('a', {
        target: '_blank',
        href: `https://github.com/${user}/${repository}/issues/${number}#new_comment_field`,
        className: 'button',
        innerHTML: 'Add Comments'
      })
    }

    return creator('button', {
      className: 'button',
      onclick: () => {
        this.mirror.getComments(`${number}#${endCursor}`)
      },
      innerHTML: `Load More (${totalCount - edges.length} / ${totalCount})`
    })
  }

  render(issue) {
    const { comments, number } = issue
    const { edges } = comments

    this.comments = comments
    this.number = number

    const frag = $(document.createDocumentFragment())
    const ul = creator('ul', { className: 'comment-list' })

    edges.forEach(comment => ul.appendChild(this.comment(comment)))
    frag.append(ul).append(this.next).append(footer)

    this.container.html('').append(frag.dom[0])
  }
}

export default Comments
