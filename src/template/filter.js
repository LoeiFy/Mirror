function stringFormat(s) {
  return s.toString().toLowerCase().trim()
}

function numberFormat(s) {
  return Number(stringFormat(s))
}

let { authors, user, ignores } = window.config

authors = (authors || '').split(',').map(author => stringFormat(author))
user = stringFormat(user)
ignores = (ignores || '').split(',').map(ignore => numberFormat(ignore))

if (authors.indexOf(user) === -1) {
  authors.push(user)
}

export default function (issues) {
  return issues.filter(({ node }) => {
    const {
      number,
      author: { login },
    } = node
    const author = stringFormat(login)
    return authors.indexOf(author) > -1 && ignores.indexOf(number) === -1
  })
}
