import { $ } from '../util'
import sleep from './sleep'

export async function switchToHome() {
  await sleep()

  $('.post').addClass('page-moveto')
  $('.home').addClass('page-movefrom')
  $('html').addClass('transition')

  await sleep(800)

  $('.post').removeClass('page-moveto').removeClass('page-current')
  $('html').removeClass('transition')
  $('#post').html('')
  $('#comments').html('')
  $('.home').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}

export async function switchToPost() {
  await sleep()

  $('.home').addClass('page-moveto')
  $('.post').addClass('page-movefrom')
  $('html').addClass('transition')

  await sleep(800)

  $('.home').removeClass('page-moveto').removeClass('page-current')
  $('html').removeClass('transition')
  $('#posts').html('')
  $('#user').html('')
  $('.post').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}