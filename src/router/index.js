import getParams from './params'

function hash() {
  return window.location.hash.split('#')[1] || '/'
}

class Router {
  constructor(routes) {
    this.routes = routes
    this.page404 = () => null
    this.initial = () => null
    this.listen()
  }

  listen() {
    window.addEventListener('hashchange', (e) => { this.resolve(e) })
  }

  resolve(e) {
    const route = hash()
    const { match, params } = getParams(Object.keys(this.routes), route)

    if (params.cursor) {
      params.cursor = window.atob(params.cursor)
    }

    if (match) {
      this.routes[match](Object.assign({ e }, params))
    } else {
      this.page404(route)
    }
  }

  set init(fn) {
    this.initial = fn
  }

  set notFound(fn) {
    this.page404 = fn
  }

  get route() { // eslint-disable-line class-methods-use-this
    return hash()
  }

  start() {
    this.initial(hash())
    this.resolve()
  }
}

export default Router
