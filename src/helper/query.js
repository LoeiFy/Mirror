class Query {
  constructor(dom) {
    this.dom = typeof dom === 'string'
      ? Array.from(document.querySelectorAll(dom))
      : [dom]
  }

  addClass(name) {
    this.dom.forEach(d => d.classList.add(name))
    return this
  }

  removeClass(name) {
    this.dom.forEach(d => d.classList.remove(name))
    return this
  }

  remove(child) {
    this.dom[0].removeChild(child)
    return this
  }

  html(html) {
    this.dom.forEach((d) => {
      d.innerHTML = html // eslint-disable-line no-param-reassign
    })
    return this
  }

  hide() {
    this.dom.forEach((d) => {
      d.style.display = 'none' // eslint-disable-line no-param-reassign
    })
    return this
  }

  parent() {
    this.dom = [this.dom[0].parentNode]
    return this
  }

  append(child) {
    if (child) {
      this.dom[0].appendChild(child)
    }
    return this
  }
}

export default dom => new Query(dom)
