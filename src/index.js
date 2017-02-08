import * as api from './api'
import template from './template'
import { load, $, box, clone } from './util'

import './index.scss'
import icon_back from './svg/back.svg'

import 'core-js/fn/array/find'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

document.addEventListener('DOMContentLoaded', function() {
    let { title, user, repo, per_page, sandbox } = window.config

    if (!title || !user || !repo || !per_page) {
        return alert('Missing configuration information')
    }

    if (sandbox) {
        $('#sandbox').style.display = 'inline'
    }

    let issues_data = []
    let page = 1
    let current = 'list'
    let scrollY = 0
    let total = 0

    function ifPager() {
        $('#prev').style.display = page == 1 ? 'none' : 'inline-block'
        $('#next').style.display = (total && page == total) ? 'none' : 'inline-block'
    }

    function ready() {
        document.body.parentNode.classList.remove('loading')
        document.body.classList.add(current)
        $('.right').innerHTML += get_back()
    }

    function get_back() {
        let link = current == 'list' ? 'javascript:history.back()' : '/'
        return `<a href="${link}">${icon_back}</a>`
    }

    function get_issues() {
        const _issues = {
            url: api.ISSUES(user, repo),
            data: { page, per_page }
        }

        const _user = { url: api.USER(user) }

        const build_list = (res) => {
            const { headers: { link }, data } = res

            $('#posts').innerHTML = template.issues(data)
            issues_data = issues_data.concat(data)

            if (!link || link.indexOf('rel="next"') == -1) {
                $('#next').style.display = 'none'
                total = page
            }
                
            $('#next').removeAttribute('disabled')
            ifPager()
        }

        const build_user = (res) => {
            $('#user').innerHTML = template.user(res.data)
        }

        if (page == 1) {
            load(_issues, _user).then(res => {
                build_list(res[0])
                build_user(res[1])
                ready()

                $('#form .button').removeAttribute('disabled')
                $('.sandbox').classList.remove('active')
            }).catch(err => {
                alert('Something went wrong, please checkout the configurations')
                $('#form .button').removeAttribute('disabled')
            })
        } else {
            if (issues_data.length > (page - 1) * per_page) {
                $('#posts').innerHTML = template.issues(clone(issues_data).splice((page - 1) * per_page, per_page))
                $('#next').removeAttribute('disabled')
                ifPager()
            } else {
                load(_issues).then(res => build_list(res[0]))
            }
        }
    }

    function start() {
        issues_data = []
        page = 1
        total = 0

        if (location.hash) {
            current = 'single'
            const hash = location.hash.split('#')[1]

            load({ url: api.ISSUE(user, repo, hash) }).then(res => {
                const { data: { closed_at } } = res[0]

                if (closed_at) {
                    return location.replace('/')
                }

                $('#post').innerHTML = template.issue(res[0].data)
                document.title = res[0].data.title +' - '+ title
                ready()
            }).catch(err => location.replace('/'))
        } else {
            document.title = title
            get_issues()
        }
    }

    start()

    $('#next').addEventListener('click', (e) => {
        page += 1
        e.target.setAttribute('disabled', true)
        get_issues()
    })

    $('#prev').addEventListener('click', (e) => {
        page -= 1
        $('#posts').innerHTML = template.issues(clone(issues_data).splice((page - 1) * per_page, per_page))
        ifPager()
    })

    window.addEventListener('hashchange', () => {
        const hash = location.hash.split('#')[1]

        if (!hash && current == 'single') {
            return location.href = '/'
        }

        if (hash) {
            $('.sandbox').classList.remove('active')

            const issue = issues_data.find(issue => issue.number == hash)

            if (!issue) {
                return location.replace('/')
            }

            $('#post').innerHTML = template.issue(issue)
            document.title = issue.title +' - '+ title
            scrollY = window.scrollY

            let time = 0

            if (scrollY > 0) {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' }) 
                time = 500
            }

            setTimeout(() => { 
                $('.left').style.display = 'none'
            }, (time + 500))

            setTimeout(() => { 
                $('.container').classList.remove('single')
                $('.container').classList.add('post')
            }, time)
        } else {
            document.title = title
            $('.left').style.display = 'block'

            setTimeout(() => {
                $('#post').innerHTML = ''
                window.scroll({ top: scrollY, left: 0, behavior: 'smooth' })
            }, 500)

            $('.container').classList.remove('post')
            $('.container').classList.add('single')
            box()
        }
    })

    $('.right').addEventListener('click', (e) => {
        e = e.target

        if (!e.classList.contains('comment')) {
            return
        }

        e.setAttribute('disabled', true)

        load({ url: api.COMMENTS(user, repo, e.getAttribute('data-id')) }).then(res => {
            const pnd = e.parentNode

            pnd.removeChild(e)
            pnd.innerHTML += template.comments(res[0].data)
        })
    })

    $('#close').addEventListener('click', () => {
        $('.sandbox').classList.remove('active')
    })

    $('#sandbox').addEventListener('click', () => {
        window.scrollTo(0, 0)
        $('.sandbox').style.height = `${window.innerHeight}px`
        $('.sandbox').classList.add('active')
    })

    $('#form').addEventListener('submit', function(e) {
        e.preventDefault()

        const _title = this.title.value
        const _user = this.user.value
        const _repo = this.repo.value
        const _authors = this.authors.value || ''
        const _per_page = this.per_page.value

        if (!_title || !_user || !_repo || !_per_page) {
            return alert('Missing configuration information')
        }

        this.submit.setAttribute('disabled', true)

        title = _title
        user = _user
        repo = _repo
        per_page = _per_page

        window.config = {
            title: _title,
            user: _user,
            repo: _repo,
            per_page: _per_page,
            token: '',
            authors: _authors,
            sandbox: true
        }

        start()
    })

    document.body.addEventListener('click', (e) => {
        const { target } = e
        const { tagName, src, className } = target

        if (!location.hash) {
            return
        }

        if (className == 'box' || target.parentNode.className == 'box') {
            return box()
        }

        if (window.innerWidth < 600 || tagName != 'IMG') {
            return
        }

        e.preventDefault()
        box(src)
    })

    window.ontouchmove = function(e) {
        if ($('.sandbox').classList.contains('active')) {
            e.preventDefault()
        }
    }
})

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
