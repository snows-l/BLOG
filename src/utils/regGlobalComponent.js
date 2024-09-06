/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-05 21:55:11
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 16:33:04
 * @FilePath: /blog/src/utils/reg.js
 */
export const globalIcon = {
  install(Vue) {
    /*webpack写法
      let allCom = require.context('./', false, /\.vue$/)
      */
    const requireComponent = import.meta.glob('../components/icon/*.vue');
    for (const path in requireComponent) {
      requireComponent[path]().then(module => {
        // 获取组件配置
        const component = module.default;
        // 使用组件的文件名（去掉路径和扩展名）作为组件名
        const componentName =
          'Icon' +
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        // 注册为全局组件
        Vue.component(componentName, component);
      });
    }
  }
};

// 注册全局组件
export const globalComponent = {
  install(Vue) {
    /*webpack写法
      let allCom = require.context('./', false, /\.vue$/)
      */
    const requireComponent = import.meta.glob('../components/common/*.vue');
    for (const path in requireComponent) {
      requireComponent[path]().then(module => {
        // 获取组件配置
        const component = module.default;
        // 使用组件的文件名（去掉路径和扩展名）作为组件名
        const componentName = path
          .split('/')
          .pop()
          .replace(/\.\w+$/, '');
        // 注册为全局组件
        Vue.component(componentName, component);
      });
    }
  }
};
