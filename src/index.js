
import config from './config'
import * as api from './api'
import template from './template'
import { load, $ } from './util'

document.addEventListener('DOMContentLoaded', function() {

    const { user, repo, per_page, about } = config
    let page = 1

    function get_issues() {
        const _issues = {
            url: api.ISSUES(user, repo),
            data: { creator: user, page, per_page }
        }

        const _user = {
            url: api.USER(user),
            data: {}
        }

        const build_list = (res) => {
            const { headers: { link }, data } = res
            $('#posts').innerHTML += template.issues(data)

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

    if (!location.hash) {
        get_issues()
    }

    $('#next').addEventListener('click', (e) => {
        e.target.setAttribute('disabled', true)
        get_issues()
    })

})
