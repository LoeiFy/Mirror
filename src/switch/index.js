import { $ } from '../util'
import sleep from './sleep'

export async function switchToHome() {
  $('.single').addClass('page-moveto')
  $('.home').addClass('page-movefrom')

  await sleep(510)

  $('.single').removeClass('page-moveto').removeClass('page-current')
  $('.home').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}

export async function switchToPost() {
  $('.home').addClass('page-moveto')
  $('.single').addClass('page-movefrom')

  await sleep(500)

  $('.home').removeClass('page-moveto').removeClass('page-current')
  $('.single').removeClass('page-movefrom').addClass('page-current')

  return Promise.resolve()
}
