/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-18 18:48:08
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-18 18:48:27
 * @FilePath: /BLOG/src/api/zone.js
 */
import request from '@/utils/request';

// 获取文章列表
export function getZoneList(data) {
  return request({
    url: '/sys/zone/list',
    method: 'get',
    params: data
  });
}
