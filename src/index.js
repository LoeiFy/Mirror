import 'es6-promise/auto'
import { polyfill } from 'smoothscroll-polyfill'

import api from './api/'
import Router from './router'
import Issues from './template/issues'
import Issue from './template/issue'
import User from './template/user'
import Comments from './template/comments'

import './style/'

polyfill()

window.trigger = {}

const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')
const comments = new Comments('#comments')

trigger.getPosts = function(after = '') {
  if (issues.posts.length && !after) {
    return issues.render()
  }

  return api.issues._(after)
  .then(res => {
    issues._(res.repository.issues)
  })
  .catch(err => console.log(err))
}

trigger.getPost = function(id) {
  api.issue._(id)
  .then(res => issue.setIssue(res.repository.issue))
  .catch(err => console.log(err))
}

trigger.getUser = function() {
  if (user.user.email) {
    user.render()
    return Promise.resolve()
  }

  return api.user._()
  .then(res => {
    user._(res.user)
    return Promise.resolve()
  })
  .catch(err => console.log(err))
}

trigger.getComments = function(params) {
  api.comments._(...params.split('#'))
  .then(res => comments._(res.repository.issue))
  .catch(err => console.log(err))
}

var t = new Router({ '/posts': onPosts, '/posts/:id': onPost })

t.notFound = function(params) {
  t.go('/posts')
}

t.start()

function onPosts() {
  trigger.getUser()
  .then(() => trigger.getPosts())
}

function onPost(params) {
  trigger.getPost(params.id)
}

// console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
