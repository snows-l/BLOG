<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-10-01 15:11:34
 * @FilePath: /BLOG/src/views/about/friends/index.vue
-->
<template>
  <div class="friends-container-warp">
    <PageTopCover :moduleTitle="'友情链接'" :textIcon="'🔗'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
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
              <span>http://124.223.41.220</span>
            </div>
            <div class="wecom-item">
              <label for="">LOGO：</label>
              <span>http://124.223.41.220/logo.png</span>
              <span style="margin-left: 5px; color: #ccc">（qq号将同步qq头像）</span>
            </div>
          </div>
        </div>

        <div class="shengming-warp">
          <div class="item-1 text-shadow" style="margin-bottom: 20px">
            <span style="margin-left: 0">❌</span>
            经常宕机
            <span>❌</span>
            不合法规
            <span>❌</span>
            插边球站
            <span>❌</span>
            红标报毒
            <span>✅</span>
            原创优先
            <span>✅</span>
            技术优先
          </div>
          <div class="item-2 text-shadow">欢迎👏来到我的博客，这里是我的友情链接，你可以在这里找到我感兴趣的网站，欢迎交换友链，共同进步！</div>
        </div>

        <div class="friend-list-warp">
          <div class="friend-list" v-if="state.friendList.length > 0">
            <div class="friend-item observer-item pointer" @click="handleTo(item)" v-for="(item, index) in state.friendList" :key="index">
              <div class="friend-item-img">
                <img :src="item.logo" alt="" />
              </div>
              <div class="friend-item-title">
                <ToolTip :content="item.name">{{ item.name }}</ToolTip>
              </div>
              <div class="friend-item-content">
                <ToolTip :content="item.profile">{{ item.profile }}</ToolTip>
              </div>
            </div>
          </div>
          <div class="friend-list-empty" v-else>
            <Empty :text="'暂无友链，请等待管理员审核或联系博主添加'" :loadingText="'正在加载中...'" :loading="state.loading"></Empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getFriendLindList } from '@/api/friend';
import coverImg from '@/assets/images/bg/cover-friends.avif';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useResize from '@/hooks/useResize';
import { getQQAvatar } from '@/utils/common';

import { onUpdated, reactive } from 'vue';
const { isMobi } = useResize();
const { intersectionObserver } = useIntersectionObserver();

const state = reactive({
  loading: false,
  friendList: []
});

const getFriendLindListFn = () => {
  state.loading = true;
  getFriendLindList()
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.logo = item.isQQ == 1 ? getQQAvatar(item.logo) : item.logo;
        });
        state.friendList = [...state.friendList, ...res.data];
      }
    })
    .finally(() => {
      state.friendList.unshift({
        name: "Snows_l's Blog",
        profile: '渔得鱼心满意足，樵得樵眼笑眉舒！',
        logo: getQQAvatar(),
        url: 'http://124.223.41.220'
      });
    });
};

getFriendLindListFn();

const handleTo = item => {
  window.open(item.url, '_blank');
};

onUpdated(() => {
  intersectionObserver('.observer-item');
});
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
        border-radius: var(--border-radius-2);
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
        padding: 20px;
        font-size: 16px;
        margin: 26px 0;
        div {
          line-height: 24px;
          color: var(--text-color);
        }
        .item-1 {
          span {
            margin-left: 20px;
            margin-right: 10px;
          }
        }
      }
      .friend-list-warp {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--bg-content-color);
        border-radius: var(--border-radius-2);
        .friend-list {
          display: flex;
          flex-wrap: wrap;
          .friend-item {
            border-radius: var(--border-radius-2);
            width: 160px;
            padding: 10px 20px;
            background-color: var(--bg-content-color);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
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
              margin-top: 20px;
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
              text-align: center;
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
      width: var(--content-max-width-m) !important;
      .friend-list-warp {
        padding: 10px !important;
        .friend-list {
          justify-content: space-between !important;
          .friend-item {
            width: 48% !important;
            margin: 10px 2px !important;
          }
        }
      }
    }
  }
}
</style>
