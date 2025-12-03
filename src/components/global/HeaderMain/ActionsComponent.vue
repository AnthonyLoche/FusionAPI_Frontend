<template>
  <div class="actions">
    <v-btn class="cart-btn" icon variant="text" @click="goToCart">
      <v-icon>mdi-cart-outline</v-icon>
      <span v-if="cartItems" class="cart-badge">{{ cartItems }}</span>
    </v-btn>

    <div v-if="isLoggedIn" class="user-menu-container">
      <v-btn class="account-btn" variant="text" @click="toggleUserMenu">
        <v-icon>mdi-account-circle-outline</v-icon>
        <span>{{ userName }}</span>
        <v-icon class="chevron-icon" :class="{ 'rotate-180': userMenuOpen }">
          mdi-chevron-down
        </v-icon>
      </v-btn>

      <transition name="slide-fade">
        <div v-if="userMenuOpen" class="user-menu">
          <div class="user-menu-header">
            <div class="user-avatar">
              <v-icon color="var(--color-primary)" size="40">
                mdi-account-circle
              </v-icon>
            </div>
            <div class="user-info">
              <div class="user-name">{{ userName }}</div>
              <div class="user-email">{{ currentUser?.email }}</div>
            </div>
          </div>


          <div class="user-menu-items">
            <button class="menu-item" @click="goToProfile">
              <v-icon size="18">mdi-account-outline</v-icon>
              <span>Meu Perfil</span>
            </button>

            <button class="menu-item" @click="goToOrders">
              <v-icon size="18">mdi-clipboard-list-outline</v-icon>
              <span>Meus Pedidos</span>
            </button>

            <button class="menu-item" @click="goToWishlist">
              <v-icon size="18">mdi-heart-outline</v-icon>
              <span>Favoritos</span>
            </button>

            <button v-if="currentUser?.isAdmin" class="menu-item" @click="goToAdmin">
              <v-icon size="18">mdi-cog-outline</v-icon>
              <span>Administração</span>
            </button>

            <div class="divider"></div>

            <button class="menu-item logout" @click="handleLogout">
              <v-icon size="18">mdi-logout</v-icon>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </transition>
    </div>

    <router-link v-else to="/login" class="account-btn">
      <v-btn class="login-btn" variant="text">
        <v-icon>mdi-account-circle-outline</v-icon>
        <span>Minha Conta</span>
      </v-btn>
    </router-link>
  </div>

  <div v-if="userMenuOpen" class="menu-overlay" @click="userMenuOpen = false" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenuOpen = ref(false)

const props = defineProps({
  cartItems: {
    type: Number,
    default: 2
  },
  isLoggedIn: {
    type: Boolean,
    default: true
  },
  currentUser: {
    type: Object,
    default: () => ({})
  }
})

const userName = computed(() => {
  if (!props.currentUser) return 'Minha Conta'
  return props.currentUser?.name || props.currentUser?.email?.split('@')[0] || 'Usuário'
})

watch(() => route.path, () => {
  userMenuOpen.value = false
})

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

</script>

<style scoped>
.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;
}

.account-btn,
.cart-btn,
.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 0.9rem;
  transition: color 0.2s;
  position: relative;
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  min-width: auto;
}

.account-btn:hover,
.cart-btn:hover,
.login-btn:hover {
  color: var(--color-primary, #009688);
  background: rgba(0, 150, 136, 0.05);
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: var(--color-primary, #009688);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  z-index: 1;
}

.user-menu-container {
  position: relative;
}

.account-btn .chevron-icon {
  transition: transform 0.3s ease;
  margin-left: 2px;
}

.account-btn .chevron-icon.rotate-180 {
  transform: rotate(180deg);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1001;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  animation: fadeIn 0.2s ease-out;
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8f9fa;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.875rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 0.5rem 0;
}

.user-menu-items {
  padding: 0.5rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #4a5568;
  font-size: 0.9rem;
  font-family: inherit;
  text-align: left;
}

.menu-item:hover {
  background-color: #f7fafc;
}

.menu-item.logout {
  color: #e53e3e;
}

.menu-item.logout:hover {
  background-color: #fed7d7;
}

.menu-item .v-icon {
  flex-shrink: 0;
  color: inherit;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1000;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .account-btn span,
  .login-btn span {
    display: none;
  }

  .user-menu {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    border-radius: 16px 16px 0 0;
    min-width: auto;
    max-height: 70vh;
    overflow-y: auto;
  }

  .user-menu-header {
    padding: 1.5rem 1rem;
  }

  .account-btn .chevron-icon {
    display: none;
  }
}

@media (max-width: 480px) {
  .user-menu {
    min-width: auto;
    width: calc(100vw - 2rem);
    right: 1rem;
    left: 1rem;
    margin: 0 auto;
  }
}

.account-btn:focus-visible,
.cart-btn:focus-visible,
.menu-item:focus-visible {
  outline: 2px solid var(--color-primary, #009688);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>