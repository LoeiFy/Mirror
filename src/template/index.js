import Issues from './issues'
import Issue from './issue'
import User from './user'
import Comments from './comments'

class Template {
  constructor(mirror) {
    this.tpl = {
      comments: new Comments('#comments', mirror),
      issues: new Issues('#posts', mirror),
      issue: new Issue('#post', mirror),
      user: new User('#user'),
    }
  }

  comments(data) {
    return this.tpl.comments.render(data)
  }

  issues(data) {
    return this.tpl.issues.render(data)
  }

  issue(data) {
    return this.tpl.issue.render(data)
  }

  user(data) {
    return this.tpl.user.render(data)
  }
}

export default Template
