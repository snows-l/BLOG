<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-10-05 20:29:33
 * @FilePath: /BLOG/src/views/about/zone/index.vue
-->
<template>
  <div class="zone-container-warp">
    <PageTopCover :moduleTitle="'随笔'" :textIcon="'📒'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="zone-container" :class="{ 'm-zone-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text text-shadow">欢迎👏来到我的博客，这里是关于我的随笔！</div>
        </div>

        <div class="zone-list" v-if="state.zoneList.length > 0">
          <div class="zone-item pointer" v-for="(item, index) in state.zoneList" :key="index">
            <div class="time-loacl-warp">
              <div style="display: flex; align-items: center">
                <div class="item time">
                  <IconCalendar class="icon-img"></IconCalendar>
                  {{ item.createTime }}
                </div>
                <div class="item local">
                  <img class="icon-img" :src="getImgIcon('icon-dingwei.svg')" alt="" />
                  {{ item.city }}
                </div>
              </div>
              <div class="item local" v-if="!isMobi">
                <i class="iconfont icon-caozuoxitong"></i>
                {{ item.os }}
                <i class="iconfont icon-icon__dakailiulanqi" style="margin-left: 10px"></i>
                {{ item.browser }}
              </div>
            </div>
            <div class="content-warp-line">
              <div class="zone-item-content">{{ item.text }}</div>
              <div
                class="zone-item-img-warp"
                :class="{
                  'zone-item-img-warp-3': (item.images.length + item.mp4s.length > 4 || item.images.length + item.mp4s.length == 3) && !isMobi,
                  'zone-item-img-warp-1': item.images.length + item.mp4s.length == 1 && !isMobi,
                  'zone-item-img-warp-1-m': item.images.length + item.mp4s.length == 1 && isMobi
                }">
                <template v-for="img in item.images">
                  <LImg class="img" :src="img" alt="" />
                </template>
                <template v-for="img in item.mp4s">
                  <video class="img" :src="img" controls></video>
                </template>
              </div>
              <template v-if="item.mp3s && item.mp3s.length > 0">
                <div class="mp3-warp" style="margin-top: 0px" v-for="(mp3, index) in item.mp3s">
                  <audio class="mp3" :src="mp3" controls></audio>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="m-no-article" v-else>
          <Empty :text="'暂无内容，请等待博主更新~'" :loadingText="'正在拼命加载中...'" :loading="state.loading" />
        </div>
        <div class="bottom-loading">
          <img v-if="state.loading && state.zoneList.length > 0" style="width: 40px; height: 40px; margin-bottom: 20px" src="@/assets/images/common/loading.svg" alt="" srcset="" />
          <div v-if="!state.loading && state.isMore && state.zoneList.length <= state.page.total" class="btn-more pointer" @click="handleLoadMore">更早的文章</div>
          <div v-if="!state.isMore && state.zoneList.length > 0" class="no-more">很高兴你翻到这里，但是真的没有了...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getZoneList } from '@/api/zone';
import coverImg from '@/assets/images/bg/cover-zone.avif';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useResize from '@/hooks/useResize';
import { getImgIcon } from '@/utils/common';
import { onUpdated, reactive } from 'vue';
const { isMobi } = useResize();
const { intersectionObserver } = useIntersectionObserver();

const state = reactive({
  isMore: true,
  loading: false,
  zoneList: [],
  page: { page: 1, size: 10, total: 0 }
});

