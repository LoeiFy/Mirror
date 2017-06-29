import timeFormat from '../util/time'

function titleFormat(title) {
  return title.split(/\[.*?\]/g).join('')
}

function stringFormat(s) {
  return s.toString().toLowerCase().trim()
}

const { authors, user } = window.config

class Issues {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.issues = { posts: [], pageInfo: {}, totalCount: 0 }
  }

  get authors() {
    const trimAuthors = (authors || []).map(author => stringFormat(author))
    const trimUser = stringFormat(user)

    if (trimAuthors.indexOf(trimUser) === -1) {
      trimAuthors.push(trimUser)
    }

    return trimAuthors
  }

  setIssues(issues) {
    const { edges, totalCount, pageInfo } = issues

    this.issues.pageInfo = pageInfo
    if (!this.issues.posts.length) {
      this.issues.posts = this.filterPosts(edges)
      this.issues.totalCount = totalCount
    } else {
      this.issues.posts = this.issues.posts.concat(this.filterPosts(edges))
    }

    this.render()
  }

  filterPosts(issues) {
    return issues.filter((issue) => {
      const author = stringFormat(issue.node.author.login)
      return this.authors.indexOf(author) > -1
    })
  }

  post(issue) {
    const { number, title, updatedAt } = issue
    const labels = issue.labels.edges
    .map(label => `<span>#${label.node.name}</span>`)
    .join('')

    return `
      <a href="#/posts/${number}">
        <h2>${titleFormat(title)}</h2>
        <div>${labels}</div>
        <p>${timeFormat(updatedAt)}</p>
      </a>
    `
  }

  pagination() {
    const {
      posts,
      pageInfo: { endCursor, hasNextPage },
      totalCount
    } = this.issues

    if (hasNextPage) {
      return `
      <button value="${endCursor}" onclick="window.trigger.getPosts(this.value)">
        ${posts.length} / ${totalCount}
      </button>
      `
    }

    return ''
  }

  render() {
    const { posts } = this.issues

    this.container.innerHTML = posts
    .map(issue => this.post(issue.node))
    .join('') + this.pagination()
  }
}

export default Issues