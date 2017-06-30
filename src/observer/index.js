class Observer {
  constructor(object) {
    this.object = Object.assign(object, { __: {} }) 
  }

  add(config) {
    const key = Object.keys(config)[0]
    const fn = config[key]

    Object.defineProperty(this.object, key, {
      get: () => {
        return this.object.__[key]
      },
      set: value => {
        fn(value)
        this.object.__[key] = value
      }
    })
  }
}

export default Observer