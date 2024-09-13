<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-13 17:54:56
 * @FilePath: /blog/src/views/play/game/index.vue
-->
<template>
  <div class="game-out-warp">
    <PageTopCover :moduleTitle="'小游戏'" :icon="'icon-yuleAPP'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="game-container" :class="{ 'm-game-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text">欢迎👏来到我的博客，这里有很多好玩的小游戏，快来玩！</div>
        </div>
        <div class="game-content-warp">
          <div class="game-warp-list">
            <div class="game-item pointer" @click="handleGame(item)" v-for="item in state.list">
              <div class="game-item-img">
                <img :src="item.cover" alt="" />
              </div>
              <div class="game-item-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleList, previewArticleCodeToHtml } from '@/api/article';
import coverImg from '@/assets/images/bg/cover-game.png';
import useResize from '@/hooks/useResize';
import { reactive } from 'vue';
const { isMobi } = useResize();

const state = reactive({
  list: []
});

const getListFn = () => {
  getArticleList({ isUnPage: false, game: 1 }).then(res => {
    if (res.code === 200) {
      state.list = res.data.map(item => {
        return {
          ...item,
          cover: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover
        };
      });
    }
  });
};
getListFn();

const handleGame = row => {
  previewArticleCodeToHtml(row.id).then(res => {
    if (res.code == 200) {
      window.open(res.data, '_blank');
    } else {
      ElMessage({
        type: 'error',
        message: '预览失败，请稍后再试！'
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.game-out-warp {
  width: 100%;
  height: 100%;
  .game-container {
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
      .game-content-warp {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--bg-content-color);
        border-radius: 10px;
        .game-warp-list {
          display: flex;
          flex-wrap: wrap;
          .game-item {
            border-radius: 10px;
            width: 400px;
            padding: 20px 20px;
            background-color: var(--bg-content-color);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: 20px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .game-item-img {
              width: 240px;
              height: 240px;
              overflow: hidden;
              transition: all 1.2s ease-in-out;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
              }
            }
            .game-item-title {
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
          }
        }
      }
    }
  }
  .m-game-container {
    .center-max-width-warp {
      width: var(--content-max-width-m) !important;
      .game-item {
        margin: 10px 0 !important;
      }
    }
  }
}
</style>
