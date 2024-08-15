/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 20:55:34
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 20:56:18
 * @FilePath: /BLOG/src/api/common.js
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
