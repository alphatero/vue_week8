import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupon.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Orders.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/Checkout.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/Product.vue'),
      },
    ],
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
