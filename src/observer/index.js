import diff from './diff' 

class Observer {
  constructor(listener) {
    this.listener = listener
  }

  watch(items) {
    items.forEach((item) => {
      const { key, trigger } = item

      if (this.listener[key]) {
        this.listener.__[key] = {}
      }

      Object.defineProperty(this.listener, key, {
        get: () => {
          return this.listener.__[key]
        },
        set: value => {
          trigger(diff(value, this.listener.__[key]))
          this.listener.__[key] = value
        }
      })
    })
  }
}

export default Observer
