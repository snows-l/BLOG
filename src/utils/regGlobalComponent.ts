/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-06 19:26:43
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 21:29:08
 * @FilePath: /BLOG/src/utils/regGlobalComponent.ts
 */
import type { App, AsyncComponentLoader } from 'vue';
import { defineAsyncComponent } from 'vue';
const globalIcons = import.meta.glob('../components/icon/*.vue'); //全局这个无论多少层级
const globalComponents = import.meta.glob('../components/common/*.vue'); //全局这个无论多少层级

/**
 * 全局组件引用管理
 */
export const globalIcon = {
  install(app: App) {
    for (const [key, value] of Object.entries(globalIcons)) {
      const name = 'Icon' + key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
    }
  }
};

export const globalComponent = {
  install(app: App) {
    for (const [key, value] of Object.entries(globalComponents)) {
      const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
    }
  }
};
