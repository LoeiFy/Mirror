import './style/index.css'
import { $ } from './util'
import API from './api/'
import Template from './template'
import Router from './router/'
import Obeserver from './observer'
import { switchToHome, switchToPost } from './switch'

require('smoothscroll-polyfill').polyfill()

const mirror = {
  __: {},
  // issues: {},
  issue: {},
  comments: {},
  scrollY: 0,
}
const TPL = new Template(mirror)

async function onPosts(type, { cursor }) {
  if (mirror.user) {
    TPL.user(mirror.user)
    return mirror.getPosts(type, cursor)
  }

  const res = await API.user()
  return mirror.getPosts(type, cursor, res.user || res.organization)
}

function onPost({ id }) {
  mirror.scrollY = window.scrollY
  mirror.getPost(id)
}

const router = new Router({
  '/': params => onPosts('after', params),
  '/posts/:id': onPost,
  '/after/:cursor': params => onPosts('after', params),
  '/before/:cursor': params => onPosts('before', params),
})
const observer = new Obeserver(mirror)

mirror.getPosts = async function getPosts(type, cursor, userData) {
  document.title = window.config.title

  const {
    repository: {
      issues: {
        edges,
        pageInfo,
        totalCount,
      },
    },
  } = await API.issues(type, cursor)

  this.issues = {
    pageInfo,
    totalCount,
    edges,
  }

  if (userData) {
    this.user = userData
  }

  if (!cursor) {
    await switchToHome()
    window.scroll({
      top: mirror.scrollY,
      left: 0,
      behavior: 'smooth',
    })
  }
}

mirror.getPost = async function getPost(number) {
  document.title = 'loading'

  let post = this.issue[number]

  if (post) {
    TPL.issue(post)
  } else {
    const { repository } = await API.issue(number)
    post = repository.issue
    this.issue = Object.assign({ [number]: post }, this.issue)
  }

  document.title = `${post.title} - ${window.config.title}`

  switchToPost()
}

mirror.openComments = async function openComments(params, ele) {
  $('#comments').html('')
  await this.getComments(params)
  $(ele).parent().hide()
}

mirror.getComments = async function getComments(params) {
  const [id, after] = params.split('#')
  const comment = this.comments[id]

  if (comment && !after) {
    TPL.comments(comment)
  } else {
    const {
      repository: {
        issue: {
          number,
          comments: {
            totalCount,
            pageInfo,
            edges,
          },
        },
      },
    } = await API.comments(id, after)

    const newComment = {
      number,
      comments: {
        totalCount,
        pageInfo,
        edges: comment && number === Number(id) ? comment.comments.edges.concat(edges) : edges,
      },
    }

    const allComments = Object.assign({}, this.comments)

    if (number === Number(id)) {
      allComments[id] = newComment
      this.comments = allComments
    } else {
      this.comments = Object.assign({ [number]: newComment }, this.comments)
    }
  }

  return Promise.resolve()
}

router.notFound = () => router.go('/')

observer.watch({
  user: TPL.user.bind(TPL),
  issues: TPL.issues.bind(TPL),
  issue: TPL.issue.bind(TPL),
  comments: TPL.comments.bind(TPL),
})

router.start()

// eslint-disable-next-line no-console
console.log('%c Github %c', 'background:#24272A; color:#ffffff', '', 'https://github.com/LoeiFy/Mirror')
