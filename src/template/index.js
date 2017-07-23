import Issues from './issues'
import Issue from './issue'
import User from './user'
import Comments from './comments'

class Template {
  constructor(mirror) {
    this._comments = new Comments('#comments', mirror)
    this._issues = new Issues('#posts', mirror)
    this._issue = new Issue('#post', mirror)
    this._user = new User('#user')
  }

  comments(data) {
    return this._comments.render(data)
  }

  issues(data) {
    return this._issues.render(data)
  }

  issue(data) {
    return this._issue.render(data)
  }

  user(data) {
    return this._user.render(data)
  }
}

export default Template
