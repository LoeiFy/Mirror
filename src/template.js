
import { timeFormat, titleFormat } from './util'

import icon_email from './svg/email.svg'
import icon_link from './svg/link.svg'
import icon_github from './svg/github.svg'

export default {

    issues(data) {
        let { authors, user } = window.config

        authors = authors || ''
        authors = authors.split(',').map(author => author.toString().toLowerCase().trim())
        authors.push(user.toLowerCase())

        data = data.filter(issue => {
            const { user: { login } } = issue
            return authors.indexOf(login.toLowerCase()) > -1
        })

        let issues = ''

        for (let i = 0; i < data.length; i ++) {
            const number = data[i].number
            const title = titleFormat(data[i].title)
            const time = timeFormat(data[i].updated_at)
            const labels = data[i].labels.map(label => {
                return `<em>#${label.name}</em>`
            }).slice(0, 3).join('')

            issues += `
                <a href="#${number}">
                    <h1>${title}</h1>
                    <div>${labels}</div>
                    <p>${time}</p>
                </a>
            `
        }

        return issues
    },

    comments(data) {
        let comments = ''
        let issue_url = data[0].html_url.split('#')[0]

        for (let i = 0; i < data.length; i ++) {
            const { body_html, updated_at, user: { html_url, login, avatar_url } } = data[i]

            comments += `
                <li>
                    <a class="author" href="${html_url}">
                        <img src="${avatar_url}" />
                    </a>
                    <div class="body">
                        <a target="_blank" href="http://github.com/${login}">${login}</a>
                        <span>on ${timeFormat(updated_at)}</span>
                        <div class="markdown-body">${body_html}</div>
                    </div>
                </li>
            `
        }

        return `<ul class="comment_list">${comments}</ul><a target="_blank" class="button" href="${issue_url}#new_comment_field">Add Comment</a>`
    },

    user(data) {
        const { html_url, blog, email, avatar_url, login, name, bio } = data

        let social = `<a target="_blank" href="${html_url}">${icon_github}</a>`
        let about = ''

        if (blog) {
            social += `<a target="_blank" href="${blog}">${icon_link}</a>`
        }

        if (email) {
            social += `<a target="_blank" href="mailto:${email}">${icon_email}</a>`
        }

        if (bio) {
            about = `<p>${bio}</p>`
        }

        return `
            <img src="${avatar_url}" />
            <h1>${name || login}</h1>
            ${about}
            <div>${social}</div>
        `
    },

    issue(data) {
        const { user, repo } = window.config

        if (!data) {
            return ''
        }

        const { number, html_url, comments, title, updated_at, body_html } = data
        let comment = `<a class="button" href="${html_url}#new_comment_field" target="_blank">Add Comment</a>`
        let issue = ''

        if (comments > 0) {
            comment = `<button class="comment button" data-id="${number}">View Comments</button>`
        }

        issue = `
            <h1>${titleFormat(title)}</h1>
            <p>Updated at<span>${timeFormat(updated_at)}</span></p>
            <div class="markdown-body">${body_html}</div>
        `

        return issue + comment
    }

}
