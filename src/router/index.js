import getParams from './params'

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
    const route = this.current()
    const { match, params } = getParams(Object.keys(this.routes), route)

    if (match) {
      this.routes[match](Object.assign({ e }, params))
    } else {
      this.page404(route)
    }
  }

  current() {
    return window.location.hash.split('#')[1] || '/'
  }

  set init(fn) {
    this.initial = fn
  }

  set notFound(fn) {
    this.page404 = fn
  }

  start() {
    this.initial(this.current())
    this.resolve()
  }
}

export default Router
