<template>
  <div class="search">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      @keyup.enter="handleSearch"
    >
    <button class="search-btn" @click="handleSearch">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="white" stroke-width="2" />
        <path d="M21 21L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

defineProps({
  placeholder: {
    type: String,
    default: 'Buscar produtos, marcas e muito mais...'
  }
})

const emit = defineEmits(['search'])

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    emit('search', query)
    router.push({
      path: '/busca',
      query: { q: query }
    })
  }
}
</script>

<style scoped>
.search {
  flex: 1;
  display: flex;
  position: relative;
}

.search input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.search input:focus {
  border-color: var(--color-primary, #009688);
}

.search input::placeholder {
  color: #999;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 1rem;
  background: var(--color-primary, #009688);
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #00796b;
}
</style>