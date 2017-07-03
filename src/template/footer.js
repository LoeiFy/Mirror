const { title, user, repository } = window.config
const footer = `
  <div id="footer">
    &copy; ${(new Date()).getFullYear()} ${title}. Powered width GitHub by
    <a href="https://github.com/LoeiFy/Mirror" target="_blank">Mirror</a> .
    <a href="https://github.com/${user}/${repository}/issues" target="_blank">Source</a>
  </div>
`

export default footer
