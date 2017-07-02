class Transition {
  constructor() {
    this.home = document.querySelector('.home')
    this.page = document.querySelector('.post')
    this.post = document.querySelector('#post')
    this.comments = document.querySelector('#comments')
    this.posts = document.querySelector('#posts')
    this.user = document.querySelector('#user')
    this.html = document.documentElement
  }

  toHome(fn) {
    setTimeout(() => {
      this.page.classList.add('page-moveto')
      this.home.classList.add('page-movefrom')
      this.html.classList.add('transition')

      setTimeout(() => {
        this.page.classList.remove('page-moveto', 'page-current')
        this.html.classList.remove('transition')
        this.post.innerHTML = ''
        this.comments.innerHTML = ''

        fn && fn()
      }, 700)
      setTimeout(() => {
        this.home.classList.remove('page-movefrom');
        this.home.classList.add('page-current')
      }, 600)
    }, 0)
  }

  toPost() {
    setTimeout(() => {
      this.home.classList.add('page-moveto')
      this.page.classList.add('page-movefrom')
      this.html.classList.add('transition')

      setTimeout(() => {
        this.home.classList.remove('page-moveto', 'page-current')
        this.html.classList.remove('transition')
        this.posts.innerHTML = ''
        this.user.innerHTML = ''
      }, 700)
      setTimeout(() => {
        this.page.classList.remove('page-movefrom');
        this.page.classList.add('page-current')
      }, 600)
    }, 0)
  }
}

export default Transition