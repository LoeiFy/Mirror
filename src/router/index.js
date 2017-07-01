import getParams from './params'

class Router {
  constructor(routes) {
    this.routes = routes
    this._404 = null
    this._changed = null
    this._listen()
  }

  go(path) {
    location.hash = path
  }

  _listen() {
    window.addEventListener('hashchange', () => { this._resolve() })
  }

  _resolve() {
    const route = location.hash.split('#')[1] || '/'
    const { match, params } = getParams(Object.keys(this.routes), route)

    if (match) {
      this.routes[match](params)
      this._changed && this._changed()
    } else {
      this._404 && this._404(route)
    }
  }

  set notFound(fn) {
    this._404 = fn
  }

  set changed(fn) {
    this._changed = fn
  }

  start() {
    this._resolve()
  }
}

export default Router