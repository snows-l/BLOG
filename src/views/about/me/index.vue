<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-13 15:43:34
 * @FilePath: /blog/src/views/about/me/index.vue
-->
<template>
  <div class="me-out-warp">
    <PageTopCover :moduleTitle="'本大大'" :imgIcon="'me.png'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="me-container-warp" :class="{ 'm-me-container-warp': isMobi }">
      <div class="max-width-warp">
        <div class="avatar-saying-warp">
          <div class="saying-warp left-saying">
            <div
              class="saying-text"
              :class="'left' + index"
              :style="{ 'margin-right': index == 1 || index == 2 ? (isMobi ? '25px' : '15px') : 0 }"
              v-for="(saying, index) in state.leftSayings"
              :key="index">
              <span>{{ saying }}</span>
            </div>
          </div>
          <div class="avatar-warp">
            <div class="bg-warp">
              <div class="line-rote" v-if="!isMobi"></div>
              <img :src="state.avatar" class="avatar-img" />
            </div>
          </div>
          <div class="saying-warp right-saying">
            <div
              class="saying-text"
              :class="'right' + index"
              :style="{ 'margin-left': index == 1 || index == 2 ? (isMobi ? '25px' : '15px') : 0 }"
              v-for="(saying, index) in state.rightSayings"
              :key="index">
              <span>{{ saying }}</span>
            </div>
          </div>
        </div>

        <div class="info-warp-1">
          <div class="info-1-item me-warp">
            <div class="me-1">Hello 很荣幸遇见你</div>
            <div class="me-2">
              我叫
              <div class="name">snows_l</div>
            </div>
            <div class="me-3">
              一名
              <div class="name">前端开发程序员 🧑‍💻</div>
            </div>
            <div class="me-4">
              <div class="chart email">
                <img :src="iconEmail" />
                <span>snows_l@163.com</span>
              </div>
              <div class="chart qq">
                <img :src="iconQQ" />
                <span>37523953</span>
              </div>
              <div class="chart wx">
                <img :src="iconWeixin" />
                <span>snows__l</span>
              </div>
            </div>

            <div class="weizhi">
              <ToolTip content="现居：浙江杭州">
                <img style="width: 40px; height: 40px" src="@/assets/images/icon/icon-dingwei.svg" />
              </ToolTip>
            </div>
          </div>
          <div class="info-1-item site-warp">
            <div class="before">
              <div class="before-warp">
                <div class="tltle">关于本网站</div>
                <div class="content">
                  一款基于
                  <span>前端（vue3）</span>
                  <span>后端（node.js）</span>
                  <span>数据库（mysql）</span>
                  原生程度达
                  <span>99%，基本没有用UI框架</span>
                  的前后端分离的个人技术博客网站，在我不断地复制粘贴、复制粘贴，又复制粘贴的努力下，它（snows_l's BLOG）终于问世啦~~~~~~~
                </div>
                <div class="scrolling-text">小伙伴们大家好，我是snows_l，喜欢复制、粘贴，在今后的日子中，我还会将此博客继续完善、改进，期待的话可以互换友联，或者收藏博客。</div>
              </div>
            </div>
            <div class="background">
              <div class="title">技术栈</div>
              <div class="back-warp">
                <div class="jishu-item" :style="{ 'background-color': item.color }" v-for="item in state.skillList" :key="item.text">
                  <img style="width: 16px; height: 16px" v-if="item.img" :src="item.img" alt="" />
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </div>
            <div class="run-warp">
              <div class="text run">已运行</div>
              <div class="time-warp">
                <IconHour24 class="time-24" />
              </div>
              <div class="text day">天</div>
            </div>
          </div>
        </div>

        <div class="info-warp-2">
          <div class="visit-warp">
            <div class="title">访问统计</div>
            <div class="visit-item-warp">
              <div class="visit-item">
                <div class="visit-item-title">今日访问</div>
                <CountTo
                  class="visit-item-num"
                  :startVal="0"
                  :endVal="state.blogVisitTotal.today * 1"
                  :duration="1000"
                  :prefix="''"
                  :suffix="''"
                  :decimals="2"
                  :decimal="'.'"
                  :separator="','"></CountTo>
              </div>
              <div class="visit-item">
                <div class="visit-item-title">昨日访问</div>
                <CountTo
                  class="visit-item-num"
                  :startVal="0"
                  :endVal="state.blogVisitTotal.yeasterday * 1"
                  :duration="1000"
                  :prefix="''"
                  :suffix="''"
                  :decimals="2"
                  :decimal="'.'"
                  :separator="','"></CountTo>
              </div>
              <div class="visit-item">
                <div class="visit-item-title">本月访问</div>
                <CountTo
                  class="visit-item-num"
                  :startVal="0"
                  :endVal="state.blogVisitTotal.currentMonth * 1"
                  :duration="1000"
                  :prefix="''"
                  :suffix="''"
                  :decimals="2"
                  :decimal="'.'"
                  :separator="','"></CountTo>
              </div>
              <div class="visit-item">
                <div class="visit-item-title">总访问</div>
                <CountTo
                  class="visit-item-num"
                  :startVal="0"
                  :endVal="state.blogVisitTotal.sum * 1"
                  :duration="1000"
                  :prefix="''"
                  :suffix="''"
                  :decimals="2"
                  :decimal="'.'"
                  :separator="','"></CountTo>
              </div>
            </div>
          </div>
          <div class="hobby-warp">
            <div class="title">HOBBY</div>
            <el-carousel style="margin-top: 20px" height="140px" :type="!isMobi ? 'card' : ''" :interval="2000" :loop="true">
              <el-carousel-item v-for="item in state.hobbyList" :key="item.name">
                <div class="hobby-item-item">
                  <div class="text">{{ item.name }}</div>
                  <LImg style="width: 100%; height: 100%" :src="item.img" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <div class="my-label-warp">
          <div class="title">我的标签</div>
          <div class="content-warp">
            <div class="my-label-item" :style="{ 'background-color': item.color }" v-for="item in state.labelList" :key="item.label">
              <IconLabel style="margin-right: 10px" />
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getBlogVisit, getDict } from '@/api/common';
import coverImg from '@/assets/images/bg/cover-about.png';
import hobbyChiji from '@/assets/images/bg/hobby-chiji.avif';
import hobbyQx from '@/assets/images/bg/hobby-qixing.avif';
import hobbyWangzhe from '@/assets/images/bg/hobby-wangzhe.avif';
import iconAxios from '@/assets/images/icon/axios.svg';
import iconCSS from '@/assets/images/icon/CSS3.svg';
import iconElement from '@/assets/images/icon/element-plus.svg';
import iconHtml from '@/assets/images/icon/html5.svg';
import iconLodash from '@/assets/images/icon/lodash.png';
import iconEmail from '@/assets/images/icon/mail.png';
import iconNode from '@/assets/images/icon/Nodejs.png';
import iconQQ from '@/assets/images/icon/qq.png';
import iconVue from '@/assets/images/icon/Vue.svg';
import iconWeixin from '@/assets/images/icon/weixin.png';
import useResize from '@/hooks/useResize';
import { getQQAvatar } from '@/utils/common';
import { getRandomColor } from '@/utils/theme';
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { reactive } from 'vue';
const { isMobi } = useResize();

