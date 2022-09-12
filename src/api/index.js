import request from '../utils/request'

//登录
export const loginAPI = (params) => {
  return request({
    url: '/users/login',
    method: 'POST',
    data: params,
    mock: false

  })
}

//审批数量
export const notCount = (params) => {
  return request({
    url: '/leave/count',
    method: 'GET',
    data: {},
    mock: false

  })
}
//获取导航列表
export const getMenuListAPI = (params) => {
  return request({
    url: '/menu/list',
    method: 'get',
    data: params,
    mock: false

  })
}
//获取权限导航
export const getPermissionListAPI = () => {
  return request({
    url: '/users/getPermissionList',
    method: 'get',
    data: {},
    mock: false

  })
}
//获取用户列表
export const getUserListAPI = (params) => {
  return request({
    url: '/users/list',
    method: 'get',
    data: params,
    mock: false
  })
}
//获取所有用户列表
export const getAllUserListAPI = () => {
  return request({
    url: '/users/all/list',
    method: 'get',
    data: {},
    mock: false
  })
}
//删除用户
export const deleteUserAPI = (params) => {
  return request({
    url: '/users/delete',
    method: 'post',
    data: params,
    mock: false

  })
}
//获取所有角色列表
export const getRoleListAPI = () => {
  return request({
    url: '/roles/allList',
    method: 'get',
    data: {},
    mock: false

  })
}
//获取部门列表
export const getDeptListAPI = (params) => {
  return request({
    url: '/dept/list',
    method: 'get',
    data: params,
    mock: false

  })
}
//提交新增
export const userCreateSubmitAPI = (params) => {
  return request({
    url: '/users/operate',
    method: 'post',
    data: params,
    mock: false

  })
}
//菜单提交
export const menuCreateSubmitAPI = (params) => {
  return request({
    url: '/menu/operate',
    method: 'post',
    data: params,
    mock: false

  })
}
//获取角色列表
export const getRoleAPI = (params) => {
  return request({
    url: '/roles/list',
    method: 'get',
    data: params,
    mock: false

  })
}
//创建修改删除角色
export const roleOperateAPI = (params) => {
  return request({
    url: '/roles/operate',
    method: 'post',
    data: params,
    mock: false

  })
}
//更新角色权限
export const updateRoleOperateAPI = (params) => {
  return request({
    url: '/roles/update/permission',
    method: 'post',
    data: params,
    mock: false

  })
}
//部门创建/编辑/删除
export const deptOperateAPI = (params) => {
  return request({
    url: '/dept/operate',
    method: 'post',
    data: params,
    mock: false

  })
}
//获取请假列表
export const getApplyListAPI = (params) => {
  return request({
    url: '/leave/list',
    method: 'get',
    data: params,
    mock: false

  })
}
//请假创建/编辑/删除
export const leaveOperateAPI = (params) => {
  return request({
    url: '/leave/operate',
    method: 'post',
    data: params,
    mock: false

  })
}
//审批
export const leaveApproveAPI = (params) => {
  return request({
    url: '/leave/approve',
    method: 'post',
    data: params,
    mock: false

  })
}
