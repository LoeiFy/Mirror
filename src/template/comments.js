import timeFormat from '../utils/time'

class Comments {
  constructor(props) {
    this.state = {
      comments: props.edges,
      page: props.pageInfo,
      total: props.totalCount
    }
  }

  comment(data) {
    const {
      bodyHTML,
      updatedAt,
      user: { url, login, avatarUrl }
    } = data.node

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
  }

  render() {
    return `
      <ul class="comment-list">
        ${this.state.comments.map(comment => this.comment(comment)).join('')}
      </ul>
    `
  }
}