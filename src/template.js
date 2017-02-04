
import { timeFormat } from './util'

import icon_email from './svg/email.svg'
import icon_link from './svg/link.svg'
import icon_github from './svg/github.svg'

const { user, repo } = window.config

export default {

    issues(data) {
        let issues = ''

        for (let i = 0; i < data.length; i ++) {
            const number = data[i].number
            const title = data[i].title
            const time = timeFormat(data[i].updated_at)

            issues += `
                <a href="#${number}">
                    <h1>${title}</h1>
                    <p>Updated at<span>${time}</span></p>
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
                        <span>${timeFormat(updated_at)}</span>
                        <div class="markdown-body">${body_html}</div>   
                    </div>
                </li>
            ` 
        }

        return `<ul class="comment_list">${comments}</ul><a target="_blank" class="button" href="${issue_url}#new_comment_field">Add Comment</a>`
    },

    user(data) {
        const { html_url, blog, email, avatar_url, name, bio } = data

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
            <h1>${name}</h1>
            ${about}
            <div>${social}</div>
        `
    },

    issue(data) {
        if (!data) {
            return ''
        }

        const { labels, number, html_url, comments, title, updated_at, body_html } = data
        let comment = `<a class="button" href="${html_url}#new_comment_field" target="_blank">Add Comment</a>`
        let labels_html = ''
        let issue = ''

        for (let i = 0; i < labels.length; i ++) {
            const { color, name } = labels[i]

            labels_html += `<a target="_blank" href="https://github.com/${user}/${repo}/labels/${name}" style="background:#${color}">#${name}</a>`
        }

        if (labels_html) {
            labels_html = `<div class="labels">${labels_html}</div>`
        }

        if (comments > 0) {
            comment = `<button class="comment button" data-id="${number}">View Comments</button>` 
        }

        issue = `
            <h1>${title}</h1>
            <p>Updated at<span>${timeFormat(updated_at)}</span></p>
            ${labels_html}
            <div class="markdown-body">${body_html}</div>
        `

        return issue + comment
    } 

}
