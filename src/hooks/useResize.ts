/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 19:54:11
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-12 17:30:57
 * @FilePath: /blog/src/hooks/useResize.js
 */
import { isMobile } from '@/utils/common';
import { onMounted, onUnmounted, ref } from 'vue';
export default function useResize() {
  let isMobi = ref(isMobile());
  // 监听屏幕大小变化
  const resizeCallback = () => {
    isMobi.value = isMobile();
  };

  onMounted(() => {
    window.addEventListener('resize', resizeCallback);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCallback);
  });

  return {
    isMobi
  };
}
