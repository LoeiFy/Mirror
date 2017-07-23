import titleFormat from './title'
import timeFormat from './time'
import icon_back from '../svg/back.svg'
import footer from './footer'
import { $, creator } from '../util'

const { user, repository } = window.config

class Issue {
  constructor(selector, mirror) {
    this.mirror = mirror
    this.container = $(selector)
    this.issue = null
  }

  get comments() {
    const { number, comments: { totalCount } } = this.issue
    const frag = $(document.createDocumentFragment())

    if (totalCount === 0) {
      const a = creator('a', {
        className: 'button',
        target: '_blank',
        href: `https://github.com/${user}/${repository}/issues/${number}#new_comment_field`,
        innerHTML: 'Add Comments'
      })

      frag.append(a)
      frag.append(footer)

      return frag.dom[0]
    }

    const mirror = this.mirror
    const div = creator('div', { className: 'open-comments' })
    const button = creator('button', {
      className: 'button',
      onclick() {
        mirror.openComments(number.toString(), this)
      },
      innerHTML: `View Comments (${totalCount})`
    })

    div.appendChild(button)
    div.appendChild(footer)
    frag.append(div)

    return frag.dom[0]
  }

  render(issue) {
    this.issue = issue

    const { title, bodyHTML, updatedAt } = issue
    const labels = issue.labels.edges
    .map(label => `
      <a
        target="_blank"
        href="https://github.com/${user}/${repository}/labels/${label.node.name}"
      >#${label.node.name}</a>
    `)
    .join('')

    const frag = $(document.createDocumentFragment())
    const back = creator('div', {
      className: 'back',
      onclick() {
        location.hash = '/'
      },
      innerHTML: icon_back
    })
    const h1 = creator('h1', { innerHTML: titleFormat(title) })
    const p = creator('p', { innerHTML: `Updated at<span>${timeFormat(updatedAt)}</span>` })
    const body = creator('div', {
      className: 'markdown-body',
      innerHTML: bodyHTML
    })
    const tags = creator('div', {
      className: 'labels',
      innerHTML: labels
    })

    frag.append(back).append(h1).append(p).append(body).append(tags).append(this.comments)

    this.container.html('').append(frag.dom[0])
  }
}

export default Issue
