/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-10 20:24:29
 * @FilePath: /BLOG/src/router/index.ts
 */
import Layout from '@/Layout/index.vue';
import { getBackstageurl } from '@/utils/common';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';

/**
 *  @description: 路由对象参数说明
 *  path: 路由路径，必填
 *  name: 路由名称，必填
 *  meta: 路由元信息，必填
 *  meta.title: 路由标题，必填
 *  meta.img: 路由图片，非必填 优先级 1
 *  meta.textIcon: 路由文字图标，非必填 优先级 2
 *  meta.icon: 路由图标，非必填 优先级 3
 *  meta.isHidden: 是否隐藏路由，非必填 默认 false
 *  component: 路由组件，必填
 *  redirect: 重定向，非必填
 *  children: 子路由，非必填
 */
export const routes = [
  {
    path: '',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'icon-shouye',
      textIcon: '🏡'
    },
    component: Home,
    children: [
      {
        path: '/start',
        name: 'View',
        meta: {
          title: '起始页',
          textIcon: '🚀'
        },
        component: null
      }
    ]
  },
  {
    path: '/start',
    name: 'Start',
    isHidden: true,
    meta: {
      title: '起始页',
      textIcon: '🚀'
    },
    component: () => import('../views/start/index.vue')
  },
  {
    path: '/article',
    name: 'Article',
    meta: {
      title: '文章',
      icon: 'icon-guidang',
      textIcon: '📝'
    },
    redirect: { name: 'FrontEnd', query: { type: '1' } },
    children: [
      {
        path: '/article/share',
        name: 'FrontEnd',
        meta: {
          title: '前端',
          img: 'html5.svg',
          textIcon: '🎨',
          icon: 'icon-qianduan',
          query: {
            type: '1'
          }
        },
        component: () => import('../views/article/index.vue')
      },
      {
        path: '/article/share',
        name: 'BackEnd',
        meta: {
          title: '后端',
          icon: 'icon-Nodejs',
          img: 'Nodejs.png',
          query: {
            type: '2'
          }
        },

        component: () => import('../views/article/index.vue')
      },
      {
        path: '/article/share',
        name: 'Other',
        meta: {
          title: '其他分享',
          icon: 'icon-zonghecaiwu',
          textIcon: '📚',
          query: {
            type: '3'
          }
        },
        component: () => import('../views/article/index.vue')
      },
      {
        path: '/article/detail',
        name: 'Detail',
        meta: {
          title: '详情',
          icon: 'icon-fenxiang',
          textIcon: '🔗'
        },
        isHidden: true,
        component: () => import('../views/article/detail.vue')
      },
      {
        path: '/article/preview',
        name: 'View',
        meta: {
          title: '预览',
          icon: 'icon-fenxiang',
          textIcon: '🔗'
        },
        isHidden: true,
        component: () => import('../views/article/preview.vue')
      },
      {
        path: '/article/write',
        name: 'Write',
        meta: {
          title: '写作',
          icon: 'icon-fenxiang',
          textIcon: '✍️'
        },
        isHidden: true,
        component: Home
      }
    ]
  },
  {
    path: '/play',
    name: 'List',
    meta: {
      title: '娱乐',
      icon: 'icon-yule',
      textIcon: '🏖️'
    },
    redirect: { name: 'Mp3' },
    children: [
      {
        path: '/play/mp3',
        name: 'Mp3',
        meta: {
          title: '音乐',
          icon: 'icon-a-Sheetmusic',
          textIcon: '🎧'
        },
        component: () => import('@/views/play/music/index.vue')
      }
      // {
      //   path: '/play/mp4',
      //   name: 'Mp4',
      //   meta: {
      //     title: '影视',
      //     icon: 'icon-shipin'
      //   },
      //   component: () => import('@/views/play/video/index.vue')
      // }
      // {
      //   path: '/play/game',
      //   name: 'Game',
      //   meta: {
      //     title: '小游戏',
      //     icon: 'icon-yuleAPP'
      //   },
      //   component: () => import('@/views/play/game/index.vue')
      // }
    ]
  },
  {
    path: '/msg-board',
    name: 'MsgBoard',
    meta: {
      title: '留言板',
      icon: 'icon-liuyanban-xian',
      textIcon: '📪'
    },
    component: () => import('../views/msgBorad/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于',
      icon: 'icon-guanyu',
      img: 'about.svg'
    },
    redirect: { name: 'Me' },
    children: [
      {
        path: '/about/me',
        name: 'Me',
        meta: {
          title: '本大大',
          icon: 'icon-guanyu',
          img: 'me.png'
        },
        component: () => import('../views/about/me/index.vue')
      },
      {
        path: '/about/zone',
        name: 'Zone',
        meta: {
          title: '随笔',
          icon: 'icon-guanyu',
          // img: 'pengyouquan.png',
          textIcon: '📒'
        },
        component: () => import('../views/about/zone/index.vue')
      },
      {
        path: '/about/friends',
        name: 'Friends',
        meta: {
          title: '友情链接',
          icon: 'icon-guanyu1',
          textIcon: '🔗'
        },
        component: () => import('../views/about/friends/index.vue')
      }
    ]
  },
  {
    link: getBackstageurl() + '/view',
    path: '',
    name: 'Backstage',
    meta: {
      title: '后台管理',
      icon: 'icon-guanyu',
      textIcon: '🍀'
    },
    component: null
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
