
import config from './config'
import * as api from './api'
import template from './template'
import { load, $ } from './util'

import './index.scss'
import icon_back from './svg/back.svg'

import 'core-js/fn/array/find'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

document.addEventListener('DOMContentLoaded', function() {

    const { user, repo, per_page, about } = config
    let issues_data = []
    let page = 1
    let current = 'list'

    function ready() {
        document.body.parentNode.classList.remove('loading')
        document.body.classList.add(current)
        $('.right').innerHTML += get_back()

        if (current == 'list') {
            $('.container').style.height = $('.left').offsetHeight +'px'
        } else {
            $('.container').style.height = $('.right').offsetHeight +'px'
        }
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
            $('.container').style.height = $('.left').offsetHeight +'px'

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
            ready()
        })
    } else {
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

            setTimeout(() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }, 600)

            $('.container').classList.remove('single')
            $('.container').classList.add('post')
            $('.container').style.height = $('.right').offsetHeight +'px'
        } else {
            $('#post').innerHTML = ''

            $('.container').classList.remove('post')
            $('.container').classList.add('single')
            $('.container').style.height = $('.left').offsetHeight +'px'
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

            $('.container').style.height = $('.right').offsetHeight +'px'
        })
    })

})
