<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-13 21:18:45
 * @FilePath: /BLOG/src/views/play/game/index.vue
-->
<template>
  <div class="game-out-warp">
    <PageTopCover :moduleTitle="'小游戏'" :icon="'icon-yuleAPP'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="game-container" :class="{ 'm-game-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text">这里有很多好玩的小游戏，快来玩！</div>
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
import { getArticleList } from '@/api/article';
import coverImg from '@/assets/images/bg/cover-game.png';
import useResize from '@/hooks/useResize';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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
  router.push({
    path: '/preview',
    query: {
      id: row.id
    }
  });
};
</script>

<style lang="scss" scoped>
.game-out-warp {
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
            .game-item-img {
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
            .game-item-title {
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
              .game-item-title {
                bottom: 0;
              }
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
