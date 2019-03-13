import VirtualScroll from 'virtual-scroll' // eslint-disable-line import/no-unresolved

export default class extends VirtualScroll {
  constructor(e) {
    super({ el: e })
    this.scrollY = 0;
    [this.child] = e.children
  }

  init() {
    this.on((e) => {
      this.scrollY += e.deltaY
      this.scrollY = Math.max((this.child.scrollHeight - window.innerHeight) * -1, this.scrollY)
      this.scrollY = Math.min(0, this.scrollY)
    })
    this.update()
  }

  update() {
    const { child, scrollY } = this
    child.style.transform = `translateY(${scrollY}px)`
    window.requestAnimationFrame(this.update.bind(this))
  }
}
