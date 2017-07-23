import Comments from './comments'
import Issue from './issue'
import Issues from './issues'
import User from './user'

const comments = new Comments()
const issue = new Issue()
const issues = new Issues()
const user = new User()

export default {
  comments(...args) {
    return comments.get(...args)
  },
  issue(...args) {
    return issue.get(...args)
  },
  issues(...args) {
    return issues.get(...args)
  },
  user(...args) {
    return user.get(...args)
  }
}