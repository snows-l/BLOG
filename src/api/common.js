/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 20:55:34
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-30 23:51:04
 * @FilePath: /BLOG/src/api/common.js
 */
import request from '@/utils/request';

// 获取字典
export function getDict(data) {
  return request({
    url: '/dict/list',
    method: 'get',
    params: data
  });
}

// 新增博客访问量
export function addBlogVisit(data) {
  return request({
    url: '/blog/visit/add',
    method: 'get',
    params: data
  });
}

// 获取博客访问量
export function getBlogVisit() {
  return request({
    url: '/blog/visit/total',
    method: 'get'
  });
}
