<template>
  <div class="second-row">
    <div class="container">
      <div class="carousel-container">
        <button 
          class="carousel-nav prev"
          :class="{ 'hidden': !showNavButtons }"
          @click="scrollPrev"
          aria-label="Categorias anteriores"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </button>
        
        <div class="carousel-wrapper" ref="carouselRef">
          <nav class="categories" :style="{ transform: `translateX(${translateX}px)` }">
            <router-link
              v-for="(category, index) in duplicatedCategories"
              :key="`${category.name}-${index}`"
              :to="category.route"
              class="category-link"
              @click="handleCategoryClick(category)"
            >
              <span class="category-text">{{ category.name }}</span>
            </router-link>
          </nav>
        </div>
        
        <button 
          class="carousel-nav next"
          :class="{ 'hidden': !showNavButtons }"
          @click="scrollNext"
          aria-label="Próximas categorias"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
      
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const carouselRef = ref(null)
const translateX = ref(0)
const carouselWidth = ref(0)
const itemWidth = ref(120)
const isTransitioning = ref(false)

const props = defineProps({
  categories: {
    type: Array,
    default: () => [
      { name: 'Notebooks', route: '/categoria/notebooks' },
      { name: 'Teclados', route: '/categoria/teclados' },
      { name: 'Monitores', route: '/categoria/monitores' },
      { name: 'Placa de Vídeo', route: '/categoria/placas-de-video' },
      { name: 'Memória RAM', route: '/categoria/memoria-ram' },
      { name: 'Placa Mãe', route: '/categoria/placas-mae' },
      { name: 'Gabinete', route: '/categoria/gabinetes' },
      { name: 'Mouse', route: '/categoria/mouses' },
      { name: 'Cabos', route: '/categoria/cabos' },
      { name: 'Fontes', route: '/categoria/fontes' },
      { name: 'Processadores', route: '/categoria/processadores' },
      { name: 'Ofertas', route: '/ofertas', highlight: true }
    ]
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  scrollInterval: {
    type: Number,
    default: 3000
  },
  infinite: {
    type: Boolean,
    default: true
  }
})

const duplicatedCategories = computed(() => {
  return props.infinite 
    ? [...props.categories, ...props.categories, ...props.categories]
    : props.categories
})

const totalOriginalItems = computed(() => props.categories.length)
const totalDuplicatedWidth = computed(() => duplicatedCategories.value.length * itemWidth.value)
const showNavButtons = computed(() => carouselWidth.value > 0 && props.categories.length > 0)

const updateCarouselDimensions = () => {
  if (!carouselRef.value) return
  
  carouselWidth.value = carouselRef.value.clientWidth
  
  nextTick(() => {
    const firstItem = carouselRef.value?.querySelector('.category-link')
    if (firstItem) {
      itemWidth.value = firstItem.offsetWidth + 32
    }
  })
}

const scrollNext = () => {
  if (isTransitioning.value || !carouselWidth.value) return
  
  isTransitioning.value = true
  
  if (props.infinite) {
    const moveDistance = itemWidth.value
    
    if (Math.abs(translateX.value) >= totalDuplicatedWidth.value - carouselWidth.value * 2) {
      translateX.value = -((totalOriginalItems.value * itemWidth.value) + (moveDistance))
      setTimeout(() => {
        isTransitioning.value = false
        translateX.value = -(moveDistance)
      }, 300)
    } else {
      translateX.value -= moveDistance
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }
  } else {
    const maxScroll = Math.max(0, totalDuplicatedWidth.value - carouselWidth.value)
    const newTranslate = Math.max(-maxScroll, translateX.value - itemWidth.value)
    translateX.value = newTranslate
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

const scrollPrev = () => {
  if (isTransitioning.value || !carouselWidth.value) return
  
  isTransitioning.value = true
  
  if (props.infinite) {
    const moveDistance = itemWidth.value
    
    if (translateX.value >= 0) {
      translateX.value = -(totalDuplicatedWidth.value - carouselWidth.value * 2 - moveDistance)
      setTimeout(() => {
        isTransitioning.value = false
        translateX.value = -(totalDuplicatedWidth.value - carouselWidth.value * 3)
      }, 300)
    } else {
      translateX.value += moveDistance
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }
  } else {
    const newTranslate = Math.min(0, translateX.value + itemWidth.value)
    translateX.value = newTranslate
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

let autoScrollInterval = null

const startAutoScroll = () => {
  if (!props.autoScroll || !props.infinite || !showNavButtons.value) return
  
  autoScrollInterval = setInterval(() => {
    if (!isTransitioning.value) {
      scrollNext()
    }
  }, props.scrollInterval)
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

const resetToMiddle = () => {
  if (!props.infinite) return
  
  const middlePosition = totalOriginalItems.value * itemWidth.value
  translateX.value = -middlePosition
}

watch(() => carouselWidth.value, () => {
  if (props.infinite) {
    resetToMiddle()
  }
})

onMounted(() => {
  updateCarouselDimensions()
  
  if (props.infinite) {
    setTimeout(resetToMiddle, 100)
  }
  
  if (props.autoScroll && props.infinite) {
    startAutoScroll()
  }
  
  window.addEventListener('resize', updateCarouselDimensions)
  
  const wrapper = carouselRef.value
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoScroll)
    wrapper.addEventListener('mouseleave', () => {
      if (props.autoScroll && props.infinite) startAutoScroll()
    })
    
    let startX = 0
    let currentX = 0
    
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX
      stopAutoScroll()
    })
    
    wrapper.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX
      const diff = startX - currentX
      
      if (props.infinite) {
        translateX.value = -((totalOriginalItems.value * itemWidth.value) + diff * 0.5)
      } else {
        const maxTranslate = Math.max(0, totalDuplicatedWidth.value - carouselWidth.value)
        const newTranslate = Math.max(-maxTranslate, Math.min(0, translateX.value - diff * 0.5))
        translateX.value = newTranslate
      }
    })
    
    wrapper.addEventListener('touchend', () => {
      const diff = startX - currentX
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollNext()
        } else {
          scrollPrev()
        }
      }
      
      if (props.autoScroll && props.infinite) {
        setTimeout(startAutoScroll, 1000)
      }
    })
  }
})

