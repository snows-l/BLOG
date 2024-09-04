/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-04 21:48:54
 * @FilePath: /BLOG/vite.config.ts
 */
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import ElementPlus from 'unplugin-element-plus/vite'; // 引入ElementPlus插件
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const config = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(), ElementPlus()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: { optimizeDeps: { include: '*' }, input: '/index.html' }
    },

    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        [config.VITE_DEV_BASE_URL]: {
          target: config.VITE_CURRENT_ENV == 'dev' ? config.VITE_DEV_BASE_SERVER : config.VITE_PROD_BASE_SERVER,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/bg': {
          target: 'https://gitcode.net',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/bg/, '')
        }
      }
    }
  };
});
