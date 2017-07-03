// https://codereview.stackexchange.com/questions/117596/simple-javascript-router-with-params

function routeMatch(route, url) {
  const matcher = `^${route.replace(/(:\w+)/g, '([\\w-]+)')}$`
  return url.match(matcher)
}

function computeParams(route, url) {
  const routeParts = route.split('/')
  const urlParts = url.split('/')
  const options = {}

  for (let i = 0; i < routeParts.length; i += 1) {
    if (urlParts[i] && ~routeParts[i].indexOf(':')) {
      options[routeParts[i].slice(1)] = urlParts[i]
    }
  }

  return options
}

export default function(routes, url) {
  for (let i = 0; i < routes.length; i += 1) {
    if (routeMatch(routes[i], url)) {
      return { match: routes[i], params: computeParams(routes[i], url) }
    }
  }

  return { match: null, params: null }
}