const state = reactive({
  avatar: getQQAvatar(),
  leftSayings: ['不想被束缚 自由自在地去追求', '平平淡淡，简简单单', '内向', '渴望健康，平平安安才是真'],
  rightSayings: ['就活这一次 下次不来了', '身体才是革命的本钱', '逃跑吧 跑出这满是世俗的生活', '不求大富大贵 但求健健康康'],
  skillList: [
    { img: iconVue, text: 'VUE3', color: getRandomColor() },
    { img: iconCSS, text: 'CSS3', color: getRandomColor() },
    { img: iconHtml, text: 'HTML5', color: getRandomColor() },
    { img: iconNode, text: 'node.js', color: getRandomColor() },
    { img: '', text: 'express', color: getRandomColor() },
    { img: iconLodash, text: 'lodash', color: getRandomColor() },
    { img: iconAxios, text: 'Axios', color: getRandomColor() },
    { img: '', text: 'VITE', color: getRandomColor() },
    { img: '', text: 'JWT', color: getRandomColor() },
    { img: iconElement, text: 'ElImage', color: getRandomColor() },
    { img: iconElement, text: 'ElToolTip', color: getRandomColor() },
    { img: iconElement, text: 'ElCarousel', color: getRandomColor() },
    { img: '', text: 'vue3-flip-clock', color: getRandomColor() },
    { img: '', text: 'vue3-count-to', color: getRandomColor() },
    { img: '', text: 'jparticles', color: getRandomColor() },
    { img: '', text: 'moment', color: getRandomColor() },
    { img: '', text: 'pinia', color: getRandomColor() },
    { img: '', text: 'mitt', color: getRandomColor() },
    { img: '', text: '@wangeditor/editor', color: getRandomColor() }
  ],
  blogVisitTotal: {
    today: 0,
    yeasterday: 0,
    currentMonth: 0,
    sum: 0
  },
  hobbyList: [
    { img: hobbyQx, name: '骑行' },
    { img: hobbyWangzhe, name: '王者荣耀' },
    { img: hobbyChiji, name: '和平精英' }
  ],
  labelList: []
});

