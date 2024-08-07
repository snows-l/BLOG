/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-06 10:44:37
 * @FilePath: /blog/src/router/index.ts
 */
import Layout from '@/components/Layout/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';

export const routes = [
  {
    path: '',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'icon-shouye'
    },
    component: Home
  },
  {
    path: 'article',
    name: 'Article',
    meta: {
      title: '归档',
      icon: 'icon-guidang'
    },
    component: Home,
    redirect: { name: 'Skill' },
    children: [
      {
        path: 'skill',
        name: 'Skill',
        meta: {
          title: '技术',
          icon: 'icon-jishufuwu'
        },
        component: Home
      },
      {
        path: 'share',
        name: 'Share',
        meta: {
          title: '分享',
          icon: 'icon-fenxiang'
        },
        component: Home
      },
      {
        path: 'sduty',
        name: 'Sduty',
        meta: {
          title: '教程',
          icon: 'icon-jiaocheng-3'
        },
        component: Home
      }
    ]
  },
  {
    path: 'list',
    name: 'List',
    meta: {
      title: '清单',
      icon: 'icon-list6'
    },
    component: Home,
    children: [
      {
        path: 'mp4',
        name: 'Mp4',
        meta: {
          title: '影视',
          icon: 'icon-shipinyingshi'
        },
        component: Home
      },
      {
        path: 'mp3',
        name: 'Mp3',
        meta: {
          title: '音乐',
          icon: 'icon-fenxiang'
        },
        component: Home
      }
    ]
  },
  {
    path: 'about',
    name: 'About',
    meta: {
      title: '关于',
      icon: 'icon-guanyu'
    },
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Layout',
      component: Layout,
      children: [...routes]
    }
  ]
});

export default router;
