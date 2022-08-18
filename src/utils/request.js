import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
// import router from '../router'
const NET_Error = "网络异常"

const server = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

//请求拦截
server.interceptors.request.use((req) => {
    const headers = req.headers
    if (!headers.Authorization) headers.Authorization = 'Bear CGB'

    return req;
})


//响应拦截
server.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    }
    else if (code === 50001) {
        ElMessage.error(msg)
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
    if (typeof options.mock !== 'undefined') {
        config.mock = options.mock
    }
    if (config.env === 'prod') {
        server.defaults.baseURL = config.baseApi
    } else {
        server.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return server(options)
}
export default request