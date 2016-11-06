
import config from './config'
import * as api from './api'
import template from './template'
import { load } from './util'

window.addEventListener('DOMContentLoaded', function() {

    const { user, repo, per_page, about } = config

    load(
        { 
            url: api.ISSUES(user, repo),
            data: { creator: user, page: 1, per_page }  
        },
        {
            url: api.USER(user),
            data: {}
        }
    )

})
