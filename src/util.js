
import axios from 'axios'
import config from './config'

axios.defaults.headers.Accept = 'application/vnd.github.v3.html'

const loadurl = ({url, data}) => {
    data.access_token = config.token

    return url +'?'+ Object.keys(data).map(key => key +'='+ data[key]).join('&')
}

export const timeFormat = (time) => time.split('T')[0]

export const load = (...args) => {
    const rqs = args.map(arg => axios.get(loadurl(arg)))

    return axios.all(rqs).then(axios.spread((...res) => {
        console.log(res)
    }))
}
