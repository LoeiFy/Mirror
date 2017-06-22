function getMode(mode) {
  return mode === 'history' && !!history.pushState ?
    'history' : 'hash'
}

class Router {
  constructor(config) {
    const { mode, routes, root } = config
    this.routes = routes
    this.mode = getMode(mode)
    this.root = root
  }
}

export default Router