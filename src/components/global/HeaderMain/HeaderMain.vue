<template>
    <header>
        <div class="first-row">
            <div class="container">
                <LogoComponent />
                <SearchComponent  />
                <ActionsComponent />
            </div>
        </div>

        <CategoriesComponent />
    </header>
</template>

<script setup>
import LogoComponent from './LogoComponent.vue'
import SearchComponent from './SearchComponent.vue'
import ActionsComponent from './ActionsComponent.vue'
import CategoriesComponent from './CategoriesComponent.vue'
</script>

<style scoped>
header {
    width: 100%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.first-row {
    padding: 1rem 0;
    background: white;
}

.container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
}

@media (max-width: 768px) {
    .container {
        width: 95%;
        gap: 1rem;
    }
}

@media (max-width: 480px) {
    .container {
        width: 92%;
    }
}
</style>