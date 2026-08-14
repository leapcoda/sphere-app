import type { RouteRecordRaw } from 'vue-router';

import AppLayout from '@/layouts/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'explore',
        meta: { showNavBar: true },
        component: () => import('@/pages/explore/index.vue'),
      },
      {
        path: 'shop',
        name: 'shop',
        meta: { showNavBar: true },
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/error/NotFound.vue'),
  },
];

export default routes;