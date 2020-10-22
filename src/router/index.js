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
    meta: {
      keepAlive: true,
    },
  },

  {
    path: '/products/:id',
    component: () => import('../views/ProductInfo.vue'),
  },
  {
    path: '/getOrderInfo',
    name: 'GetOrderInfo',
    component: () => import('../views/GetOrderInfo.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/orderInfo/:id',
    name: 'OrderInfo',
    component: () => import('../views/OrderInfo.vue'),
  },
  {
    path: '/admin',
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
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
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
