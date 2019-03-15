import timeFormat from './time'
import backIcon from '../svg/back.svg'
import $ from '../helper/query'
import creator from '../helper/creator'

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

    // should import footer from './footer' here
    // but will cause page scroll problem
    // i don not know why
    const { title } = window.config
    const footer = creator('div', {
      id: 'footer',
      innerHTML: `
        &copy; ${(new Date()).getFullYear()} ${title}. Powered by
        <a href="https://github.com/LoeiFy/Mirror" target="_blank">Mirror</a> .
        <a href="https://github.com/${user}/${repository}/issues" target="_blank">Source</a>
      `,
    })

    if (totalCount === 0) {
      const a = creator('a', {
        className: 'button',
        target: '_blank',
        href: `https://github.com/${user}/${repository}/issues/${number}#new_comment_field`,
        innerHTML: 'Add Comments',
      })

      frag.append(a)
      frag.append(footer)

      return frag.dom[0]
    }

    const { mirror } = this
    const div = creator('div', { className: 'open-comments' })
    const button = creator('button', {
      className: 'button',
      onclick() {
        mirror.openComments(number.toString(), this)
      },
      innerHTML: `View Comments (${totalCount})`,
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
      onclick: () => {
        const { issues } = this.mirror

        if (Object.keys(issues).length) {
          window.history.back()
        } else {
          window.location.hash = '#/'
        }
      },
      innerHTML: backIcon,
    })
    const h1 = creator('h1', { innerHTML: title })
    const p = creator('p', { innerHTML: `Updated at<span>${timeFormat(updatedAt)}</span>` })
    const body = creator('div', {
      className: 'markdown-body',
      innerHTML: bodyHTML,
    })
    const tags = creator('div', {
      className: 'labels',
      innerHTML: labels,
    })

    frag
      .append(back)
      .append(h1)
      .append(p)
      .append(body)
      .append(tags)
      .append(this.comments)

    this.container.html('').append(frag.dom[0])
  }
}

export default Issue