onUnmounted(() => {
  stopAutoScroll()
  window.removeEventListener('resize', updateCarouselDimensions)
})
</script>

<style scoped>
.second-row {
  border-bottom: 2px solid var(--color-primary);
  background: #fafafa;
  position: relative;
  overflow: hidden;
}

.container {
  width: 85%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
}

.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
  margin: auto;
  touch-action: pan-y;
}

.categories {
  display: flex;
  gap: 1rem;
  padding: .5rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #555;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  flex-shrink: 0;
  min-width: max-content;
  border: 2px solid transparent;
}

.category-link:hover {
  color: var(--color-primary, #009688);
}

.category-link.highlight {
  color: white;
  background: var(--color-primary);
  font-weight: 600;
}

.category-link.active:not(.highlight) {
  color: var(--color-primary, #009688);
  font-weight: 600;
  border-color: var(--color-primary, #009688);
}

.category-text {
  color: inherit;
  pointer-events: none;
}

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  flex-shrink: 0;
}

.carousel-nav:hover {
  background: var(--color-primary, #009688);
  color: white;
  transform: scale(1.1);
}

.carousel-nav.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.carousel-nav .v-icon {
  font-size: 1.5rem;
}


@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .categories {
    gap: 1rem;
    padding: 0.75rem 0.5rem;
  }
  
  .category-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    border-radius: 16px;
  }
  
  .carousel-nav {
    display: none;
  }
  
  .carousel-wrapper {
    margin: 0;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  
  .carousel-wrapper::-webkit-scrollbar {
    display: none;
  }
  
  .categories {
    transform: none !important;
    transition: none;
  }
  
}

@media (min-width: 769px) {
  .carousel-wrapper {
    overflow: hidden;
  }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
  }
  50% { 
    box-shadow: 0 4px 20px rgba(0, 150, 136, 0.5), 0 0 20px rgba(0, 150, 136, 0.2);
  }
}

.category-link.highlight {
  animation: pulse-glow 2s infinite;
}

.carousel-wrapper {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
</style>