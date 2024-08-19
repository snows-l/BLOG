<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-19 18:55:09
 * @FilePath: /BLOG/src/views/about/friends/index.vue
-->
<template>
  <div class="friends-container-warp">
    <PageTopCover :moduleTitle="'友情链接'" :icon="'icon-guanyu'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="friends-container" :class="{ 'm-friends-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="wecom">
          <div class="wecom-title">欢迎互换友链(请前往留言板留言)，友链格式如下：</div>

          <div class="wecom-content">
            <div class="wecom-item">
              <label for="">名称：</label>
              <span>snows_l's blog</span>
            </div>
            <div class="wecom-item">
              <label for="">简介：</label>
              <span>渔得鱼心满意足，樵得樵眼笑眉舒！</span>
            </div>
            <div class="wecom-item">
              <label for="">地址：</label>
              <span>http://124.223.41.220/view</span>
            </div>
            <div class="wecom-item">
              <label for="">LOGO：</label>
              <span>http://124.223.41.220/logo.png</span>
              <span style="margin-left: 5px; color: #ccc">（qq号将同步qq头像）</span>
            </div>
          </div>
        </div>

        <div class="shengming-warp">
          <div class="item-1" style="margin-bottom: 20px">❌经常宕机 ❌不合法规 ❌插边球站 ❌红标报毒 ✅原创优先 ✅技术优先</div>
          <div class="item-2">欢迎👏来到我的博客，这里是我的友情链接，你可以在这里找到我感兴趣的网站，欢迎交换友链，共同进步！</div>
        </div>

        <div class="friend-list-warp">
          <div class="friend-list">
            <div class="friend-item pointer" @click="handleTo(item)" v-for="(item, index) in state.friendList" :key="index">
              <div class="friend-item-img">
                <img :src="item.logo" alt="" />
              </div>
              <div class="friend-item-title">
                <ToolTip :content="item.name">{{ item.name }}</ToolTip>
              </div>
              <div class="friend-item-content">
                <ToolTip :content="item.desc">{{ item.desc }}</ToolTip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import coverImg from '@/assets/images/bg/cover-friends.png';
import useResize from '@/hooks/useResize';
import { getQQAvatar } from '@/utils/common';
import { reactive } from 'vue';
const { isMobi } = useResize();

const state = reactive({
  friendList: [
    {
      name: "Snows_l's Blog",
      desc: '渔得鱼心满意足，樵得樵眼笑眉舒！',
      logo: getQQAvatar(),
      link: 'http://124.223.41.220:30002'
    },
    {
      name: "Snows_l's 后台管理",
      desc: '划船不用浆、一生全靠浪!',
      logo: 'http://124.223.41.220:3333/imgs/avatars/avatar_20240620112452.png',
      link: 'http://124.223.41.220/view'
    },
    {
      name: 'zs.duan的个人博客',
      desc: '一个不止会前端的瘦子!',
      logo: getQQAvatar('1637833822'),
      link: 'https://anran233.com/'
    },
    {
      name: "Miraitowa's Blog",
      desc: '消极懈怠，只会与机会擦肩而过；积极主动，生活才会一路向上。',
      logo: getQQAvatar('1835110799'),
      link: 'http://124.223.41.220:30003'
    }
  ]
});

const handleTo = item => {
  window.open(item.link, '_blank');
};
</script>

<style lang="scss" scoped>
.friends-container-warp {
  width: 100%;
  height: 100%;
  .friends-container {
    width: 100%;
    height: 100%;
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .center-max-width-warp {
      height: 100%;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .wecom {
        width: 100%;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        background-color: var(--bg-content-color);
        .wecom-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 20px;
          color: var(--text-color);
        }
        .wecom-content {
          padding: 0 40px;
          .wecom-item {
            margin: 10px 0;
            color: var(--text-color);
            font-size: 12px;
          }
        }
      }
      .shengming-warp {
        font-size: 16px;
        margin: 26px 0;
        div {
          line-height: 24px;
          color: var(--text-color);
        }
      }
      .friend-list-warp {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--bg-content-color);
        border-radius: 10px;
        .friend-list {
          display: flex;
          flex-wrap: wrap;
          .friend-item {
            border-radius: 10px;
            width: 160px;
            padding: 8px 20px;
            background-color: var(--bg-content-color);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 8px;
            .friend-item-img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              overflow: hidden;
              transition: all 1.2s ease-in-out;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
              }
              &:hover {
                border: 1px solid var(--theme-color);
                transform: rotate(360deg);
              }
            }
            .friend-item-title {
              font-size: 16px;
              font-weight: bold;
              margin-top: 10px;
              text-align: center;
              color: var(--text-color);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; /* 定义文本的行数 */
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .friend-item-content {
              font-size: 12px;
              line-height: 18px;
              font-weight: bold;
              margin-top: 10px;
              color: var(--text-color);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; /* 定义文本的行数 */
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .m-friends-container {
    .center-max-width-warp {
      width: 96% !important;
      .friend-list {
        justify-content: space-between !important;
      }
    }
  }
}
</style>
