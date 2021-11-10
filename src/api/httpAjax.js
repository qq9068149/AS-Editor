import axios from "axios"
import Qs from "qs"
import { Message } from 'element-ui';
// 请求封装
export default function httpAjax (config) {
    return new Promise((resolve, reject) => {
        const method = config.method ? config.method.toLowerCase() : "get"
        if(!config.data) config.data = {}
        if(['delete', 'get', 'head', 'options'].some(item => item === method)) {
            config.params = config.data
            delete config.data
        }else if (config.header === "form" && ['post', 'put', 'patch'].some(item => item === method)) config.data = Qs.stringify(config.data)
        // 响应拦截
        axios(config).then(response => {
          if(!response.data.success) return Message.success('测试环境');
          resolve(response.data)
        }).catch( error => reject(error))
    })
}

