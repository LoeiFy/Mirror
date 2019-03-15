import emailIcon from '../svg/email.svg'
import linkIcon from '../svg/link.svg'
import githubIcon from '../svg/github.svg'
import $ from '../helper/query'

class User {
  constructor(selector) {
    this.container = $(selector)
    this.user = null
  }

  get email() {
    const email = this.user.email || this.user.organizationBillingEmail
    return email ? `<a target="_blank" href="mailto:${email}">${emailIcon}</a>` : ''
  }

  get website() {
    const { websiteUrl } = this.user

    if (!websiteUrl) {
      return ''
    }
    if (/^(http:|https:)/.test(websiteUrl)) {
      return `<a target="_blank" href="${websiteUrl}">${linkIcon}</a>`
    }

    return `<a target="_blank" href="//${websiteUrl}">${linkIcon}</a>`
  }

  get bio() {
    return this.user.bio ? `<p>${this.user.bio}</p>` : ''
  }

  render(userData) {
    this.user = userData

    const {
      user,
      email,
      website,
      bio,
      container,
    } = this

    container.html(`
      <a href="#/">
        <img src="${user.avatarUrl}" />
      </a>
      <h1>${user.name || user.login}</h1>
      ${bio}
      <div class="social">
        <a target="_blank" href="${user.url}">${githubIcon}</a>
        ${website}
        ${email}
      </div>
    `)
  }
}

export default User
