<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 13:43:11
 * @FilePath: /blog/src/views/about/zone/index.vue
-->
<template>
  <div class="zone-container-warp">
    <PageTopCover :moduleTitle="'随笔'" :textIcon="'📒'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="zone-container" :class="{ 'm-zone-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text">欢迎👏来到我的博客，这里是关于我的随笔！</div>
        </div>

        <div class="zone-list-warp">
          <div class="zone-list">
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
              <div class="zone-item-content">{{ item.text }}</div>
              <div class="zone-item-img-warp">
                <LImg class="img" v-for="img in item.imgs" :src="img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-loading">
          <img v-if="state.loading && state.zoneList.length > 0" style="width: 40px; height: 40px; margin-bottom: 20px" src="@/assets/images/common/loading.svg" alt="" srcset="" />
          <div v-if="!state.loading && state.isMore && state.zoneList.length >= state.page.total" class="btn-more pointer" @click="handleLoadMore">更早的文章</div>
          <div v-if="!state.isMore && state.zoneList.length > 0" class="no-more">很高兴你翻到这里，但是真的没有了...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getZoneList } from '@/api/zone';
import coverImg from '@/assets/images/bg/cover-zone.png';
import useResize from '@/hooks/useResize';
import { getImgIcon } from '@/utils/common';
import { reactive } from 'vue';
const { isMobi } = useResize();

const state = reactive({
  isMore: true,
  loading: false,
  zoneList: [
    {
      createTime: '2024-08-15',
      text: '渔得鱼心满意足，樵得樵眼笑眉舒！',
      imgs: [],
      city: '杭州',
      os: 'Harmoney OS',
      browser: 'Chrome'
    }
  ],
  page: { page: 1, size: 5, total: 0 }
});

const getZoneListFn = () => {
  state.loading = true;
  getZoneList(state.page)
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.imgs =
            item.imgs &&
            item.imgs.split(',').map(img => (import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + img : import.meta.env.VITE_PROD_BASE_SERVER + img));
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
      .zone-list-warp {
        margin: 20px 0;
        background-color: var(--bg-content-color);
        border-radius: 10px;
        padding: 20px;
        .zone-list {
          .zone-item {
            border-radius: 10px;
            padding: 20px;
            background-color: var(--bg-content-color);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 8px;
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
            .zone-item-img-warp {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .img {
                height: 220px;
                width: 48%;
                object-fit: cover;
                display: inline-block;
                margin: 5px;
                border: 1px solid #ccc;
              }
            }
            .zone-item-content {
              font-size: 16px;
              line-height: 20px;
              font-weight: bold;
              margin-top: 10px;
              color: var(--text-color);
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
  .m-zone-container {
    .center-max-width-warp {
      width: var(--content-max-width-m) !important;
      .zone-list-warp {
        padding: 10px 0px !important;
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
  .btn-more {
    margin-bottom: 20px;
    padding: 10px 20px;
    border-radius: 20px;
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
</style>
