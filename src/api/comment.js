/*
 * @Description: ------------ fileDescription ---------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-13 19:49:23
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-31 20:48:58
 * @FilePath: /BLOG/src/api/comment.js
 */
import request from '@/utils/request';

// 获取评论列表
export function getCommentList(data) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: data
  });
}

// 获取评论列表
export function getCommentList2(data) {
  return request({
    url: '/comment/list2',
    method: 'get',
    params: data
  });
}

// 新增留言板
export function addComment(data) {
  return request({
    url: '/comment/add',
    method: 'post',
    data
  });
}
