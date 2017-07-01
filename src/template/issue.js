import titleFormat from '../util/title'
import timeFormat from '../util/time'
import icon_back from '../svg/back.svg'

const { user, repository } = window.config

class Issue {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.issue = {}
  }

  _(issue) {
    this.issue = issue
    this._render()
  }

  get comments() {
    const { number, comments: { totalCount } } = this.issue

    if (totalCount === 0) {
      return `
        <a href="https://github.com/${user}/${repository}/issues/${number}#new_comment_field" target="_blank">add comments</a>
      `
    }

    return `
      <button
        value="${number}"
        onclick="window.Mirror.getComments(this.value)"
      >view ${totalCount} comments
      </button>
    `
  }

  _render() {
    const { title, bodyHTML, updatedAt } = this.issue
    const labels = this.issue.labels.edges
    .map(label => `
      <a
        target="_blank"
        href="https://github.com/${user}/${repository}/labels/${label.node.name}"
      >#${label.node.name}</a>
    `)
    .join('')

    this.container.innerHTML = `
      <a href="#/">${icon_back}</a>
      <h1>${titleFormat(title)}</h1>
      <p>Updated at<span>${timeFormat(updatedAt)}</span></p>
      <div class="labels">${labels}</div>
      <div class="markdown-body">${bodyHTML}</div>
      ${this.comments}
    `
  }
}

export default Issue