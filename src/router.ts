import Vue from 'vue';
import Router from 'vue-router';
import Empty from './views/layouts/Empty.vue';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    component: Empty,
    children: [
      {
        path: '/accounts/signup',
        name: 'SignUp',
        component: () => import('./views/pages/SignUp.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue'),
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
