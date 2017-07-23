import { polyfill } from 'smoothscroll-polyfill'

import './style/'
import { $ } from './util'
import API from './api/'
import Template from './template'
import Router from './router/'
import Obeserver from './observer'
import { switchToHome, switchToPost } from './switch'

const mirror = { __: {}, issue: {}, comments: {}, scrollY: 0 }
const router = new Router({ '/': onPosts, '/posts/:id': onPost })
const observer = new Obeserver(mirror)
const TPL = new Template(mirror)

async function onPosts() {
  const userData = mirror.user

  if (userData) {
    TPL.user(userData)
    return mirror.getPosts()
  }

  const res = await API.user()
  mirror.getPosts('', res.user)
}

function onPost(params) {
  mirror.scrollY = window.scrollY
  mirror.getPost(params.id)
}

mirror.getPosts = async function(after = '', userData) {
  document.title = window.config.title

  const prevIssues = this.issues

  if (prevIssues && !after) {
    TPL.issues(prevIssues)
  } else {
    const {
      repository: {
        issues: {
          edges,
          pageInfo,
          totalCount
        }
      }
    } = await API.issues(after)

    const newIssues = {
      pageInfo,
      totalCount,
      edges: prevIssues ? prevIssues.edges.concat(edges) : edges
    }

    this.issues = newIssues

    if (userData) {
      this.user = userData
    }
  }

  if (!after) {
    await switchToHome()
    window.scroll({ top: mirror.scrollY, left: 0, behavior: 'smooth' })
  }
}

mirror.getPost = async function(number) {
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

mirror.openComments = async function(params, ele) {
  $('#comments').html('')
  await this.getComments(params)
  $(ele).parent().hide()
}

mirror.getComments = async function(params) {
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
            edges
          }
        }
      }
    } = await API.comments(id, after)

    const newComment = {
      number,
      comments: {
        totalCount,
        pageInfo,
        edges: comment && number === parseInt(id) ? comment.comments.edges.concat(edges) : edges
      }
    }

    const allComments = Object.assign({}, this.comments)

    if (number === parseInt(id)) {
      allComments[id] = newComment
      this.comments = allComments
    } else {
      this.comments = Object.assign({ [number]: newComment }, this.comments)
    }
  }

  return Promise.resolve()
}

router.notFound = function(params) {
  router.go('/')
}

polyfill()

observer.watch({
  'user': TPL.user.bind(TPL),
  'issues': TPL.issues.bind(TPL),
  'issue': TPL.issue.bind(TPL),
  'comments': TPL.comments.bind(TPL)
})

router.start()

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