const getZoneListFn = () => {
  state.loading = true;
  getZoneList(state.page)
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.images = [];
          item.mp3s = [];
          item.mp4s = [];
          item.images =
            item.imgs &&
            item.imgs
              .split(',')
              .map(img => (import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + img : import.meta.env.VITE_PROD_BASE_SERVER + img))
              .filter(img => img.includes('.jpg') || img.includes('.png') || img.includes('.jpeg') || img.includes('.gif'));
          item.mp3s =
            item.imgs &&
            item.imgs
              .split(',')
              .map(mp3 => (import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + mp3 : import.meta.env.VITE_PROD_BASE_SERVER + mp3))
              .filter(mp3 => mp3.includes('.mp3'));
          item.mp4s =
            item.imgs &&
            item.imgs
              .split(',')
              .map(mp4 => (import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + mp4 : import.meta.env.VITE_PROD_BASE_SERVER + mp4))
              .filter(mp4 => mp4.includes('.mp4'));
        });
        state.zoneList = [...state.zoneList, ...res.data];
        state.page.total = res.total;
        if (state.zoneList.length >= res.total) {
          state.isMore = false; // 已经没有更多数据了
        }
        state.loading = false;
      }
    })
    .catch(() => {
      state.isMore = false;
    })
    .finally(() => {
      state.loading = false;
    });
};
getZoneListFn();

// 加在更多
const handleLoadMore = () => {
  state.loading = true;
  state.page.page++;
  getZoneListFn();
};

onUpdated(() => {
  intersectionObserver('.zone-item');
});
</script>

<style lang="scss" scoped>
.zone-container-warp {
  width: 100%;
  height: 100%;
  .zone-container {
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
        div {
          color: var(--text-color);
          line-height: 40px;
          text-align: center;
        }
      }
      .zone-list {
        .zone-item {
          border-radius: var(--border-radius-2);
          padding: 20px;
          background-color: var(--bg-content-color);
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          margin: 20px 8px;

          .time-loacl-warp {
            font-size: 12px;
            line-height: 18px;
            display: flex;
            color: var(--text-color);
            .item {
              display: flex;
              align-items: center;
              margin-right: 20px;
              .iconfont {
                margin-right: 10px;
              }
            }
          }
          .content-warp-line {
            background-image: url('@/assets/images/bg/wordline.webp');
            line-height: 40px;
            padding-bottom: 20px;
            .zone-item-img-warp {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              margin-bottom: 15px;
              .img {
                height: 220px;
                width: 48%;
                object-fit: cover;
                display: inline-block;
                margin: 5px;
                border-radius: var(--border-radius-1);
              }
            }
            .zone-item-img-warp-3 {
              justify-content: flex-start !important;
              .img {
                margin: 10px 16px;
                width: 256px;
                height: 240px;
                object-fit: cover;
                display: inline-block;
              }
            }
            .zone-item-img-warp-1 {
              .img {
                width: 100%;
                height: 400px;
                object-fit: cover;
                display: inline-block;
              }
            }
            .zone-item-img-warp-1-m {
              .img {
                width: 100% !important;
                height: 200px !important;
              }
            }
            .zone-item-content {
              font-size: 13px;
              margin-top: 20px;
              color: var(--text-color);
              margin-bottom: 10px;
              min-height: 80px;
              text-indent: 26px;
            }
          }
        }
      }
    }
  }
  .m-zone-container {
    .center-max-width-warp {
      width: var(--content-max-width-m) !important;
      .zone-list {
        .zone-item-img-warp {
          .img {
            width: 44% !important;
            height: 120px !important;
          }
        }
        .time-loacl-warp {
          flex-direction: column !important;
          justify-content: center;
        }
      }
    }
  }
}
.bottom-loading {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn-more {
    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: var(--border-radius-3);
    background-color: var(--theme-light-color-9);
    color: var(--theme-color);
  }
  .no-more {
    color: var(--theme-light-color-3);
    margin-bottom: 20px;
  }
}

.icon-img {
  width: 12px;
  height: 12px;
  margin: 0 10px 0 0;
}
.iconfont {
  color: var(--theme-color);
  font-size: 12px;
}
.dark {
  .zone-container-warp {
    .zone-item {
      &:hover {
        box-shadow: 2px 2px 10px 2px var(--theme-light-color-2) !important;
      }
    }
  }
}
</style>
