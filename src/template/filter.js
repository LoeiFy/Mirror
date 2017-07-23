function stringFormat(s) {
  return s.toString().toLowerCase().trim()
}

let { authors, user } = window.config

authors = (authors || '').split(',').map(author => stringFormat(author))
user = stringFormat(user)

if (authors.indexOf(user) === -1) {
  authors.push(user)
}

export default function(issues) {
  return issues.filter((issue) => {
    const author = stringFormat(issue.node.author.login)
    return authors.indexOf(author) > -1
  })
}