/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 19:54:11
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 20:08:17
 * @FilePath: /BLOG/src/hooks/useResize.js
 */
import { isMobile } from '@/utils/common';
import { onMounted, onUnmounted, reactive } from 'vue';
export default function useResize() {
  const state = reactive({
    isMobile: isMobile()
  });
  // 监听屏幕大小变化
  const resizeCallback = () => {
    state.isMobile = isMobile();
  };

  onMounted(() => {
    window.addEventListener('resize', resizeCallback);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCallback);
  });

  return {
    isMobile: state.isMobile
  };
}
