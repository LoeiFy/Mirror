import titleFormat from '../utils/titleFormat'
import timeFormat from '../utils/timeFormat'

class Post {
  constructor(issue) {
    this.number = issue.number
    this.total = issue.comments.totalCount
    this.updatedAt = issue.updatedAt
    this.title = title
    this.bodyHTML = issue.bodyHTML
  }

  render() {
    return `
      <h1>${titleFormat(this.title)}</h1>
      <p>Updated at<span>${timeFormat(updatedAt)}</span></p>
      <div class="markdown-body">${bodyHTML}</div>
    `
  }
}

export default Post