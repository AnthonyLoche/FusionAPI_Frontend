<template>
  <div class="logo" @click="handleClick">
    <div class="logo-icon">
      <img src="@/assets/images/LogoFusion.png" alt="Logo Fusion Virtual">
    </div>
    <span class="logo-text">Fusion Virtual</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/')
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon img {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }
}
</style>