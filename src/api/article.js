/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-11 12:04:39
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-01 15:10:29
 * @FilePath: /BLOG/src/api/article.js
 */
import request from '@/utils/request';

// 获取文章列表
export function getArticleList(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params: data
  });
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: '/article/detail/' + id,
    method: 'get'
  });
}

// 新增评论数量
export function addCommentCount(id) {
  return request({
    url: '/article/commentCount',
    data: {
      id: id
    },
    method: 'put'
  });
}

// 新增分享次数
export function addShareCount(id) {
  return request({
    url: '/article/shareCount',
    data: {
      id: id
    },
    method: 'put'
  });
}

// 预览文章的html代码
export function previewArticleCodeToHtml(id) {
  return request({
    url: '/article/preview/' + id,
    method: 'get'
  });
}
