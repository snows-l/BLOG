<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-28 20:56:54
 * @FilePath: /BLOG/src/views/play/video/index.vue
-->
<template>
  <div class="video-out-warp">
    <PageTopCover :moduleTitle="'影视'" :icon="'icon-shipin'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="video-container" :class="{ 'm-video-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text text-shadow">本站所有影视均来源于互联网，仅供学习交流使用，请勿用于任何商业用途！</div>
        </div>
        <div class="video-content-warp">
          <div class="video-warp-list" v-if="state.list.length > 0">
            <div class="video-item pointer" @click="handlevideo(item)" v-for="item in state.list">
              <div class="video-ifarme-warp">
                <LImg :src="item.cover.includes('http') ? item.cover : getCoverImg(item.cover)" :isUnPreview="true" />
                <i class="iconfont icon-bofang"></i>
              </div>
              <div class="video-item-title">{{ item.title }}</div>
            </div>
          </div>
          <div class="no-article" v-else>
            <Empty :text="'暂无影视资源，期待您的分享~'" :loadingText="'视频正在拼命加载中...'" :loading="state.loading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getZoneList } from '@/api/zone';
import coverImg from '@/assets/images/bg/cover-game.png';
import useResize from '@/hooks/useResize';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { isMobi } = useResize();

/**
 *
 * @description: 影视列表
 * @param { Object }  Item { url: String, title: String, cover: String }
 * @param { String }  bvid 视频的bvid 必填
 * @param { String }  cid 视频的cid bvid有了可以不填
 * @param { Number }  as_wide 是否宽屏 1: 宽屏, 0: 小屏
 * @param { Number }  high_quality 是否高清 1: 高清, 0: 最低视频质量(默认) 如视频有 360p 720p 1080p 三种, 默认或者 high_quality=0 是最低 360p high_quality=1 是最高1080p
 * @param { Number }  danmaku 是否开启弹幕 1: 开启(默认), 0: 关闭
 * @param { Number }  t 视频的开始时间
 * @param { Number }  p ｜page 视频的播放页码
 * @param { Boolean }  autoplay 视频的自动播放
 */
const state = reactive({
  loading: false,
  list: []
});

const getCoverImg = (name: String) => {
  return new URL(`../../../assets/images/bg/${name}`, import.meta.url).href;
};

const getZoneListFn = () => {
  state.loading = true;
  getZoneList({ type: 1, page: 1, size: 100 })
    .then(res => {
      if (res.code == 200) {
        res.data.forEach(item => {
          let imgs = (item.imgs && item.imgs.split(',')) || [];
          state.list.push({
            url: `https://player.bilibili.com/player.html?bvid=${item.remark}&p=1&as_wide=1&high_quality=1&danmaku=0&t=0&autoplay=1`,
            title: item.text,
            cover: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + imgs[0] : import.meta.env.VITE_PROD_BASE_SERVER + imgs[0]
          });
        });
      }
    })
    .finally(() => {
      state.loading = false;
    });
};
getZoneListFn();

const handlevideo = row => {
  router.push({
    path: '/play/mp4/playing',
    query: {
      url: row.url
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
        padding: 10px;
        background-color: var(--bg-content-color);
        border-radius: var(--border-radius-2);
        .video-warp-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .video-item {
            border-radius: var(--border-radius-2);
            width: 420px;
            height: 330px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            .video-ifarme-warp {
              width: 100%;
              height: 300px;
              overflow: hidden;
              transition: all 1.2s ease-in-out;
              position: relative;
              .iconfont {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: #fff;
                font-size: 50px;
                opacity: 0;
                transition: all 0.3s ease-in-out;
              }
              &:hover {
                .iconfont {
                  opacity: 1;
                }
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
              height: 30px;
              line-height: 30px;
              background-color: var(--bg-content-color);
              transition: bottom 0.3s ease-in-out;
            }
          }
        }
      }
    }
  }
  .m-video-container {
    .center-max-width-warp {
      width: var(--content-max-width-m-more) !important;
      .video-item {
        height: 230px !important;
        width: 100% !important;
        margin: 10px 0 !important;
        .video-ifarme-warp {
          height: 200px !important;
        }
        .video-item-title {
        }
      }
    }
  }
}
</style>
