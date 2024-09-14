<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-14 12:39:15
 * @FilePath: /blog/src/views/play/video/index.vue
-->
<template>
  <div class="video-out-warp">
    <PageTopCover :moduleTitle="'影视'" :icon="'icon-shipin'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="video-container" :class="{ 'm-video-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text">这里有很多好玩的小游戏，快来玩！</div>
        </div>
        <div class="video-content-warp">
          <div class="video-warp-list">
            <div class="video-item pointer" @click="handlevideo(item)" v-for="item in state.list">
              <div class="video-item-img">
                <iframe
                  ref="iframeRef"
                  :src="item.url"
                  width="100%"
                  height="100%"
                  scrolling="no"
                  border="0"
                  frameborder="no"
                  framespacing="0"
                  :allowfullscreen="true"
                  :autoplay="false"></iframe>
              </div>
              <div class="video-item-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { getArticleList } from '@/api/article';
import coverImg from '@/assets/images/bg/cover-game.png';
import useResize from '@/hooks/useResize';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { isMobi } = useResize();

const state = reactive({
  list: [
    {
      url: 'https://player.bilibili.com/player.html?aid=699690540&bvid=BV1Zm4y1e7eR&cid=1159067867&p=1&as_wide=1&high_quality=1&danmaku=0&t=30',
      title: '《魔兽世界》：地牢战争'
    },
    {
      url: '//player.bilibili.com/player.html?aid=413672301&bvid=BV1MV41167e9&cid=208508865&page=1',
      title: '我想再看一眼这个世界'
    }
  ]
});

// const getListFn = () => {
//   getArticleList({ isUnPage: false, game: 1 }).then(res => {
//     if (res.code === 200) {
//       state.list = res.data.map(item => {
//         return {
//           ...item,
//           cover: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover
//         };
//       });
//     }
//   });
// };
// getListFn();

const handlevideo = row => {
  router.push({
    path: '/preview',
    query: {
      id: row.id
    }
  });
};
</script>

<style lang="scss" scoped>
.video-out-warp {
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  .video-container {
    width: 100%;
    height: 100%;
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .center-max-width-warp {
      height: 100%;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .shengming-warp {
        font-size: 16px;
        margin: 10px 0;
        .text {
          color: var(--text-color);
          line-height: 40px;
          text-align: center;
        }
      }
      .video-content-warp {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--bg-content-color);
        border-radius: 10px;
        .video-warp-list {
          display: flex;
          flex-wrap: wrap;
          .video-item {
            border-radius: 10px;
            width: 266px;
            height: 240px;
            // padding: 20px 20px;
            background-color: var(--bg-content-color);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 20px 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            .video-item-img {
              width: 220px;
              height: 220px;
              width: 100%;
              height: 100%;
              overflow: hidden;
              transition: all 1.2s ease-in-out;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
              }
            }
            .video-item-title {
              width: 100%;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              color: var(--text-color);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; /* 定义文本的行数 */
              overflow: hidden;
              text-overflow: ellipsis;
              position: absolute;
              bottom: -30px;
              left: 0;
              height: 30px;
              line-height: 30px;
              background-color: var(--bg-content-color);
              transition: bottom 0.3s ease-in-out;
            }
            &:hover {
              .video-item-title {
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .m-video-container {
    .center-max-width-warp {
      width: var(--content-max-width-m) !important;
      .video-item {
        width: 100% !important;
        margin: 10px 0 !important;
        .video-item-title {
          bottom: 0 !important;
        }
      }
    }
  }
}
</style>
