/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-11 12:04:39
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-11 12:56:33
 * @FilePath: /BLOG/src/api/article.js
 */
import request from '@/utils/request';

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: '/sys/article/list',
    method: 'get',
    params: data
  });
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: '/sys/article/detail/' + id,
    method: 'get'
  });
}

// 新增评论数量
export function addCommentCount(id) {
  return request({
    url: '/sys/article/commentCount',
    data: {
      id: id
    },
    method: 'put'
  });
}

// 新增分享次数
export function addShareCount(id) {
  return request({
    url: '/sys/article/shareCount',
    data: {
      id: id
    },
    method: 'put'
  });
}
