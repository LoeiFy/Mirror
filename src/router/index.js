import getParams from './params'

class Router {
  constructor(routes) {
    this.routes = routes
    this.page404 = () => {}
    this.listen()
  }

  listen() {
    window.addEventListener('hashchange', (e) => { this.resolve(e) })
  }

  resolve(e) {
    const route = window.location.hash.split('#')[1] || '/'
    const { match, params } = getParams(Object.keys(this.routes), route)

    if (match) {
      this.routes[match](Object.assign({ e }, params))
    } else {
      this.page404(route)
    }
  }

  set notFound(fn) {
    this.page404 = fn
  }

  start() {
    this.resolve()
  }
}

export default Router
