import { request } from '@/plugins/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
// 获取关注用户文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}
// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}
// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 创建文章
export const createArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 更新文章
export const updateArticle = data => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加文章评论
export const addArticleComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除文章评论
export const deleteArticleComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}
