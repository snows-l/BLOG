/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-03-24 10:22:55
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-28 19:45:44
 * @FilePath: /BLOG/src/store/app.js
 */

import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      articleDict: [],
      musicDict: [],
      musicList: [],
      isFullSreen: false
    };
  },

  actions: {
    // 设置文章字典
    SET_ARTICLE_DICT(payload) {
      this.articleDict = payload;
    },
    // 设置音乐字典
    SET_MUSIC_DICT(payload) {
      this.musicDict = payload;
    },
    // 设置音乐列表
    SET_MUSIC_LIST(payload) {
      this.musicList = payload;
    },
    // 设置全屏状态
    SET_FULL_SCREEN(payload) {
      this.isFullSreen = payload;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: '_LOCAL_APP',
        storage: localStorage,
        paths: ['articeDict', 'musicDict', 'isFullSreen', 'musicList'] //指定要长久化的字段
      }
    ]
  }
});
