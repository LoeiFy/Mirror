export default function(observer, key, fn) {
  if (observer[key]) {
    observer.__[key] = {}
  }

  Object.defineProperty(observer, key, {
    get: () => {
      return observer.__[key]
    },
    set: value => {
      fn(value, observer.__[key])
      observer.__[key] = value
    }
  })
}