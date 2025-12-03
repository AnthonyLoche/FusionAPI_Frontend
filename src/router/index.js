// router/index.js
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
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: {
          title: 'Dashboard',
          description: 'Visão geral e métricas do sistema',
          breadcrumbs: [{ title: 'Dashboard', disabled: false, href: '/admin/dashboard' }],
        },
      },
      {
        path: 'produtos',
        component: () => import('@/views/admin/ProdutosView.vue'),
        meta: {
          title: 'Produtos',
          description: 'Gerenciamento de produtos',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Produtos', disabled: true },
          ],
        },
      },
      {
        path: 'clientes',
        component: () => import('@/views/admin/ClientesView.vue'),
        meta: {
          title: 'Clientes',
          description: 'Gerenciamento de clientes',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Clientes', disabled: true },
          ],
        },
      },
      {
        path: 'pedidos',
        component: () => import('@/views/admin/PedidosView.vue'),
        meta: {
          title: 'Pedidos',
          description: 'Gerenciamento de pedidos',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Pedidos', disabled: true },
          ],
        },
      },
      {
        path: 'marcas',
        component: () => import('@/views/admin/MarcasView.vue'),
        meta: {
          title: 'Marcas',
          description: 'Gerenciamento de marcas',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Marcas', disabled: true },
          ],
        },
      },
    ],
  },
  {
    path: '/blank',
    component: BlankLayout,
    children: [{ path: '', component: Views.HomeView }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
