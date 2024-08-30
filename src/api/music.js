/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-06-17 12:24:28
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-30 23:51:11
 * @FilePath: /BLOG/src/api/music.js
 */

import request from '@/utils/request';
// 获取音乐
export function getMusicList(data) {
  return request({
    url: '/musics/list',
    method: 'get',
    params: data
  });
}
