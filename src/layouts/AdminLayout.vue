<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="sidebar"
      :permanent="!isMobile"
      :rail="rail"
      rail-width="72"
      :temporary="isMobile"
      width="300"
    >
      <div class="sidebar-header">
        <div class="logo-section" @click="rail = false">
          <v-avatar class="logo-avatar" color="primary" size="44">
            <span class="logo-text">FV</span>
          </v-avatar>
          <transition name="fade">
            <div v-if="!rail" class="logo-info">
              <h1 class="logo-title">FUSION</h1>
              <span class="logo-subtitle">Fusion Virtual</span>
            </div>
          </transition>
        </div>
        <v-btn
          v-if="!isMobile"
          class="toggle-btn"
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          size="small"
          variant="text"
          @click="rail = !rail"
        />
      </div>

      <v-divider class="divider-custom" />

      <div class="nav-section">
        <span v-if="!rail" class="nav-label">Menu Principal</span>
        <v-list class="nav-list" density="compact" nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.route"
            :active="isActive(item.route)"
            class="nav-item"
            rounded="lg"
            :to="item.route"
          >
            <template #prepend>
              <v-icon :class="{ 'icon-active': isActive(item.route) }" :icon="item.icon" />
            </template>
            <v-list-item-title class="nav-item-title">{{ item.title }}</v-list-item-title>
            <template #append>
              <v-chip v-if="item.badge" class="badge-chip" size="x-small">
                {{ item.badge }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </div>

      <v-divider class="divider-custom" />

      <div class="nav-section">
        <span v-if="!rail" class="nav-label">Gerenciamento dos Dados</span>
        <v-list class="nav-list" density="compact" nav>
          <v-list-item
            v-for="item in cadastroItems"
            :key="item.route"
            :active="isActive(item.route)"
            class="nav-item"
            rounded="lg"
            :to="item.route"
          >
            <template #prepend>
              <v-icon :class="{ 'icon-active': isActive(item.route) }" :icon="item.icon" />
            </template>
            <v-list-item-title class="nav-item-title">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <template #append>
        <v-divider class="divider-custom" />
        <div class="sidebar-footer">
          <v-list class="nav-list" density="compact" nav>
            <v-list-item
              v-for="item in footerItems"
              :key="item.route"
              :active="isActive(item.route)"
              class="nav-item"
              rounded="lg"
              :to="item.route"
            >
              <template #prepend>
                <v-icon :icon="item.icon" />
              </template>
              <v-list-item-title class="nav-item-title">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <div v-if="!rail" class="user-section">
            <v-avatar class="user-avatar" size="36">
              <v-icon icon="mdi-account" size="20" />
            </v-avatar>
            <div class="user-info">
              <span class="user-name">Administrador</span>
              <span class="user-role">Super Admin</span>
            </div>
            <v-btn
              class="logout-btn"
              icon="mdi-logout"
              size="small"
              variant="text"
              @click="handleLogout"
            />
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar v-if="isMobile" class="mobile-header" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        <div class="d-flex align-center">
          <v-avatar class="logo-avatar mr-2" size="32">
            <span class="logo-text-small">FV</span>
          </v-avatar>
          <span class="mobile-title">Fusion Virtual</span>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="main-content">
      <div class="page-container">
        <!-- Breadcrumbs serão controlados pela rota -->
        <v-breadcrumbs v-if="breadcrumbs.length > 0" class="breadcrumb" :items="breadcrumbs">
          <template #divider>
            <v-icon icon="mdi-chevron-right" size="small" />
          </template>
        </v-breadcrumbs>

        <!-- Header será controlado pela rota -->
        <header v-if="pageTitle" class="page-header">
          <div class="header-content">
            <div>
              <h1 class="page-title">{{ pageTitle }}</h1>
              <p v-if="pageDescription" class="page-description">{{ pageDescription }}</p>
            </div>
            <div class="header-actions">
              <slot name="header-actions" />
            </div>
          </div>
        </header>

        <!-- CONTEÚDO DAS PÁGINAS VIA ROUTER-VIEW -->
        <main class="page-content">
          <router-view />
        </main>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const drawer = ref(true)
const rail = ref(false)
const isMobile = ref(false)

// Data from route meta or computed
const pageTitle = computed(() => route.meta?.title || '')
const pageDescription = computed(() => route.meta?.description || '')
const breadcrumbs = computed(() => route.meta?.breadcrumbs || [])

const menuItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', route: '/admin/dashboard' },
  { title: 'Produtos', icon: 'mdi-cube-outline', route: '/admin/produtos' },
  { title: 'Clientes', icon: 'mdi-account', route: '/admin/clientes' },
  { title: 'Pedidos', icon: 'mdi-cart-outline', route: '/admin/pedidos' },
]

