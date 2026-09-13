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
        meta: { showNavBar: true, showTabBar: true },
        component: () => import('@/pages/explore/index.vue'),
      },
      {
        path: 'shop',
        name: 'shop',
        meta: { showNavBar: true, showTabBar: true },
        component: () => import('@/pages/shop/index.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('@/pages/message/index.vue'),
        meta: { showTabBar: true },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/user/index.vue'),
        meta: { showTabBar: true },
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/pages/search/index.vue'),
        meta: { showNavBar: true },
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