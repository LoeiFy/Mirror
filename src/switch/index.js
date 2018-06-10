import { $ } from '../util'
import sleep from './sleep'

function scrollToTop(scrollDuration) {
  const cosParameter = window.scrollY / 2
  let scrollCount = 0
  let oldTimestamp = performance.now()
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    if (scrollCount >= Math.PI) {
      window.scrollTo(0, 0)
    }
    if (window.scrollY === 0) {
      return
    }
    window.scrollTo(0, Math.round(cosParameter + (cosParameter * Math.cos(scrollCount))))
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export async function switchToHome() {
  $('.single').addClass('page-moveto')
  $('.home').addClass('page-movefrom')
  $('html').addClass('transition')

  await sleep(410)

  $('.single').removeClass('page-moveto').removeClass('page-current')
  $('html').removeClass('transition')
  $('#post').html('')
  $('#comments').html('')
  $('.home').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}

export async function switchToPost() {
  $('.home').addClass('page-moveto')
  $('.single').addClass('page-movefrom')
  $('html').addClass('transition')

  await sleep(400)

  $('.home').removeClass('page-moveto').removeClass('page-current')
  $('html').removeClass('transition')
  $('#posts').html('')
  $('#user').html('')
  $('.single').removeClass('page-movefrom').addClass('page-current')

  await sleep(100)

  scrollToTop(300)

  return Promise.resolve()
}
