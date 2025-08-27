import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import Foods from '../pages/Foods.vue';
import FoodItems from '../pages/FoodItems.vue';
import Settings from '../pages/Settings.vue';
import ErrorLog from '../pages/ErrorLog.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/foods', component: Foods, meta: { requiresAuth: true } },
  { path: '/food-items', component: FoodItems, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/errors', component: ErrorLog, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
