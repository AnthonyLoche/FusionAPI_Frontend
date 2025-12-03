<!-- views/admin/DashboardView.vue -->
<template>
    <div>
        <!-- Métrica de Destaque (Cards Pequenos) -->
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

        <!-- Gráficos Maiores (Linha e Barra) -->
        <v-row class="mb-6">
            <v-col cols="12" lg="8">
                <v-card class="pa-4 elevation-1" flat rounded="lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold text-text-main">
                        Vendas dos Últimos 12 Meses
                    </v-card-title>
                    <v-card-text>
                        <v-sheet class="d-flex align-center justify-center rounded-lg" color="grey-lighten-4"
                            height="300">
                            <p class="text-text-muted">Gráfico de Linha (Integrar com Chart.js)</p>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="4">
                <v-card class="pa-4 elevation-1" flat rounded="lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold text-text-main">
                        Categorias Mais Vendidas
                    </v-card-title>
                    <v-card-text>
                        <v-sheet class="d-flex align-center justify-center rounded-lg" color="grey-lighten-4"
                            height="300">
                            <p class="text-text-muted">Gráfico de Rosca (Integrar com Chart.js)</p>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Gráficos de Detalhe (Barra e Tabela) -->
        <v-row>
            <v-col cols="12" lg="6">
                <v-card class="pa-4 elevation-1" flat rounded="lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold text-text-main">
                        Produtos Mais Vendidos
                    </v-card-title>
                    <v-card-text>
                        <v-sheet class="d-flex align-center justify-center rounded-lg" color="grey-lighten-4"
                            height="250">
                            <p class="text-text-muted">Gráfico de Barras (Integrar com Chart.js)</p>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card class="pa-4 elevation-1" flat rounded="lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold text-text-main">
                        Últimos Pedidos
                    </v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="pedido in ultimosPedidos" :key="pedido.id">
                                    <td>{{ pedido.id }}</td>
                                    <td>{{ pedido.cliente }}</td>
                                    <td>{{ pedido.total }}</td>
                                    <td>
                                        <v-chip :color="pedido.statusColor" size="small">
                                            {{ pedido.status }}
                                        </v-chip>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card-text>
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

const ultimosPedidos = ref([
    { id: '#00123', cliente: 'João Silva', total: 'R$ 1.250,00', status: 'Entregue', statusColor: 'success' },
    { id: '#00124', cliente: 'Maria Santos', total: 'R$ 890,00', status: 'Processando', statusColor: 'warning' },
    { id: '#00125', cliente: 'Carlos Oliveira', total: 'R$ 2.150,00', status: 'Enviado', statusColor: 'info' },
    { id: '#00126', cliente: 'Ana Pereira', total: 'R$ 540,00', status: 'Cancelado', statusColor: 'error' },
    { id: '#00127', cliente: 'Pedro Costa', total: 'R$ 1.780,00', status: 'Entregue', statusColor: 'success' },
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