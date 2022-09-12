import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
const NET_Error = "网络异常"

const server = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

//请求拦截
server.interceptors.request.use((req) => {
    const headers = req.headers
    const { token } = JSON.parse(localStorage.getItem('cgb'))

    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token

    return req;
})


//响应拦截
server.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    }
    else if (code === 500001) {
        ElMessage.error(msg)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(msg)
    }
    else {
        ElMessage.error(msg || NET_Error)
        return Promise.reject(msg || NET_Error)
    }

})
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    let ismock = config.mock
    if (typeof options.mock !== 'undefined') {
        ismock = options.mock
    }
    if (config.env === 'prod') {
        server.defaults.baseURL = config.baseApi
    } else {
        server.defaults.baseURL = ismock ? config.mockApi : config.baseApi
    }
    return server(options)
}
export default request