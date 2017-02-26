
import axios from 'axios'

axios.defaults.headers.Accept = 'application/vnd.github.v3.html'

const loadurl = ({url, data = {} }) => {
    if (window.config.token) {
        data.access_token = window.config.token.split('#').join('')
    }

    return url +'?'+ Object.keys(data).map(key => key +'='+ data[key]).join('&')
}

export const timeFormat = (time) => time.split('T')[0]

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

// http://jsfiddle.net/salman/f9Re3/
export const invert = (color) => {
    color = parseInt(color, 16)
    color = 0xFFFFFF ^ color
    color = color.toString(16)
    color = `000000${color}`.slice(-6)

    return color
}