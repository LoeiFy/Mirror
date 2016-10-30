
const host = 'https://api.github.com'

export const ISSUES = (user, repo) => `${host}/repos/${user}/${repo}/issues`

export const ISSUE = (user, repo, id) => `${host}/repos/${user}/${repo}/issues/${id}`

export const USER = (user) => `${host}/users/${user}`

export const COMMENTS = (user, repo, id) => `${ISSUE(user, repo, id)}/comments`
