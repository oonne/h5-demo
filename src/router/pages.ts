import type { RouteRecordRaw } from 'vue-router';

const pages: RouteRecordRaw[] = [
  // 首页
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
  },
];

export default pages;
