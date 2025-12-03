<script setup>
import { ref } from 'vue';
import OfferCard from './OfferCard.vue';

const offers = ref([
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Lenovo Ideapad",
    name: "Notebook Lenovo Ideapad I3 12ª Geração",
    brand: "LENOVO",
    rating: 4.9,
    reviewCount: 25,
    originalPrice: 3000.00,
    currentPrice: 2449.01,
    isOutOfStock: true,
    discountPercentage: null,
    specs: ["4GB RAM", "256GB NVME"]
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Dell Inspiron",
    name: "Notebook Dell Inspiron 15 I5",
    brand: "DELL",
    rating: 4.7,
    reviewCount: 18,
    originalPrice: 3500.00,
    currentPrice: 2999.99,
    isOutOfStock: false,
    discountPercentage: 15,
    specs: ["8GB RAM", "512GB SSD", "Windows 11"]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook HP Pavilion",
    name: "Notebook HP Pavilion Ryzen 5",
    brand: "HP",
    rating: 4.5,
    reviewCount: 12,
    originalPrice: 2800.00,
    currentPrice: 2299.90,
    isOutOfStock: false,
    discountPercentage: null,
    specs: ["8GB RAM", "256GB SSD"]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook HP Pavilion",
    name: "Notebook HP Pavilion Ryzen 5",
    brand: "HP",
    rating: 4.5,
    reviewCount: 12,
    originalPrice: 2800.00,
    currentPrice: 2299.90,
    isOutOfStock: false,
    discountPercentage: null,
    specs: ["8GB RAM", "256GB SSD"]
  },
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Lenovo Ideapad",
    name: "Notebook Lenovo Ideapad I3 12ª Geração",
    brand: "LENOVO",
    rating: 4.9,
    reviewCount: 25,
    originalPrice: 3000.00,
    currentPrice: 2449.01,
    isOutOfStock: true,
    discountPercentage: null,
    specs: ["4GB RAM", "256GB NVME"]
  },
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Lenovo Ideapad",
    name: "Notebook Lenovo Ideapad I3 12ª Geração",
    brand: "LENOVO",
    rating: 4.9,
    reviewCount: 25,
    originalPrice: 3000.00,
    currentPrice: 2449.01,
    isOutOfStock: true,
    discountPercentage: null,
    specs: ["4GB RAM", "256GB NVME"]
  },
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Lenovo Ideapad",
    name: "Notebook Lenovo Ideapad I3 12ª Geração",
    brand: "LENOVO",
    rating: 4.9,
    reviewCount: 25,
    originalPrice: 3000.00,
    currentPrice: 2449.01,
    isOutOfStock: true,
    discountPercentage: null,
    specs: ["4GB RAM", "256GB NVME"]
  },
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Notebook Lenovo Ideapad",
    name: "Notebook Lenovo Ideapad I3 12ª Geração",
    brand: "LENOVO",
    rating: 4.9,
    reviewCount: 25,
    originalPrice: 3000.00,
    currentPrice: 2449.01,
    isOutOfStock: true,
    discountPercentage: null,
    specs: ["4GB RAM", "256GB NVME"]
  },
])
</script>

<template>
  <section>
    <div class="title">
      <h2>Produtos em Destaque</h2>
      <p>Confira nossa seleção especial de produtos de alta qualidade</p>
    </div>
    <div class="container">
      <OfferCard v-for="item in offers" :key="item.id" :id="item.id" :image="item.image" :imageAlt="item.imageAlt"
        :name="item.name" :brand="item.brand" :rating="item.rating" :reviewCount="item.reviewCount"
        :originalPrice="item.originalPrice" :currentPrice="item.currentPrice" :isOutOfStock="item.isOutOfStock"
        :discountPercentage="item.discountPercentage" :specs="item.specs" />

    </div>
    <div class="button">
      <v-btn color="primary" class="w-[30%]" size="large" prepend-icon="mdi-plus">Ver Mais</v-btn>
    </div>

  </section>
</template>

<style scoped>
section {
  width: 100%;
  min-height: 50vh;
  padding: 2rem 0;
}

.title{
  width: 80%;
  margin: 1.5rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title h2{
  color: var(--color-primary);
  font-size: 2.5rem;
}

.title p{
  color: #b6b6c4;
}

.container {
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
}

.button {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    width: 95%;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>