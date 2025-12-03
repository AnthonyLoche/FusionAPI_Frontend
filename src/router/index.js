import { createRouter, createWebHistory } from 'vue-router'
import { AdminLayout, BlankLayout } from '@/layouts'
import { Views } from '@/views'

const routes = [
  {
    path: '/',
    component: Views.HomeView,
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [{ path: 'dashboard', component: Views.DashboardView }],
  },
  {
    path: '/blank',
    component: BlankLayout,
    children: [
      { path: '', component: Views.HomeView },
      { path: 'home', component: Views.HomeView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
