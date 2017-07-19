class Query {
  constructor(dom) {
    this.dom = document.querySelectorAll(dom)
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
}

export const $ = dom => new Query(dom)