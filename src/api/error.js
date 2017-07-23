import { $, creator } from '../util' 

export default function(msg) {
  const frag = document.createDocumentFragment()
  const div = creator('div', {
    id: 'error',
    onclick() {
      $('html').removeClass('error')
      $('body').remove(this)
    },
    innerHTML: `
      <div>
        <h2>Something Error</h2>
        <p>${msg}</p>
      </div>
    `
  })

  frag.appendChild(div)
  $('html').addClass('error')
  $('body').append(frag)
}