const cadastroItems = [
  { title: 'Marcas', icon: 'mdi-tag-multiple-outline', route: '/admin/marcas' },
]

const footerItems = [
  { title: 'Relatórios', icon: 'mdi-chart-box-outline', route: '/admin/relatorios' },
  { title: 'Configurações', icon: 'mdi-cog-outline', route: '/admin/configuracoes' },
]

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) {
    drawer.value = false
    rail.value = false
  }
}

const isActive = (itemRoute) => {
  const currentPath = route.path
  
  // Caso especial para a rota '/admin' - só ativa quando exatamente '/admin'
  if (itemRoute === '/admin') {
    return currentPath === '/admin'
  }
  
  // Para outras rotas, verifica se começa com a rota
  return currentPath === itemRoute || 
         (currentPath.startsWith(itemRoute + '/') && itemRoute !== '/')
}

const handleLogout = () => {
  // Implementar lógica de logout
  router.push('/login')
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
<style>
/* ========================================
   PALETA DE CORES - TEMA AZUL #0080FF
   ======================================== */
:root {
  /* Cores Primárias - Azul #0080FF */
  --color-primary: #0080FF;
  --color-primary-dark: #0066CC;
  --color-primary-darker: #0055AA;
  --color-primary-light: #3399FF;
  --color-primary-lighter: #66B3FF;

  /* Cor Secundária - Laranja #FF6B35 (complementar ao azul) */
  --color-secondary: #FF6B35;
  --color-secondary-dark: #E55A2B;
  --color-secondary-light: #FF8C66;

  /* Cores de Fundo baseadas na primária */
  --color-bg-main: #F8FBFF; /* Azul muito claro */
  --color-bg-sidebar: #FFFFFF; /* Branco puro */
  --color-bg-hover: #F0F7FF; /* Azul muito claro para hover */
  --color-bg-active: #E1F0FF; /* Azul claro para itens ativos */
  --color-bg-card: #FFFFFF;

  /* Cores de Texto */
  --color-text: #2C3E50; /* Azul escuro/grafite */
  --color-text-muted: #7F8C8D; /* Cinza azulado */
  --color-text-light: #95A5A6;

  /* Cores de Acento */
  --color-accent: var(--color-secondary); /* Usando a cor secundária */
  --color-success: #27AE60; /* Verde */
  --color-warning: #F39C12; /* Laranja amarelado */
  --color-error: #E74C3C; /* Vermelho */

  /* Bordas e Sombras */
  --color-border: rgba(0, 128, 255, 0.1); /* Azul muito transparente */
  --color-border-light: rgba(0, 128, 255, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 128, 255, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 128, 255, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 128, 255, 0.2);

  /* UI */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ========================================
   APLICAÇÃO DAS CORES
   ======================================== */

/* Fundo da Aplicação Principal */
.v-application {
  background-color: var(--color-bg-main) !important;
}

.page-container{
    height: 100vh ;
    overflow-y: auto;
    scrollbar-width: none;
}

/* Barra Lateral - Fundo branco com borda sutil */
.sidebar {
  height: 100vh !important;
  background: linear-gradient(180deg, var(--color-bg-sidebar) 0%, #FFFFFF 100%) !important;
  border-right: 1px solid var(--color-border) !important;
  box-shadow: 2px 0 8px rgba(0, 128, 255, 0.05); /* Sombra sutil azulada */
}

/* Fundo do Conteúdo Principal */
.main-content {
  background-color: var(--color-bg-main) !important;
}

/* Item de Navegação Ativo */
.nav-item.v-list-item--active {
  background-color: var(--color-bg-active) !important;
  border-left: 3px solid var(--color-primary) !important;
}

/* Cor dos Textos */
.v-list-item-title, .logo-title, .page-title, .mobile-title {
  color: var(--color-text) !important;
}

.logo-subtitle, .nav-label, .page-description, .v-list-item--active .v-icon {
  color: var(--color-text-muted) !important;
}

/* Ícones Ativos - Cor Primária */
.nav-item.v-list-item--active .v-icon {
  color: var(--color-primary) !important;
}

/* Avatar/Logo - Gradiente Azul */
.logo-avatar {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%) !important;
  box-shadow: 0 4px 12px rgba(0, 128, 255, 0.2);
}

/* Texto do Logo */
.logo-text, .logo-text-small {
  color: white !important;
  font-weight: 700;
}

/* Botão de Toggle */
.toggle-btn {
  color: var(--color-text-muted) !important;
}

.toggle-btn:hover {
  color: var(--color-primary) !important;
  background-color: var(--color-bg-hover) !important;
}

/* Hover nos Itens */
.nav-item:hover:not(.v-list-item--active) {
  background-color: var(--color-bg-hover) !important;
}

/* Divisores */
.divider-custom {
  border-color: var(--color-border) !important;
}

/* Badge - Cor Secundária */
.badge-chip {
  background-color: var(--color-secondary) !important;
  color: white !important;
  font-weight: 700;
}

/* Seção do Usuário */
.user-section {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  background-color: var(--color-bg-hover);
  margin-top: 8px;
}

.user-avatar {
  margin-right: 12px;
  background-color: var(--color-primary) !important;
  color: white !important;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.user-role {
  font-size: 11px;
  color: var(--color-text-muted);
}

.logout-btn {
  color: var(--color-text-muted) !important;
}

.logout-btn:hover {
  color: var(--color-secondary) !important;
}

/* ========================================
   ESTILOS ESTRUTURAIS (mantidos)
   ======================================== */

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 12px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-avatar {
  box-shadow: var(--shadow-md);
}

.logo-text {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo-text-small {
  font-size: 12px;
  font-weight: 700;
}

.logo-info {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.logo-subtitle {
  font-size: 11px;
  white-space: nowrap;
}

.divider-custom {
  margin: 8px 16px;
}

.nav-section {
  padding: 0 16px;
  margin-bottom: 16px;
}

.nav-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 12px 4px;
  display: block;
}

.nav-list {
  padding: 0 !important;
}

.nav-item {
  margin: 4px 0;
  padding: 0 12px;
  min-height: 44px;
  transition: var(--transition);
}

.nav-item-title {
  font-size: 14px;
  font-weight: 500;
}

.nav-item.v-list-item--active {
  box-shadow: var(--shadow-sm);
}

.nav-item .v-icon {
  transition: var(--transition);
}

.sidebar-footer {
  padding: 16px;
}

/* ========================================
   CONTEÚDO PRINCIPAL
   ======================================== */

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.breadcrumb {
  padding: 16px 0;
  color: var(--color-text-muted) !important;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.page-description {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

/* ========================================
   MOBILE
   ======================================== */

.mobile-header {
  background-color: var(--color-bg-sidebar) !important;
  border-bottom: 1px solid var(--color-border) !important;
  box-shadow: 0 2px 8px rgba(0, 128, 255, 0.05);
}

.mobile-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

/* ========================================
   EFEITOS E ANIMAÇÕES
   ======================================== */

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Suavizar transições */
.v-list-item {
  transition: var(--transition);
}

/* Efeito de profundidade para cards futuros */
.v-card {
  border: 1px solid var(--color-border) !important;
  box-shadow: var(--shadow-sm) !important;
}

.v-card:hover {
  box-shadow: var(--shadow-md) !important;
  transition: var(--transition);
}

/* Botões com cor secundária para destaque */
.v-btn--elevated {
  background-color: var(--color-primary) !important;
  color: white !important;
}

.v-btn--elevated:hover {
  background-color: var(--color-primary-dark) !important;
}

/* Botões secundários */
.v-btn--outlined {
  color: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
}

.v-btn--outlined:hover {
  background-color: var(--color-bg-hover) !important;
}

/* Ícones de alerta/destaque */
.v-icon--alert {
  color: var(--color-secondary) !important;
}

.v-icon--success {
  color: var(--color-success) !important;
}

.v-icon--warning {
  color: var(--color-warning) !important;
}

.v-icon--error {
  color: var(--color-error) !important;
}
</style>