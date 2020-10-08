import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { fb } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    // name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue'),
      },
      {
        path: '',
        name: 'Admin',
        component: () => import('../views/AdminProducts.vue'),
      },
    ],
  },
  {
    path: '*',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const { currentUser } = fb.auth();
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    }
    next();
  } else {
    next();
  }
});

export default router;
