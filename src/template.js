
import { timeFormat } from './util'

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
                    <a href="${html_url}">
                        <img src="${avatar_url}" />
                    </a>
                    <div>
                        <a target="_blank" href="http://github.com/${login}">${login}</a>
                        <span>commented on ${timeFormat(updated_at)}</span>
                        <p>${body_html}</p>   
                    </div>
                </li>
            ` 
        }

        return `<ul>${comments}</ul><a href="${issue_url}#new_comment_field">Add Comment</a>`
    },

    user(data) {
        const { html_url, blog, email, avatar_url, name } = data

        let social = `<a target="_blank" class="icon-github" href="${html_url}"></a>`

        if (blog) {
            social += `<a target="_blank" class="icon-link" href="${blog}"></a>`
        }

        if (email) {
            social += `<a target="_blank" class="icon-email" href="mailto:${email}"></a>`
        }

        return `
            <img src="${avatar_url}" />
            <h1>${name}</h1>
            <div>${social}</div>
        `
    },

    issue(data) {
        if (!data) {
            return ''
        }

        const { labels, number, html_url, comments, title, updated_at, body_html } = data
        let comment = `<a class="comment" href="${html_url}#new_comment_field" target="_blank">Add Comment</a>`
        let labels_html = ''
        let issue = ''

        for (let i = 0; i < labels.length; i ++) {
            const { color, name } = labels[i]

            labels_html += `<span style="background:#${color}">#${name}</span>`
        }

        if (comments > 0) {
            comment = `<button class="comment" data-id="${number}">View Comments</button>` 
        }

        issue = `
            <h1>${title}</h1>
            <p>Updated at<span>${timeFormat(updated_at)}</span></p>
            <div class="markdown-body">${body_html}</div>
        `

        return issue + labels_html + comment
    } 

}
