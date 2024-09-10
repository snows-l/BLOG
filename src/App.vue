<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-10 20:27:05
 * @FilePath: /BLOG/src/App.vue
-->

<template>
  <RouterView />
</template>

<script setup lang="ts">
import { setDocmentTitle } from '@/utils/common';
import { setPrimaryColor } from '@/utils/theme';
import { onMounted, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { routes } from './router/index';

const route = useRoute();
let routesList = [];
routes.forEach(item => {
  if (item.children) {
    item.children.forEach(child => {
      routesList.push(child);
    });
  } else {
    routesList.push(item);
  }
});

if (localStorage.getItem('primaryColor')) {
  setPrimaryColor(localStorage.getItem('primaryColor'));
}

watch(
  () => route.path,
  n => {
    let title = '';
    for (let i = 0; i < routesList.length; i++) {
      if (routesList[i].path === n) {
        title = routesList[i].meta.title;
        break;
      }
    }
    if (title === '') title = '首页';
    setDocmentTitle('☂ ' + title + ' | ' + import.meta.env.VITE_API_TITLE);
  }
);

onMounted(() => {
  // 移除首屏加载动画
  if (document.getElementById('Loading')) document.getElementById('Loading').remove();
});
</script>

<style lang="scss" scoped></style>
