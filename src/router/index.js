// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { AdminLayout } from '@/layouts'

const routes = [
  {
    path: '/',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { 
      requiresAuth: true,
      title: 'Administração'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { 
          title: 'Dashboard',
          description: 'Visão geral e métricas do sistema',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' }
          ]
        }
      },
      {
        path: 'produtos',
        component: () => import('@/views/admin/ProdutosView.vue'),
        meta: { 
          title: 'Produtos',
          description: 'Gerenciamento de produtos',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Produtos', disabled: true }
          ]
        }
      },
      {
        path: 'clientes',
        component: () => import('@/views/admin/ClientesView.vue'),
        meta: { 
          title: 'Clientes',
          description: 'Gerenciamento de clientes',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Clientes', disabled: true }
          ]
        }
      },
      {
        path: 'pedidos',
        component: () => import('@/views/admin/PedidosView.vue'),
        meta: { 
          title: 'Pedidos',
          description: 'Gerenciamento de pedidos',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Pedidos', disabled: true }
          ]
        }
      },
      {
        path: 'marcas',
        component: () => import('@/views/admin/MarcasView.vue'),
        meta: { 
          title: 'Marcas',
          description: 'Gerenciamento de marcas',
          breadcrumbs: [
            { title: 'Dashboard', disabled: false, href: '/admin/dashboard' },
            { title: 'Marcas', disabled: true }
          ]
        }
      },
    ]
  },
  // Outras rotas públicas
  // {
  //   path: '/login',
  //   component: () => import('@/views/auth/LoginView.vue'),
  //   meta: { title: 'Login' }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router