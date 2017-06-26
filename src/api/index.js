import Comments from './comments'
import Issue from './issue'
import Issues from './issues'
import User from './user'

export default {
  comments: new Comments(),
  issue: new Issue(),
  issues: new Issues(),
  user: new User()
}