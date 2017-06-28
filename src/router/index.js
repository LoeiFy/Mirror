import getParams from './params'

class Router {
  constructor(routes) {
    this.routes = routes
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
    }
  }

  start() {
    this._resolve()
  }
}

export default Router