import titleFormat from './title'
import timeFormat from './time'
import icon_back from '../svg/back.svg'
import footer from './footer'
import { $ } from '../util'

const { user, repository } = window.config

class Issue {
  constructor(selector) {
    this.container = $(selector)
    this.issue = null
  }

  get comments() {
    const { number, comments: { totalCount } } = this.issue

    if (totalCount === 0) {
      return `
        <a class="button" href="https://github.com/${user}/${repository}/issues/${number}#new_comment_field" target="_blank">Add Comments</a>
        ${footer}
      `
    }

    return `
      <div class="open-comments">
        <button
          class="button"
          value="${number}"
          onclick="window.Mirror.openComments(this.value, this)"
        >View Comments (${totalCount})
        </button>
        ${footer}
      </div>
    `
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

    this.container.html(`
      <div onclick="location.hash='/'" class="back">${icon_back}</div>
      <h1>${titleFormat(title)}</h1>
      <p>Updated at<span>${timeFormat(updatedAt)}</span></p>
      <div class="markdown-body">${bodyHTML}</div>
      <div class="labels">${labels}</div>
      ${this.comments}
    `)
  }
}

export default Issue