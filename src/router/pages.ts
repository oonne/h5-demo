import type { RouteRecordRaw } from 'vue-router';

const pages: RouteRecordRaw[] = [
  // 首页
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
  },

  // 详情页
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/pages/detail/index.vue'),
  },
];

export default pages;
