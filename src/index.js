
import * as api from './api'
import template from './template'
import { load, $ } from './util'

import './index.scss'
import icon_back from './svg/back.svg'

import 'core-js/fn/array/find'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

document.addEventListener('DOMContentLoaded', function() {
    const { title, user, repo, per_page } = window.config

    if (!title || !user || !repo || !per_page) {
        return alert('Missing configuration information')
    }

    let issues_data = []
    let page = 1
    let current = 'list'
    let scrollY = 0

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
            data: { creator: user, page, per_page }
        }

        const _user = { url: api.USER(user) }

        const build_list = (res) => {
            const { headers: { link }, data } = res
            $('#posts').innerHTML += template.issues(data)

            issues_data = issues_data.concat(data)

            if (!link || link.indexOf('rel="next"') == -1) {
                return $('#next').style.display = 'none'
            }
                
            $('#next').removeAttribute('disabled')
            page ++    
        }

        const build_user = (res) => {
            $('#user').innerHTML = template.user(res.data)
        }

        if (page == 1) {
            load(_issues, _user).then(res => {
                build_list(res[0])
                build_user(res[1])
                ready()
            })
        } else {
            load(_issues).then(res => build_list(res[0]))
        }
    }

    if (location.hash) {
        current = 'single'
        const hash = location.hash.split('#')[1]

        load({ url: api.ISSUE(user, repo, hash) }).then(res => {
            $('#post').innerHTML = template.issue(res[0].data)
            document.title = res[0].data.title +' - '+ title

            ready()
        })
    } else {
        document.title = title

        get_issues()
    }

    $('#next').addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true)
        get_issues()
    })

    window.addEventListener('hashchange', () => {
        const hash = location.hash.split('#')[1]

        if (!hash && current == 'single') {
            return location.href = '/'
        }

        if (hash) {
            const issue = issues_data.find(issue => issue.number == hash)
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

})

console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/LoeiFy/Mirror")
