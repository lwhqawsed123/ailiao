import request from '@/utils/request'
// 列表
export function list(data) {
  return request({
    url: '/union/incomeSupervise/ajaxsearch',
    method: 'GET',
    params: data
  })
}
