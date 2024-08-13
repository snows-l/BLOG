<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-13 10:04:53
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-13 13:23:16
 * @FilePath: /blog/src/views/msgBorad/index.vue
-->
<template>
  <div class="msg-borad-warp">
    <PageTopCover
      :moduleTitle="'留言板'"
      :icon="'icon-liuyanban-xian'"
      :coverImg="coverImg"
      :isMobile="isMobi"
      :mudulDesc="''"
      :isArticle="false"
      :bgColor="'transparent'"></PageTopCover>
    <div class="msg-list-content-warp" :class="{ 'm-msg-list-content-warp': isMobi }">
      <div class="center-max-width-warp">
        <div class="entry-content">
          <div class="poem-wrap">
            <div class="poem-border poem-left"></div>
            <div class="poem-border poem-right"></div>
            <h1 class="poem-title">念两句诗</h1>
            <div class="poem-content">江南好，风景旧曾谙。</div>
            <div class="poem-author">【唐代】白居易《忆江南·江南好》</div>
          </div>
          <p class="thanks-msg">很感谢你能访问该页面，如果你有什么和博主说的或者有什么问题想问的，可以随时在下面评论哦~</p>
        </div>
        <div class="msg-list-content" :class="{ 'm-msg-list-content': isMobi }">
          <div class="components">Conments {{ state.list.length }} 条留言</div>
          <div class="msg-list-hav" v-if="state.list.length > 0">
            <div class="msg-list" v-for="(item, index) in state.list" :key="index">
              <div class="msg-item">
                <div class="info-warp">
                  <div class="left-info">
                    <div class="img-warp">
                      <img :src="getQQAvatar(item.qq)" alt="" />
                    </div>
                    <div class="r-info">
                      <div class="name">
                        <div class="bozhu" v-if="item.qq === '37523953'">博主</div>
                        <span>{{ item.nickname }}</span>
                        <div class="bozhu level" style="margin-left: 5px">Lv0</div>
                      </div>
                      <div class="platform">
                        <div class="pulic-time">发布于：{{ item.time }}</div>
                        <span v-if="item.browser || item.os">
                          {{ isMobi ? '平台：' : '' }}
                          (
                          <span>{{ item.browser }}</span>
                          <span style="margin-left: 20px">{{ item.os }}</span>
                          )
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="right-info"></div>
                </div>
                <div class="msg">{{ item.msg }}</div>
              </div>
            </div>
          </div>
          <div class="no-msg" v-else>
            <Empty :text="'暂无留言数据，期待您的留言~'" :loadingText="'留言正在拼命加载中...'" :loading="state.loading"></Empty>
          </div>
        </div>
        <Comment :isMobi="isMobi"></Comment>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getQQAvatar } from '@/utils/common';
import coverImg from '@/assets/images/common/msg-borad.png';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();
import { ref, reactive, watch, onMounted, computed } from 'vue';

const state = reactive({
  loading: false,
  list: [
    {
      nickname: 'snows_l',
      qq: '37523953',
      email: 'snows_l@163.com',
      msg: '你好，我是snows_l，很高兴遇见你，我是一名前端工程师，欢迎来到我的博客，有什么问题可以随时在评论区告诉我，祝你在学习道路上越走越远！',
      time: '2024-08-13 10:04:53',
      browser: 'Chrome',
      os: 'Mac OS'
    },
    {
      nickname: '小明',
      qq: '12345678',
      email: 'xiaoming@163.com',
      msg: '你好，我是小明，很高兴遇见你，我是一名前端工程师，欢迎来到我的博客，有什么问题可以随时在评论区告诉我，祝你在学习道路上越走越远！',
      time: '2024-08-13 10:04:53',
      browser: 'Chrome',
      os: 'Mac OS'
    },
    {
      nickname: '小红',
      qq: '87654321',
      email: 'xiaohong@163.com',
      msg: '你好，我是小红，很高兴遇见你，我是一名前端工程师，欢迎来到我的博客，有什么问题可以随时在评论区告诉我，祝你在学习道路上越走越远！',
      time: '2024-08-13 10:04:53',
      browser: 'Chrome',
      os: 'Mac OS'
    }
  ]
});
</script>

<style lang="scss" scoped>
.msg-borad-warp {
  width: 100vw;
  height: 100vh;
  .msg-list-content-warp {
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .center-max-width-warp {
      height: 100%;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .entry-content {
        .poem-wrap {
          width: 80%;
          height: 140px;
          border: 2px solid var(--text-color);
          border-top: none;
          text-align: center;
          margin: 40px auto;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .poem-content {
            font-size: 1.4em;
            font-weight: 550;
            color: var(--text-color);
            margin-bottom: 20px;
          }
          .poem-author {
            font-size: 12px;
            color: var(--text-color);
          }
          .poem-border {
            top: 0;
            position: absolute;
            height: 2px;
            width: 25%;
            background-color: var(--text-color);
          }
          .poem-left {
            left: 0;
          }
          .poem-right {
            right: 0;
          }
          .poem-title {
            top: -0.5em;
            position: absolute;
            display: inline-block;
            letter-spacing: 4px;
            color: var(--text-color);
            font-size: 2em;
          }
        }
        .thanks-msg {
          font-size: 16px;
          color: var(--theme-light-color-3);
        }
      }
      .msg-list-content {
        margin-top: 60px;
        .components {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          margin-bottom: 20px;
          position: relative;
          width: auto;
          display: inline-block;
          &::after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            border-radius: 2px;
            background-color: var(--theme-color);
          }
        }
        .msg-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .msg-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px 20px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
            border-radius: 15px;
            background-color: var(--bg-content-color);
            .info-warp {
              display: flex;
              align-items: center;
              .left-info {
                display: flex;
                .img-warp {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 10px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .r-info {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  color: var(--text-color);
                  .name {
                    display: flex;
                    align-items: center;
                    margin-bottom: 4px;
                    .bozhu {
                      padding: 2px 5px;
                      font-size: 12px;
                      border: 1px solid var(--theme-light-color-5);
                      color: var(--theme-color);
                      margin-right: 5px;
                      border-radius: 5px;
                    }
                    .level {
                      border: 1px solid #ddd;
                      color: var(--text-color);
                      font-family: 优设标题黑 !important;
                    }
                  }
                  .platform {
                    font-size: 12px;
                    color: var(--text-color);
                    display: flex;
                    .pulic-time {
                      margin-right: 10px;
                    }
                  }
                }
              }
              .right-info {
                width: 40px;
                height: 40px;
              }
            }
            .msg {
              margin-top: 20px;
              font-size: 16px;
              color: var(--text-color);
              line-height: 1.8;
              word-break: break-all;
              text-indent: 32px;
            }
          }
        }
      }
    }
  }
  .m-msg-list-content-warp {
    .center-max-width-warp {
      width: 96% !important;
      .platform {
        line-height: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .thanks-msg {
      text-indent: 32px;
      line-height: 18px;
    }
  }
}
</style>

<style lang="scss">
.dark {
  .msg-item:hover {
    box-shadow: 2px 2px 10px 2px var(--theme-light-color-2) !important;
  }
}
</style>
