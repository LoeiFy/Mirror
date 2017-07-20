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

window.Mirror = { __: {}, issue: {}, comments: {}, scrollY: 0 }

const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')
const comments = new Comments('#comments')
const router = new Router({ '/': onPosts, '/posts/:id': onPost })
const observer = new Obeserver(Mirror)

polyfill()
observer.watch({
  'user': user.render.bind(user),
  'issues': issues.render.bind(issues),
  'issue': issue.render.bind(issue),
  'comments': comments.render.bind(comments)
})

function onPosts() {
  if (Mirror.user) {
    user.render(Mirror.user)
    return Mirror.getPosts()
  }

  return API.user()
  .then(res => Mirror.getPosts('', res.user))
}

function onPost(params) {
  Mirror.scrollY = window.scrollY
  Mirror.getPost(params.id)
}

Mirror.getPosts = function(after = '', userData) {
  document.title = window.config.title

  if (this.issues && !after) {
    issues.render(this.issues)
    return switchToHome().then(() => {
      window.scroll({ top: Mirror.scrollY, left: 0, behavior: 'smooth' })
    })
  }

  return API.issues(after)
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
        window.scroll({ top: Mirror.scrollY, left: 0, behavior: 'smooth' })
      })
    }
  })
}

Mirror.getPost = async function(number) {
  document.title = 'loading'

  let post = this.issue[number]

  if (post) {
    issue.render(post)
  } else {
    const { repository } = await API.issue(number)
    post = repository.issue
    this.issue = Object.assign({ [number]: post }, this.issue)
  }

  document.title = `${post.title} - ${window.config.title}`
  switchToPost()
}

Mirror.openComments = async function(params, ele) {
  $('#comments').html('')
  await this.getComments(params)
  $(ele).parent().hide()
}

Mirror.getComments = function(params) {
  const [id, after] = params.split('#')

  if (this.comments[id] && !after) {
    comments.render(this.comments[id])
    return Promise.resolve()
  }

  return API.comments(id, after)
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

    return Promise.resolve()
  })
}

router.notFound = function(params) {
  router.go('/')
}

router.start()

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
