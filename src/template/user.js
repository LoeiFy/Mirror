import icon_email from '../svg/email.svg'
import icon_link from '../svg/link.svg'
import icon_github from '../svg/github.svg'

class User {
  constructor(props) {
    this.user = props
  }

  get email() {
    return this.user.email ?
    `<a target="_blank" href="mailto:${this.user.email}">${icon_email}</a>` : ''
  }

  get website() {
    return this.user.websiteUrl ?
    `<a target="_blank" href="${this.user.websiteUrl}">${icon_link}</a>` : ''
  }

  get bio() {
    return this.user.bio ? `<p>${this.user.bio}</p>` : ''
  }

  render() {
    return `
      <img src="${this.user.avatarUrl}" />
      <h1>${this.user.name || this.user.login}</h1>
      ${this.bio}
      <div class="social">
        <a target="_blank" href="${this.user.url}">${icon_github}</a>
        ${this.website}
        ${this.email}
      </div>
    `
  }
}

export default User