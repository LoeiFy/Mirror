import { $ } from '../util'
import sleep from './sleep'

export async function switchToHome() {
  $('.single').addClass('page-moveto')
  $('.home').addClass('page-movefrom')
  $('html').addClass('transition')

  await sleep(800)

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

  await sleep(800)

  $('.home').removeClass('page-moveto').removeClass('page-current')
  $('html').removeClass('transition')
  $('#posts').html('')
  $('#user').html('')
  $('.single').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}