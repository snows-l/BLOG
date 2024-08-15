/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 20:01:43
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 20:14:23
 * @FilePath: /BLOG/src/store/index.ts
 */
import { createPinia } from 'pinia';
// 持久化
import piniaPersist from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPersist);

export default store;
