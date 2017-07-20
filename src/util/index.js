class Query {
  constructor(dom) {
    this.dom = typeof dom === 'string' ?
    document.querySelectorAll(dom) : [dom]
  }

  addClass(name) {
    this.dom.forEach(d => d.classList.add(name))
    return this
  }

  removeClass(name) {
    this.dom.forEach(d => d.classList.remove(name))
    return this
  }

  html(html) {
    this.dom.forEach(d => d.innerHTML = html)
    return this
  }

  hide() {
    this.dom.forEach(d => d.style.display = 'none')
    return this
  }

  parent() {
    this.dom = [this.dom[0].parentNode]
    return this
  }
}

export const $ = dom => new Query(dom)