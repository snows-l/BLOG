/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-30 23:09:59
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-10-01 15:48:21
 * @FilePath: /BLOG/src/hooks/useIntersectionObserver.ts
 */
export default function () {
  const intersectionObserver = (selector: string) => {
    let obserer = new IntersectionObserver(entries => {
      entries.forEach(
        entry => {
          let target = entry.target as HTMLElement;
          const rect = entry.boundingClientRect; // 获取元素的位置信息
          // if (rect.top > 0) {
          if (entry.isIntersecting) {
            target.style.transition = 'all 0.2s ease-in-out';
            target.style.transform = 'scale(1)';
          } else {
            target.style.transition = 'all 0.2s ease-in-out';
            target.style.transform = 'scale(0.75)';
          }
          // }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0
        }
      );
    });
    let articleItems = document.querySelectorAll(selector);

    // 元素进入可视区域时添加动画效果 离开可视区域时移除动画效果
    articleItems.forEach(item => {
      obserer.observe(item);
    });
  };

  return {
    intersectionObserver
  };
}
