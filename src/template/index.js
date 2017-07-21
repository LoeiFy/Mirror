import Issues from './issues'
import Issue from './issue'
import User from './user'
import Comments from './comments'

const comments = new Comments('#comments')
const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')

export default {
  comments(data) {
    return comments.render(data)
  },
  issues(data) {
    return issues.render(data)
  },
  issue(data) {
    return issue.render(data)
  },
  user(data) {
    return user.render(data)
  }
}