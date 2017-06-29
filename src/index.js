import 'es6-promise/auto'
import { polyfill } from 'smoothscroll-polyfill'

import './style/'

import API from './api/'
import Router from './router'
import Issues from './template/issues'
import Issue from './template/issue'
import User from './template/user'
import Comments from './template/comments'

window.Mirror = {}

const issues = new Issues('#posts')
const issue = new Issue('#post')
const user = new User('#user')
const comments = new Comments('#comments')
const router = new Router({ '/posts': onPosts, '/posts/:id': onPost })

function onPosts() {
  API.user._()
  .then((res) => {
    user._(res.user)
    Mirror.getPosts()
  })
  .catch(err => console.log(err))
}

function onPost(params) {
  Mirror.getPost(params.id)
}

Mirror.getPosts = function(after = '') {
  API.issues._(after)
  .then(res => issues._(res.repository.issues))
  .catch(err => console.log(err))
}

Mirror.getPost = function(id) {
  API.issue._(id)
  .then(res => issue.setIssue(res.repository.issue))
  .catch(err => console.log(err))
}

Mirror.getComments = function(params) {
  API.comments._(...params.split('#'))
  .then(res => comments._(res.repository.issue))
  .catch(err => console.log(err))
}

router.notFound = function(params) {
  router.go('/posts')
}

router.start()

polyfill()

// console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
