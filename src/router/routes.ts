import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layouts/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'explore',
        component: () => import('@/pages/explore/index.vue'),
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/pages/shop/index.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('@/pages/message/index.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/user/index.vue'),
      },
    ],
  },
];

export default routes;