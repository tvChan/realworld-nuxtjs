import { request } from '@/plugins/request'

// 获取文章标签列表
export const getProfile = username => {
  console.log('username ======')
  console.log(username)
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}