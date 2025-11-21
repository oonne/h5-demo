import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
// import VConsole from 'vconsole';

/* 初始化 */
const bootstrap = async () => {
  const app = createApp(App);

  // 路由
  app.use(router);
  await router.isReady();

  // 挂载应用
  app.mount('#app');
  // 初始化调试工具
  // (() => new VConsole())();
};

bootstrap();
