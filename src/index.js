import 'es6-promise/auto'
import { polyfill } from 'smoothscroll-polyfill'

import './style/'
import { $ } from './util'
import API from './api/'
import Router from './router/'
import Issues from './template/issues'
import Issue from './template/issue'
import User from './template/user'
import Comments from './template/comments'
import Obeserver from './observer'
import { switchToHome, switchToPost } from './switch'

window.Mirror = { __: {}, issue: {}, comments: {} }

const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')
const comments = new Comments('#comments')
const router = new Router({ '/': onPosts, '/posts/:id': onPost })
const observer = new Obeserver(Mirror)

let scrollY = 0

polyfill()
observer.watch({
  'user': user._.bind(user),
  'issues': issues._.bind(issues),
  'issue': issue._.bind(issue),
  'comments': comments._.bind(comments)
})

function onPosts() {
  if (Mirror.user) {
    user._(Mirror.user)
    return Mirror.getPosts()
  }

  return API.user._()
  .then(res => Mirror.getPosts('', res.user))
}

function onPost(params) {
  scrollY = window.scrollY
  Mirror.getPost(params.id)
}

Mirror.getPosts = function(after = '', userData) {
  document.title = window.config.title

  if (this.issues && !after) {
    issues._(this.issues)
    return switchToHome().then(() => {
      window.scroll({ top: scrollY, left: 0, behavior: 'smooth' })
    })
  }

  return API.issues._(after)
  .then((res) => {
    const { edges, totalCount, pageInfo } = res.repository.issues
    const issues = {
      pageInfo,
      totalCount,
      edges: this.issues ? this.issues.edges.concat(edges) : edges
    }

    this.issues = issues

    if (userData) {
      this.user = userData
    }

    if (!after) {
      return switchToHome().then(() => {
        window.scroll({ top: scrollY, left: 0, behavior: 'smooth' })
      })
    }
  })
}

Mirror.getPost = function(number) {
  if (this.issue[number]) {
    document.title = `${this.issue[number].title} - ${window.config.title}`
    issue._(this.issue[number])
    return switchToPost()
  }

  document.title = 'loading'

  return API.issue._(number)
  .then((res) => {
    document.title = `${res.repository.issue.title} - ${window.config.title}`
    this.issue = Object.assign({ [number]: res.repository.issue }, this.issue)
    switchToPost()
  })
}

Mirror.openComments = function(params, ele) {
  $('#comments').html('')
  this.getComments(params, ele)
}

Mirror.getComments = function(params, ele) {
  const [id, after] = params.split('#')

  if (this.comments[id] && !after) {
    if (ele) {
      ele.parentNode.style.display = 'none'
    }
    return comments._(this.comments[id])
  }

  return API.comments._(id, after)
  .then((res) => {
    const {
      number,
      comments: { totalCount, pageInfo, edges }
    } = res.repository.issue

    const newEdges = this.comments[id] && number === parseInt(id) ?
    this.comments[id].comments.edges.concat(edges) : edges

    const issue = {
      number,
      comments: {
        totalCount,
        pageInfo,
        edges: newEdges
      }
    }

    const comments = Object.assign({}, this.comments)

    if (number === parseInt(id)) {
      comments[id] = issue
      this.comments = comments
    } else {
      this.comments = Object.assign({ [number]: issue }, this.comments)
    }

    if (ele) {
      ele.parentNode.style.display = 'none'
    }
  })
}

router.notFound = function(params) {
  router.go('/')
}

router.start()

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