const getBlogVisitFn = () => {
  getBlogVisit().then(res => {
    if (res.code === 200) {
      state.blogVisitTotal = res.data;
    }
  });
};
getBlogVisitFn();

const getDictFn = () => {
  getDict({ dictType: 'blog_label' }).then(res => {
    if (res.code === 200) {
      state.labelList = res.data.map(item => {
        return {
          label: item.label,
          color: getRandomColor()
        };
      });
    }
  });
};
getDictFn();
</script>

<style lang="scss" scoped>
.me-out-warp {
  width: 100%;
  height: 100%;
  .me-container-warp {
    width: 100%;
    height: 100%;
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .max-width-warp {
      height: 100%;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .avatar-saying-warp {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-warp {
          width: 200px;
          height: 200px;
          margin: 0 10px;
          .bg-warp {
            position: relative;
            width: 100%;
            height: 100%;
            .line-rote {
              position: absolute;
              top: 15px;
              right: 15px;
              width: 170px;
              height: 170px;
              border-radius: 50%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              animation: rotate 2s linear infinite;
              background: linear-gradient(-45deg, #f80202, #dabf5d, #23a6d5, #72dfbb);
            }
            .avatar-img {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 160px;
              height: 160px;
              border-radius: 50%;
            }
          }
        }
        .saying-warp {
          padding: 40px 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .saying-text {
            padding: 2px 10px;
            border-radius: 20px;
            border-width: 1px;
            border-style: solid;
            // 不换行
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            color: var(--text-color);
            display: inline-block;
          }
        }
        .left0 {
          border-color: #1bc2c3;
          background-color: #1bc3c34e;
          span {
            color: #1bc2c3;
          }
        }
        .left1 {
          border-color: #5471e4;
          background-color: #5471e4;
          span {
            color: var(--text-color);
          }
        }
        .left2 {
          border-color: #2293ff;
          background-color: #2293ff4e;
          span {
            color: #2293ff;
          }
        }
        .left3 {
          border-color: #d94caf;
          background-color: #d94caf4e;
          span {
            color: #d94caf;
          }
        }
        .right0 {
          border-color: #f5a623;
          background-color: #f5a6234e;
          span {
            color: #f5a623;
          }
        }
        .right1 {
          border-color: #fa541c;
          background-color: #fa541c;
          span {
            color: var(--text-color);
          }
        }
        .right2 {
          border-color: #29c5c6;
          background-color: #29c5c6;
          span {
            color: var(--text-color);
          }
        }
        .right3 {
          border-color: #68ca3c;
          background-color: #68ca3c4e;
          span {
            color: #68ca3c;
          }
        }
        .left-saying {
          align-items: flex-end;
          animation: upDown 3s ease-in-out 0s infinite normal none running;
        }
        .right-saying {
          align-items: flex-start;
          animation: upDown 3s ease-in-out 0s infinite normal none running;
        }
      }
      .info-warp-1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        flex-wrap: wrap;

        .info-1-item {
          position: relative;
          background-color: var(--bg-content-color);
          margin: 10px 0;
          width: 446px;
          height: 200px;
          border-radius: 15px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .me-warp {
          background-color: #5098fe;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          .me-1 {
            font-size: 16px;
            color: var(--text-color);
          }
          .me-2 {
            margin: 20px 0;
            font-size: 24px;
            color: var(--text-color);
            display: flex;
            align-items: center;
          }
          .me-3 {
            font-size: 16px;
            color: var(--text-color);
            display: flex;
            align-items: center;
          }
          .me-4 {
            margin-top: 10px;
            height: 30px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .chart {
              display: flex;
              align-items: center;
              margin-right: 20px;
              margin-top: 5px;
              img {
                width: 18px;
                height: 18px;
                margin-right: 5px;
              }
              span {
                font-size: 14px;
              }
            }
          }
          .name {
            margin-left: 10px;
            font-weight: bold;
            padding: 4px 8px;
            background: linear-gradient(to right, #8be4be, #e7cbaa);
          }
          .weizhi {
            position: absolute;
            right: 15px;
            animation: swing 1s ease-in-out infinite alternate;
            top: 15px;
          }
        }
        .site-warp {
          padding: 20px;
          overflow: hidden;
          position: relative;
          .run-warp {
            position: absolute;
            top: -60px;
            right: 10px;
            display: flex;
            align-items: flex-end;
            .time-warp {
              width: 60px;
              height: 120px;
              padding: 60px 0 0 0;
              animation: swing 1.3s ease-in-out infinite alternate;
              display: flex;
              .time-24 {
                width: 60px;
                height: 60px;
              }
            }
            .text {
              height: 60px;
              line-height: 80px;
              font-weight: 600;
            }
            .run {
              margin-right: 20px;
            }
            .day {
              margin-left: 20px;
            }
          }
          .before {
            display: block;
            transition: all 0.8s ease-in-out;
            .tltle {
              font-size: 22px;
              color: var(--text-color);
              margin-bottom: 10px;
              .running-time {
                font-size: 12px;
                color: #28c3c3;
                margin-left: 5px;
              }
            }
            .content {
              padding: 6px 0;
              line-height: 24px;
              color: var(--text-color);
              text-indent: 28px;
              font-size: 14px;
              height: 126px;
              span {
                color: var(--theme-color);
              }
            }
            .scrolling-text {
              white-space: nowrap;
              position: absolute;
              font-size: 12px;
              bottom: 10px;
              color: var(--text-color);
              animation: scrollText 20s linear infinite;
            }
          }
          .background {
            display: none;
            transition: all 0.8s ease-in-out;
            overflow-y: auto;
            width: 100%;
            height: 100%;
            .title {
              font-size: 22px;
              color: var(--text-color);
              margin-bottom: 10px;
            }
            .back-warp {
              display: flex;
              flex-wrap: wrap;
              .jishu-item {
                padding: 4px 8px;
                border-radius: 20px;
                margin: 5px;
                border: 1px solid var(--text-color);
                display: flex;
                align-items: center;
                span {
                  font-size: 12px;
                  // color: var(--text-color);
                  color: #fff;
                  margin-left: 5px;
                }
              }
            }
          }
          &:hover {
            .before {
              display: none;
            }

            .background {
              display: block;
            }
          }
        }
      }

      .info-warp-2 {
        margin-top: 10px;
        display: flex;
        .visit-warp {
          height: 200px !important;
          height: 100%;
          background-color: var(--bg-content-color);
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          .title {
            font-size: 22px;
            color: var(--text-color);
            margin-bottom: 10px;
          }
          .visit-item-warp {
            background-color: var(--bg-content-color);
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0 15px;
            border-radius: 15px;
            .visit-item {
              width: 48%;
              margin: 10px 0;
            }
            .visit-item-title {
              font-size: 12px;
              color: var(--text-color);
              margin-bottom: 8px;
            }
            .visit-item-num {
              font-size: 28px;
              color: var(--text-color);
              font-weight: 500;
              font-family: 'DSDIGI';
            }
          }
        }
        .hobby-warp {
          margin-left: 30px;
          border-radius: 15px;
          background-color: var(--bg-content-color);
          padding: 20px;
          flex: 1;
          height: 200px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          position: relative;
          .title {
            position: absolute;
            top: 10px;
            left: 20px;
            height: 20px;
            line-height: 20px;
            color: var(--text-color);
          }
          .hobby-item-item {
            width: 100%;
            height: 100%;
            position: relative;
            .text {
              position: absolute;
              top: 5px;
              right: 5px;
              z-index: 9;
              // transform: translate(-50%, -50%);
              font-size: 12px;
              color: #fff;
              background-color: #5098fe5b;
              border-radius: 10px;
              border: 1px solid #fff;
              padding: 4px 8px;
            }
          }
        }
      }
      .my-label-warp {
        margin-top: 20px;
        background-color: var(--bg-content-color);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        .title {
          font-size: 22px;
          color: var(--text-color);
          margin-bottom: 10px;
        }
        .content-warp {
          display: flex;
          flex-wrap: wrap;
          .my-label-item {
            padding: 4px 10px;
            border-radius: 20px;
            margin: 5px;
            color: #fff;
            border: 1px solid var(--text-color-2);
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .m-me-container-warp {
    .max-width-warp {
      width: var(--content-max-width-m) !important;
      .avatar-warp {
        width: 100px !important;
        height: 100px !important;
        .avatar-img {
          width: 60px !important;
          height: 60px !important;
          top: 50% !important;
          right: 50% !important;
          transform: translate(50%, -50%);
          z-index: 99;
        }
      }
      .saying-text {
        font-size: 12px !important;
        padding: 2px 4px !important;
      }
      .info-1-item {
        width: 100% !important;
      }
      .info-warp-2 {
        flex-direction: column !important;
        .visit-warp {
          width: 100% !important;
        }
        .hobby-warp {
          margin-top: 20px;
          margin-left: 0px !important;
        }
      }
    }
  }
}

@keyframes upDown {
  0% {
    transform: translateY(8px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(8px);
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes scrollText {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes swing {
  0% {
    transform: rotate(18deg);
  }
  100% {
    transform: rotate(-18deg);
  }
}
@keyframes changeColor {
  0% {
    filter: hue-rotate(180deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>

<style lang="scss">
.dark {
  .me-warp {
    background-color: #5098fe41 !important;
  }
}
</style>
