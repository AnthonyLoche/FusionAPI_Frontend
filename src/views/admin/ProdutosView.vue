<template>
    <div>
        <v-row class="mb-6">
            <v-col v-for="metric in metrics" :key="metric.title" cols="12" lg="3" sm="6">
                <v-card class="pa-4 elevation-1" flat rounded="lg">
                    <div class="d-flex align-center">
                        <v-icon class="mr-4" :color="metric.color" size="36">{{ metric.icon }}</v-icon>
                        <div>
                            <p class="text-caption text-text-muted">{{ metric.title }}</p>
                            <h2 class="text-h5 font-weight-bold text-text-main">{{ metric.value }}</h2>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const metrics = ref([
    { title: 'Total de Vendas', value: 'R$ 125.250', icon: 'mdi-currency-usd', color: 'green-darken-2' },
    { title: 'Pedidos do Mês', value: '245', icon: 'mdi-cart-outline', color: 'blue-darken-2' },
    { title: 'Novos Clientes', value: '+32', icon: 'mdi-account-plus', color: 'orange-darken-2' },
    { title: 'Produtos Ativos', value: '1.234', icon: 'mdi-package-variant', color: 'purple-darken-2' },
])
</script>

<style scoped>
.text-text-muted {
    color: var(--color-text-muted) !important;
}

.text-text-main {
    color: var(--color-text) !important;
}
</style>