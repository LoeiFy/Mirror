import getParams from './params'

class Router {
  constructor(routes) {
    this.routes = routes
    this._404 = null
    this._listen()
  }

  _listen() {
    window.addEventListener('hashchange', () => { this._resolve() })
  }

  _resolve() {
    const route = location.hash.split('#')[1] || '/'
    const { match, params } = getParams(Object.keys(this.routes), route)

    if (match) {
      this.routes[match](params)
    } else {
      this._404 && this._404(route)
    }
  }

  set notFound(fn) {
    this._404 = fn
  }

  start() {
    this._resolve()
  }
}

export default Router