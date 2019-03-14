import VirtualScroll from 'virtual-scroll' // eslint-disable-line import/no-unresolved
import raf from 'raf' // eslint-disable-line import/no-unresolved

raf.polyfill()

export default class extends VirtualScroll {
  constructor() {
    super()
    this.scrollY = 0
    this.animater = null
    this.lastScrollY = 0
  }

  start(ele) {
    if (this.el === window) {
      [this.child] = ele.children
      this.el = ele
      this.on((e) => {
        this.scrollY += e.deltaY
        this.scrollY = Math.max((this.child.scrollHeight - window.innerHeight) * -1, this.scrollY)
        this.scrollY = Math.min(0, this.scrollY)
      })
      this.update()
    }
  }

  stop(y) {
    this.lastScrollY = this.scrollY
    this.el = window
    this.off()
    window.cancelAnimationFrame(this.animater)
    this.animater = null

    if (y !== undefined) {
      this.scrollY = y
    }
  }

  update() {
    const { child, scrollY } = this
    const style = `translateY(${scrollY}px) translateZ(0)`
    child.style.webkitTransform = style
    child.style.mozTransform = style
    child.style.msTransform = style
    child.style.transform = style
    this.animater = window.requestAnimationFrame(this.update.bind(this))
  }
}
