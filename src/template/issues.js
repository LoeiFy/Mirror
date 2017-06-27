import timeFormat from '../utils/time'

function titleFormat(title) {
  return title.split(/\[.*?\]/g).join('')
}

class Posts {
  constructor(config, issues) {
    this.config = config
    this.issues = issues
  }

  get authors() {
    return (this.config.authors || [])
    .map(author => author.toString().toLowerCase().trim())
    .push(this.config.user.toString().toLowerCase().trim())
  }

  get posts() {
    return this.issues
    .filter(issue => this.authors.indexOf(issue.user.login) > -1)
  }

  post(issue) {
    const { number, title, upadteAt } = issue
    const labels = issue.labels
    .map(label => `<span>#${label.name}</span>`)
    .join('')

    return `
      <a href="#${number}">
        <h2>${titleFormat(title)}</h2>
        <section>${labels}</section>
        <p>${timeFormat(upadteAt)}</p>
      </a>
    `
  }

  render() {
    return this.posts
    .map(issue => this.post(issue))
    .join('')
  }
}

export default Posts