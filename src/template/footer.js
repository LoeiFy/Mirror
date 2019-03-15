import creator from '../helper/creator'

const { title, user, repository } = window.config
const footer = creator('div', {
  id: 'footer',
  innerHTML: `
    &copy; ${(new Date()).getFullYear()} ${title}. Powered by
    <a href="https://github.com/LoeiFy/Mirror" target="_blank">Mirror</a> .
    <a href="https://github.com/${user}/${repository}/issues" target="_blank">Source</a>
  `,
})

export default footer
