/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-06-17 12:24:28
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-10 01:00:13
 * @FilePath: /BLOG/src/api/music.js
 */
import request from '@/utils/request';

// 获取字典
export function getDict(data) {
  return request({
    url: '/sys/dict/list',
    method: 'get',
    params: data
  });
}

// 获取音乐
export function getMusicList(data) {
  return request({
    url: '/sys/musics/list',
    method: 'get',
    params: data
  });
}
