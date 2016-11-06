
import config from './config'
import * as api from './api'
import template from './template'
import { load, $ } from './util'

import 'core-js/fn/array/find'

document.addEventListener('DOMContentLoaded', function() {

    const { user, repo, per_page, about } = config
    let issues_data = []
    let page = 1

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
            })
        } else {
            load(_issues).then(res => build_list(res[0]))
        }
    }

    if (location.hash) {
        const hash = location.hash.split('#')[1]

        load({ url: api.ISSUE(user, repo, hash) }).then(res => {
            $('#post').innerHTML = template.issue(res[0].data)
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
        const issue = issues_data.find(issue => issue.number == hash)

        $('#post').innerHTML = template.issue(issue)
    })

    $('.container').addEventListener('click', (e) => {
        e = e.target

        if (!e.classList.contains('comment')) {
            return
        }

        e.setAttribute('disabled', true)

        load({ url: api.COMMENTS(user, repo, e.getAttribute('data-id')) }).then(res => {
            e.parentNode.innerHTML += template.comments(res[0].data)
        })
    })

})
