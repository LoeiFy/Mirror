class Loader {
  constructor() {
    this.selector = document.documentElement
  }

  loading() {
    this.selector.classList.add('loading')
  }

  loaded() {
    this.selector.classList.remove('loading')
  }
}

export default Loader