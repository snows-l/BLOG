/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-20 14:15:16
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-30 23:51:08
 * @FilePath: /BLOG/src/api/friend.js
 */
import request from '@/utils/request';
// 获取音乐
export function getFriendLindList(data) {
  return request({
    url: '/friendLink/list',
    method: 'get',
    params: data
  });
}
