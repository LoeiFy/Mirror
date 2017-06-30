import 'es6-promise/auto'
import { polyfill } from 'smoothscroll-polyfill'

import './style/'

import API from './api/'
import Router from './router/'
import Issues from './template/issues'
import Issue from './template/issue'
import User from './template/user'
import Comments from './template/comments'
import observer from './util/observer'
import diff from './util/diff'

polyfill()

const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')
const comments = new Comments('#comments')
const router = new Router({ '/posts': onPosts, '/posts/:id': onPost })

window.Mirror = { __: {}, issue: {} }

observer(Mirror, 'user', function(value) { user._(value) })
observer(Mirror, 'issues', function(value) { issues._(value) })
observer(Mirror, 'issue', function(n, o) { issue._(diff(n, o)) })

function onPosts() {
  if (Mirror.user) {
    user._(Mirror.user)
    return Mirror.getPosts()
  }

  return API.user._()
  .then((res) => {
    Mirror.user = res.user
    return Mirror.getPosts()
  })
  .catch(err => console.log(err))
}

function onPost(params) {
  Mirror.getPost(params.id)
}

Mirror.getPosts = function(after = '') {
  if (Mirror.issues && !after) {
    return issues._(Mirror.issues)
  }

  return API.issues._(after)
  .then((res) => {
    const { edges, totalCount, pageInfo } = res.repository.issues
    const issues = {
      pageInfo,
      totalCount,
      edges: Mirror.issues ? Mirror.issues.edges.concat(edges) : edges
    }

    Mirror.issues = issues
  })
  .catch(err => console.log(err))
}

Mirror.getPost = function(number) {
  if (Mirror.issue[number]) {
    return issue._(Mirror.issue[number])
  }

  return API.issue._(number)
  .then((res) => {
    Mirror.issue = Object.assign({ [number]: res.repository.issue }, Mirror.issue)
  })
  .catch(err => console.log(err))
}

// Mirror.getComments = function(params) {
//   API.comments._(...params.split('#'))
//   .then(res => comments._(res.repository.issue))
//   .catch(err => console.log(err))
// }

router.notFound = function(params) {
  router.go('/posts')
}

router.start()

// console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
