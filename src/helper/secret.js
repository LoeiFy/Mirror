const map = {
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')',
}

const reverseMap = {}

Object.keys(map).forEach((n) => {
  const v = map[n]
  reverseMap[v] = n
})

function getHost() {
  const { host = 'mirror.am0200.com' } = window.config
  const { port, hostname } = window.location

  if (port) {
    return host
  }
  return hostname
}

export const en = (token, host = getHost()) => {
  const m = token.split('').map(s => map[s] || s).join('')
  const b = window.btoa(host)
  return m + b
}

export const de = (mix) => {
  const b = window.btoa(getHost())
  return mix
    .split(b)[0]
    .split('')
    .map(s => reverseMap[s] || s).join('')
}
