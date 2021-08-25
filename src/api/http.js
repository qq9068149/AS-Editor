import axios from "axios"
import Qs from "qs"

// 请求封装
export default function httpAjax (config) {
    return new Promise((resolve, reject) => {
        const method = config.method ? config.method.toLowerCase() : "get"
        if(!config.data) config.data = {}
        if(['delete', 'get', 'head', 'options'].some(item => item === method)) {
            config.params = config.data
            delete config.data
        }else if (config.header === "form" && ['post', 'put', 'patch'].some(item => item === method)) config.data = Qs.stringify(config.data)
        axios(config).then(response => resolve(response.data)).catch( error => reject(error))
    })
}

