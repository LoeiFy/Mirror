
import axios from 'axios'

// axios.defaults.headers.Accept = 'application/vnd.github.v3.html'
// axios.defaults.headers.Authorization = 'bearer tokenxxxxx'

const loadurl = ({url, data = {} }) => {
    if (window.config.token) {
        data.access_token = window.config.token.split('#').join('')
    }

    return url +'?'+ Object.keys(data).map(key => key +'='+ data[key]).join('&')
}

export const timeFormat = (time) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = new Date(time)
    const day = data.getDate()
    const monthIndex = data.getMonth()
    const year = data.getFullYear()
    return `${months[monthIndex]} ${day}, ${year}`
}

export const titleFormat = (title) => title.split(/\[.*?\]/g).join('')

export const load = (...args) => {
    const rqs = args.map(arg => axios.get(loadurl(arg)))
    return axios.all(rqs).then(axios.spread((...res) => res))
}

export const $ = (dom) => {
    dom = document.querySelectorAll(dom)

    if (dom.length > 1) {
        return dom
    }

    return dom[0]
}

export const clone = (o) => JSON.parse(JSON.stringify(o))

export const box = (src) => {
    if (!src) {
        const el = document.querySelector('.box')
        if (el) {
            return document.body.removeChild(el)
        }
        return
    }

    const tpl = `
        <div class="box">
            <img src="${src}" />
        </div>
    `

    document.body.innerHTML += tpl
}
