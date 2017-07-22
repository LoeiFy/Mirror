import Issues from './issues'
import Issue from './issue'
import User from './user'
import Comments from './comments'

// const comments = new Comments('#comments')
// const issues = new Issues('#posts')
// const issue = new Issue('#post')
// const user = new User('#user')

class Template {
  constructor(triggers) {
    const { getPosts } = triggers
    this.comments = new Comments('#comments')
    this.issues = new Issues('#posts', getPosts)
    this.issue = new Issue('#post')
    this.user = new User('#user')
  }

  comments(data) {
    return this.comments.render(data)
  }

  issues(data) {
    return this.issues.render(data)
  }

  issue(data) {
    return this.issue.render(data)
  }

  user(data) {
    return this.user.render(data)
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