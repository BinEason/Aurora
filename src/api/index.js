import request from '../utils/request'

export const loginAPI = (params) => {
  return request({
    url: '/users/login',
    method: 'POST',
    data: params,
    mock: false

  })
}