import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/user/userlist',
    method: 'post'
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/deluser',
    method: 'post',
    data: params
  })
}
