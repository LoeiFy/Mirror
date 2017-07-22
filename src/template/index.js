import Issues from './issues'
import Issue from './issue'
import User from './user'
import Comments from './comments'

// const comments = new Comments('#comments')
// const issues = new Issues('#posts')
// const issue = new Issue('#post')
// const user = new User('#user')

class Template {
  constructor(mirror) {
    this._comments = new Comments('#comments')
    this._issues = new Issues('#posts', mirror)
    this._issue = new Issue('#post')
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

// export default {
//   comments(data) {
//     return comments.render(data)
//   },
//   issues(data) {
//     return issues.render(data)
//   },
//   issue(data) {
//     return issue.render(data)
//   },
//   user(data) {
//     return user.render(data)
//   }
// }