export default function(msg) {
  const frag = document.createDocumentFragment()
  const div = document.createElement('div')

  div.id = 'error'
  div.onclick = function() {
    document.documentElement.classList.remove('error') 
    document.body.removeChild(this)
  }
  div.innerHTML = `
    <div>
      <h2>Something Error</h2>
      <p>${msg}</p>
    </div>
  `
  frag.appendChild(div)
  document.documentElement.classList.add('error')
  document.body.appendChild(frag)
}