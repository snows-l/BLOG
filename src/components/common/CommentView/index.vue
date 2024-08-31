<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-31 12:42:12
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-31 14:33:56
 * @FilePath: /BLOG/src/components/common/CommentView/index.vue
-->
<template>
  <div class="comment-view-container" :class="{ 'm-comment-view-container': isMobi }">
    <div class="max-width-center">
      <div class="comment-view-content">
        <div class="comment-item" v-for="item in state.list" :key="item.id">
          <div class="info-warp pointer" @click="handleComent(item)">
            <div class="avatar-warp">
              <img :src="item.avatar" />
            </div>
            <div class="info">
              <div class="nick-name">{{ item.nickName }}</div>
              <div class="time-add">
                <span>{{ getTime(item.time) }}</span>
                <span style="margin-left: 10px">归属地：{{ item.city }}</span>
              </div>
            </div>
          </div>
          <div class="content pointer" @click="handleComent(item)">
            {{ item.content }}
          </div>
          <div class="sub-comment">
            <div class="sub-padding">
              <div class="sub-comment-item pointer" @click="handleComent(subItem)" v-for="subItem in item.children" :key="subItem.id">
                <div class="title">
                  <span>{{ subItem.nickName }}</span>
                  回复
                  <span>{{ subItem.to }}：</span>
                </div>
                <div class="sub-content">{{ subItem.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-warp">
        <!-- v-if="articleId != state.form.id" -->
        <div class="input-title">回复：{{ state.form.nickName }}</div>
        <CommentInput></CommentInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useResize from '@/hooks/useResize';
import { getTime } from '@/utils/common';
import { reactive } from 'vue';
const { isMobi } = useResize();

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
});

const state = reactive({
  list: [
    {
      id: 1,
      avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: 'snows_l',
      time: '2024-08-31 12:42:12',
      city: '北京',
      content:
        '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
      children: [
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        }
      ]
    },
    {
      id: 1,
      avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: 'snows_l',
      time: '2024-08-31 12:42:12',
      city: '北京',
      content:
        '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
      children: [
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        }
      ]
    },
    {
      id: 1,
      avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: 'snows_l',
      time: '2024-08-31 12:42:12',
      city: '北京',
      content:
        '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
      children: [
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        },
        {
          id: 2,
          to: 'snows_l',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          nickName: 'keke',
          time: '2024-08-31 12:42:12',
          city: '北京',
          content: '子评论内容子评论内容子评论内容子评论内容子评论内容子评论内容'
        }
      ]
    }
  ],
  form: {}
});

const handleComent = row => {
  state.form = row;
};
</script>

<style lang="scss" scoped>
.comment-view-container {
  margin-top: 20px;
  width: 100%;
  .max-width-center {
    border-radius: 15px;
    height: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    .comment-view-content {
      .comment-item {
        border-radius: 5px;
        background-color: var(--bg-warp-light-color-2);
        padding: 15px;
        padding-bottom: 30px;
        margin: 15px 0;
        .info-warp {
          display: flex;
          padding: 10px;
          align-items: space-around;
          .avatar-warp {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 12px;
          }
        }
        .content {
          padding-left: 60px;
          line-height: 20px;
          font-size: 14px;
        }
        .sub-comment {
          margin-top: 10px;
          padding-left: 60px;
          .sub-padding {
            background-color: var(--bg-warp-color);
            border-radius: 5px;
            padding: 10px 20px;
            .sub-comment-item {
              margin: 5px 0;
              .title {
                font-size: 12px;
                line-height: 20px;
              }
              .sub-content {
                line-height: 20px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .input-warp {
      .input-title {
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
}
.m-comment-view-container {
  width: 96%;
}
</style>
