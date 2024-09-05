<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-03 20:06:29
 * @FilePath: /BLOG/src/views/about/me/index.vue
-->
<template>
  <div class="me-out-warp">
    <PageTopCover :moduleTitle="'本大大'" :icon="'icon-guanyu'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
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
              <div class="chart qq">
                <img :src="iconQQ" />
                <span>37523953</span>
              </div>
              <div class="chart wx">
                <img :src="iconWeixin" />
                <span>snows__l</span>
              </div>
              <div class="chart email">
                <img :src="iconEmail" />
                <span>snows_l@163.com</span>
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
              <div class="back-warp">
                <div class="jishu-item" :style="{ 'background-color': item.color }" v-for="item in state.skillList" :key="item.text">
                  <img style="width: 16px; height: 16px" v-if="item.img" :src="item.img" alt="" />
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </div>
            <svg class="time-24" t="1723019580232" viewBox="0 0 1193 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5530" width="200" height="200">
              <path d="M587.60533331 143.70133299m-69.461333 0a69.461333 69.461333 0 1 0 138.922666 0 69.461333 69.461333 0 1 0-138.922666 0Z" fill="#FFD300" p-id="5531"></path>
              <path
                data-v-cab67008=""
                d="M1025.02400031 503.29599999a93.013333 93.013333 0 0 0-93.184-93.184H258.04800031a93.184 93.184 0 0 0-93.184 93.184v335.701333a93.354667 93.354667 0 0 0 93.184 92.672h673.792a93.184 93.184 0 0 0 93.184-93.354666z m-563.2 306.176H276.30933331l89.941333-167.936a42.496 42.496 0 0 0 6.314667-19.797333c0-10.24-6.314667-15.36-19.285333-15.36a18.602667 18.602667 0 0 0-18.773334 18.602666 22.016 22.016 0 0 0 7.168 15.872l-35.669333 64.341334a97.450667 97.450667 0 0 1-18.090667-151.722667 92.842667 92.842667 0 0 1 68.266667-28.672 91.818667 91.818667 0 0 1 69.290667 29.184 95.914667 95.914667 0 0 1 27.818666 68.266667 87.210667 87.210667 0 0 1-10.581333 41.984l-32.426667 62.634666h51.2z m245.76 0h-81.92V597.67466699l-40.618667 68.266666h20.138667v60.928h-111.616L576.00000031 532.30933299h131.584z m215.04 0h-71.68v-106.837333c0-8.362667-6.656-14.165333-8.362667-17.066667a10.410667 10.410667 0 0 0-10.069333-4.778667c-8.704 0-12.288 6.485333-12.288 19.285334v109.738666h-71.68V532.99199999h71.68v83.456a52.394667 52.394667 0 0 1 35.328-14.165333 60.074667 60.074667 0 0 1 47.957333 21.162666 88.576 88.576 0 0 1 19.114667 57.856z"
                fill="#BBDCFF"
                p-id="5532"></path>
              <path
                data-v-cab67008=""
                d="M278.18666631 377.68533299l231.765334-216.746666a79.530667 79.530667 0 0 0 155.477333 0l234.154667 216.746666a10.410667 10.410667 0 0 0 6.997333 2.730667 10.069333 10.069333 0 0 0 7.509333-3.242667 10.24 10.24 0 0 0 0-14.506666L666.28266631 133.11999999a79.36 79.36 0 0 0-157.354666 0L265.04533331 362.66666699a10.069333 10.069333 0 0 0 0 14.506666 10.410667 10.410667 0 0 0 13.141333 0.512zM587.60533331 84.47999999a59.221333 59.221333 0 1 1-59.221333 59.221333 59.221333 59.221333 0 0 1 59.221333-59.221333z m-109.568 653.312H610.13333331v81.92h102.4V522.06933299h-143.36z m132.096-81.92h-8.192l8.192-16.042667z m81.92-112.64v256h-61.44V556.20266699l-62.293333 119.466666h20.992v40.96h-80.384l73.728-174.08z m-239.274667 125.781333a98.816 98.816 0 0 0 11.605334-46.762666 106.496 106.496 0 0 0-30.72-75.434667 102.4 102.4 0 0 0-76.629334-32.256 103.765333 103.765333 0 0 0-76.117333 31.744 105.130667 105.130667 0 0 0-31.232 75.946667 103.936 103.936 0 0 0 51.2 91.477333l9.216 5.973333 44.544-79.872-5.461333-5.461333a12.288 12.288 0 0 1-4.096-8.704 7.850667 7.850667 0 0 1 2.389333-5.973333 8.021333 8.021333 0 0 1 6.144-2.389334c9.045333 0 9.045333 2.389333 9.045333 5.12a36.010667 36.010667 0 0 1-4.949333 15.018667L259.24266631 819.71199999H466.77333331v-102.4h-39.594667z m-6.144 68.266667v61.44h-153.6l81.749334-152.234667a51.2 51.2 0 0 0 7.509333-24.576c0-5.973333-2.048-25.6-29.525333-25.6a28.842667 28.842667 0 0 0-29.013334 28.842667 30.208 30.208 0 0 0 5.12 17.066667l-26.624 47.616a81.749333 81.749333 0 0 1-32.938666-68.266667 84.309333 84.309333 0 0 1 25.429333-61.610667 82.090667 82.090667 0 0 1 61.44-25.6 81.237333 81.237333 0 0 1 62.464 26.624 85.333333 85.333333 0 0 1 25.088 61.269334 75.776 75.776 0 0 1-9.386667 37.205333l-40.789333 78.336z m406.357334-145.237333a70.656 70.656 0 0 0-27.818667 5.802666v-75.776h-92.16v296.96h92.16v-119.466666c0-9.045333 2.56-9.045333 3.413333-9.045334h2.730667a21.504 21.504 0 0 1 3.754667 11.093334v117.077333h92.16v-137.386667a99.498667 99.498667 0 0 0-20.138667-64.512 68.266667 68.266667 0 0 0-54.101333-24.746666z m54.101333 207.189333h-51.2v-96.597333a39.594667 39.594667 0 0 0-6.656-21.333334v-1.024a22.186667 22.186667 0 0 0-20.992-10.069333c-11.605333 0-23.893333 7.850667-23.893333 29.525333v99.498667h-51.2v-256h51.2v96.597333l17.066666-15.872a49.834667 49.834667 0 0 1 69.632 5.973334 78.848 78.848 0 0 1 15.530667 51.2z m19.456-399.36H252.75733331A103.594667 103.594667 0 0 0 149.33333331 503.29599999v335.701333a103.594667 103.594667 0 0 0 103.424 103.594667h673.792a103.594667 103.594667 0 0 0 103.424-103.594667V503.29599999a103.594667 103.594667 0 0 0-103.424-103.424z m82.944 439.125333a83.114667 83.114667 0 0 1-82.944 83.114667H252.75733331a83.114667 83.114667 0 0 1-82.944-83.114667V503.29599999a83.114667 83.114667 0 0 1 82.944-83.626667h673.792a83.114667 83.114667 0 0 1 82.944 82.944z"
                fill="#3989FF"
                p-id="5533"></path>
            </svg>
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
                <!-- <div class="visit-item-num">19</div> -->
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
                <!-- <div class="visit-item-num">15</div> -->
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
                <!-- <div class="visit-item-num">1295</div> -->
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
                <!-- <div class="visit-item-num">5499</div> -->
              </div>
            </div>
          </div>
          <div class="hobby-warp">
            <div class="title">HOBBY</div>
            <el-carousel style="margin-top: 20px" height="140px" :type="!isMobi ? 'card' : ''" :interval="2000" :loop="true">
              <el-carousel-item v-for="item in state.hobbyList" :key="item.name">
                <div class="hobby-item-item">
                  <div class="text">{{ item.name }}</div>
                  <Img style="width: 100%; height: 100%" :src="item.img" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getBlogVisit } from '@/api/common';
