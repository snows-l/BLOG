/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-05 21:55:11
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-05 22:01:30
 * @FilePath: /BLOG/src/utils/reg.js
 */
export default {
  install(Vue) {
    /*webpack写法
      let allCom = require.context('./', false, /\.vue$/)
      */
    let components = import.meta.glob('../components/icon/**/*.vue');
    Object.keys(components).forEach(async (path, index) => {
      const componentName = 'Icon' + path.split('/')[3];
      const component = await components[path]();
      Vue.component(componentName, component.default);
    });
  }
};
