import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/user/userlist',
    method: 'post'
  })
}
