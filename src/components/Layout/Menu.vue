<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 18:08:27
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-08 17:21:04
 * @FilePath: /blog/src/components/Layout/Menu.vue
-->
<template>
  <ul class="nav-list-warp nav-list" v-if="!isMobile">
    <template v-for="menus in menuList" :key="menus.path">
      <template v-if="menus.children">
        <li class="nav-item pointer one-level">
          <span @click="handleTo(menus)">
            <i class="iconfont" :class="menus.meta.icon"></i>
            <span>{{ menus.meta.title }}</span>
          </span>
          <ul class="nav-list-sub-contetn">
            <li class="nav-item-sub nav-item pointer" v-for="menu in menus.children" :key="menu.path" @click="handleTo(menu)">
              <i class="iconfont" :class="menu.meta.icon"></i>
              <span>{{ menu.meta.title }}</span>
            </li>
          </ul>
        </li>
      </template>
      <li v-else class="nav-item one-level" @click="handleTo(menus)">
        <i class="iconfont" :class="menus.meta.icon"></i>
        <span>{{ menus.meta.title }}</span>
      </li>
    </template>
  </ul>
  <ul class="m-nav-list-warp" v-else>
    <template v-for="menus in menuList" :key="menus.path">
      <template v-if="menus.children">
        <li class="nav-item pointer one-level">
          <span>
            <i class="iconfont" :class="menus.meta.icon"></i>
            <span>{{ menus.meta.title }}</span>
          </span>
          <ul class="m-nav-list-sub-contetn">
            <li class="nav-item-sub nav-item pointer" v-for="menu in menus.children" :key="menu.path" @click="handleTo(menu)">
              <i class="iconfont" :class="menu.meta.icon"></i>
              <span>{{ menu.meta.title }}</span>
            </li>
          </ul>
        </li>
      </template>
      <li v-else class="nav-item one-level" @click="handleTo(menus)">
        <i class="iconfont" :class="menus.meta.icon"></i>
        <span>{{ menus.meta.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const props = defineProps({
  menuList: {
    type: Array,
    required: true,
    default: () => []
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['menu-change']);

const router = useRouter();

const state = reactive({
  activeMemu: '',
  showPath: ''
});

const handleTo = item => {
  router.push({
    path: item.path || '/',
    query: item.query
  });
  emits('menu-change');
};
</script>

<style lang="scss" scoped>
.nav-list-warp {
  height: 100%;
  display: flex;
  align-items: center;
  span {
    text-wrap: nowrap;
  }
  .one-level:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0%;
    border-radius: 3px;
    background-color: var(--theme-color);
    transition: width 0.5s ease-in;
  }
  .one-level:hover::after {
    width: 101%;
  }
  .nav-item {
    height: 100%;
    margin: 0 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--text-color);
    transition: color 0.3s ease, dispay 0.3s ease;
    .iconfont {
      margin-right: 10px;
    }
    &:hover {
      color: var(--theme-color);
    }
    .nav-list-sub-contetn {
      padding: 10px 0;
      border-radius: 5px;
      position: absolute;
      display: none;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      background-color: var(--bg-warp-color);
      transition: display 0.3s ease;
      &:before {
        content: '';
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent var(--bg-warp-color) transparent;
      }

      .nav-item-sub {
        padding: 10px 15px;
        color: var(--text-color);
        &:hover {
          color: var(--theme-color);
        }
      }
    }
  }
  .nav-item:hover {
    .nav-list-sub-contetn {
      display: block;
    }
  }
}

.m-nav-list-warp {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 20px;
  .nav-item {
    margin: 15px 0;
    color: var(--text-color);
    &:hover {
      color: var(--theme-color);
    }
    .iconfont {
      margin-right: 10px;
    }
  }
  .nav-item-sub {
    margin-left: 20px;
    color: #629294;
  }
}
</style>
