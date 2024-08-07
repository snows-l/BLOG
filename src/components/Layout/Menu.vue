<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 18:08:27
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-06 09:44:34
 * @FilePath: /blog/src/components/Layout/Menu.vue
-->
<template>
  <ul class="nav-list-warp nav-list">
    <template v-for="menus in menuList" :key="menus.path">
      <template v-if="menus.children">
        <div class="nav-has-sub-warp" @mouseenter="handleHover(menus.path)" @mouseleave="handleHover('')">
          <li class="nav-item nav-item-sub">{{ menus.meta.title }}</li>
          <ul class="nav-list-sub" :class="{ showList: state.showPath == menus.path }">
            <li v-for="menu in menus.children" :key="menu.path" class="nav-item" @mouseleave="handleHover('')">{{ menu.meta.title }}</li>
          </ul>
        </div>
      </template>
      <li v-else class="nav-item">{{ menus.meta.title }}</li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const props = defineProps({
  menuList: {
    type: Array,
    required: true,
    default: () => []
  }
});

const state = reactive({
  activeMemu: '',
  showPath: ''
});

const handleHover = (path: string) => {
  state.showPath = path;
};
</script>

<style lang="scss" scoped>
.nav-list-warp {
  display: flex;
  align-items: center;
  .nav-item {
    margin: 0 10px;
  }
  .nav-has-sub-warp {
    position: relative;

    .nav-list-sub {
      padding: 20px;
      position: absolute;
      top: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid #fff;
      border-radius: 10px;
      display: none;
    }
    .showList {
      display: block;
    }
  }
  // .nav-has-sub-warp:hover .nav-list-sub {
  //   display: block;
  // }
}
</style>
