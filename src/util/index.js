export function creator(tag, params) {
  const ele = document.createElement(tag)

  Object.keys(params).forEach((key) => {
    ele[key] = params[key]
  })

  return ele
}

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

  remove(child) {
    this.dom[0].removeChild(child)
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

  append(child) {
    if (child) {
      this.dom[0].appendChild(child)
    }
    return this
  }
}

export const $ = dom => new Query(dom)
