import Comments from './comments'
import Issue from './issue'
import Issues from './issues'
import User from './user'

export default {
  comments(...args) {
    return (new Comments()).get(...args)
  },
  issue(...args) {
    return (new Issue()).get(...args)
  },
  issues(...args) {
    return (new Issues()).get(...args)
  },
  user(...args) {
    return (new User()).get(...args)
  }
}