import coverImg from '@/assets/images/bg/cover-about.png';
import hobbyChiji from '@/assets/images/bg/hobby-chiji.jpg';
import hobbyQx from '@/assets/images/bg/hobby-qixing.jpg';
import hobbyWangzhe from '@/assets/images/bg/hobby-wangzhe.jpg';
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
  ]
});

const getBlogVisitFn = () => {
  getBlogVisit().then(res => {
    if (res.code === 200) {
      state.blogVisitTotal = res.data;
    }
  });
};
getBlogVisitFn();
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
          animation: upDown 6s ease-in-out 0s infinite normal none running;
        }
        .right-saying {
          align-items: flex-start;
          animation: upDown 6s ease-in-out 0s infinite normal none running;
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
            align-items: center;
            .chart {
              display: flex;
              align-items: center;
              margin-right: 20px;
              img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
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
            right: 20px;
            animation: swing 2s ease-in-out infinite alternate;
            top: 20px;
          }
        }
        .site-warp {
          padding: 20px;
          overflow: hidden;
          position: relative;
          .time-24 {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 60px;
            height: 60px;
            animation: swing 1.3s ease-in-out infinite alternate;
          }
          .before {
            display: block;
            transition: all 0.8s ease-in-out;
            .before-warp {
            }

            .tltle {
              font-size: 22px;
              color: var(--text-color);
              margin-bottom: 10px;
            }
            .content {
              padding: 6px 0;
              line-height: 24px;
              color: var(--text-color);
              text-indent: 28px;
              font-size: 15px;
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
                  color: var(--text-color);
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
              font-size: 24px;
              color: var(--text-color);
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
    transform: translateY(4px);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(4px);
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
</style>

<style lang="scss">
.dark {
  .me-warp {
    background-color: #5098fe41 !important;
  }
}
</style>
