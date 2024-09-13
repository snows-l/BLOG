// 在你的 Vue 应用中的 directives.js 或类似文件
import Img from '@/assets/images/common/loading.svg';
import type { App } from 'vue';

function createLoading(el: HTMLElement, isShow: boolean) {
  if (el.querySelector('#loading-view')) {
    el.removeChild(el.querySelector('#loading-view'));
  }

  const loadingView = document.createElement('div');
  loadingView.id = 'loading-view';
  loadingView.style.position = 'absolute';
  loadingView.style.top = '50%';
  loadingView.style.left = '50%';
  loadingView.style.transform = 'translate(-50%, -50%)';

  const img = document.createElement('img');
  img.src = Img;
  img.style.width = '100px';
  img.style.height = '100px';
  img.style.margin = 'auto';
  img.style.display = 'block';

  loadingView.appendChild(img);
  el.appendChild(loadingView);
  if (isShow) {
    loadingView.style.display = 'block';
  } else {
    loadingView.style.display = 'none';
  }
}

const loadingDirective = {
  beforeMount(el: HTMLElement, binding: any) {
    if (binding.value) {
      el.style.setProperty('position', 'relative'); // 防止元素被覆盖
      createLoading(el, true);
    }
  },
  updated(el: HTMLElement, binding: any) {
    if (binding.value) {
      el.style.setProperty('position', 'relative'); // 防止元素被覆盖
      createLoading(el, true);
    } else {
      el.style.setProperty('position', 'relative'); // 防止元素被覆盖
      createLoading(el, false);
    }
  }
};

// 注册自定义指令
export default {
  install(app: App) {
    app.directive('loading', loadingDirective);
  }
};
