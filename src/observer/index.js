import diff from './diff'

class Observer {
  constructor(listener) {
    this.listener = listener
  }

  watch(items) {
    Object.keys(items).forEach((key) => {
      const trigger = items[key]
      let useDiff = false

      if (this.listener[key]) {
        this.listener.__[key] = {}
        useDiff = true
      }

      Object.defineProperty(this.listener, key, {
        get: () => {
          return this.listener.__[key]
        },
        set: value => {
          trigger(useDiff ? diff(value, this.listener.__[key]) : value)
          this.listener.__[key] = value
        }
      })
    })
  }
}

export default Observer
