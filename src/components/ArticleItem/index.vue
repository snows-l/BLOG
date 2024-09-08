<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-08 16:11:46
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-08 16:25:04
 * @FilePath: /BLOG/src/components/ArticleItem/index.vue
-->
<template>
  <div class="img-left item-warp" v-if="index % 2 === 0">
    <div class="cover-img-warp">
      <LImg class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :fit="isMobi ? 'contain' : ''" :isUnPreview="true" />
    </div>
    <div class="item-content">
      <div class="create-time">
        <div class="time-warp">
          <IconCalendar class="iconfont"></IconCalendar>
          <span>发布于：</span>
          <span class="time">{{ item.createTime }}</span>
        </div>
        <div class="type">
          <IconLabel class="iconfont"></IconLabel>
          {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
        </div>
      </div>
      <div class="article-title">
        {{ item.title }}
      </div>
      <div class="auth-info-warp">
        <div>
          <img :src="state.avatar" alt="" />
          <span>snows_l</span>
        </div>
        <div>
          <IconHot class="iconfont"></IconHot>
          <span>{{ item.readCount || 0 }}</span>
        </div>
        <div>
          <IconComment :size="18" class="iconfont"></IconComment>
          <span>{{ item.commentCount || 0 }}</span>
        </div>
        <div>
          <IconShare class="iconfont" :size="20"></IconShare>
          <span>{{ item.shareCount || 0 }}</span>
        </div>
      </div>
      <div class="article-des text">
        {{ item.subTitle }}
      </div>
    </div>
  </div>
  <div class="img-right item-warp" v-else>
    <div class="item-content">
      <div class="create-time">
        <div class="time-warp">
          <IconCalendar class="iconfont"></IconCalendar>
          <span>发布于：</span>
          <span class="time">{{ item.createTime }}</span>
        </div>
        <div class="type">
          <IconLabel class="iconfont"></IconLabel>
          {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
        </div>
      </div>
      <div class="article-title">
        {{ item.title }}
      </div>
      <div class="auth-info-warp">
        <div>
          <img :src="state.avatar" alt="" />
          <span>snows_l</span>
        </div>
        <div>
          <IconHot class="iconfont"></IconHot>
          <span>{{ item.readCount || 0 }}</span>
        </div>
        <div>
          <IconComment :size="18" class="iconfont"></IconComment>
          <span>{{ item.commentCount || 0 }}</span>
        </div>
        <div>
          <IconShare class="iconfont" :size="20"></IconShare>

          <span>{{ item.shareCount || 0 }}</span>
        </div>
      </div>
      <div class="article-des text">
        {{ item.subTitle }}
      </div>
    </div>
    <div class="cover-img-warp">
      <LImg class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :isUnPreview="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = {
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  articleTypeList: {
    type: Array,
    required: true
  },
  isMobi: {
    type: Boolean,
    required: true
  }
};

const state = reactive({
  avatar: ''
});
</script>

<style lang="scss" scoped>
.container-warp {
  width: 100%;
  height: 100%;
}
</style>
