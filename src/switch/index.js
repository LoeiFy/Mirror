import { $ } from '../util'
import sleep from './sleep'

export async function switchToHome() {
  $('.single').addClass('page-moveto')
  $('.home').addClass('page-movefrom')

  await sleep(600)

  $('.single').removeClass('page-moveto').removeClass('page-current')
  $('.home').removeClass('page-movefrom').addClass('page-current')

  $('#post').html('')
  $('#comments').html('')

  return Promise.resolve()
}

export async function switchToPost() {
  $('.home').addClass('page-moveto')
  $('.single').addClass('page-movefrom')

  await sleep(600)

  $('.home').removeClass('page-moveto').removeClass('page-current')
  $('.single').removeClass('page-movefrom').addClass('page-current')

  $('#posts').html('')
  $('#user').html('')

  return Promise.resolve()
}
