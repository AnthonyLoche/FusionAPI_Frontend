<template>
    <article :class="['product-card', props.className, { 'out-of-stock': props.isOutOfStock }]">
        <!-- Badge de desconto -->
        <div v-if="discount > 0 && !props.isOutOfStock" class="product-discount">
            -{{ discount }}%
        </div>

        <!-- Imagem do produto -->
        <div class="product-image">
            <img 
                :src="props.image" 
                :alt="props.imageAlt" 
                loading="lazy"
            />
        </div>

        <!-- Conteúdo do produto -->
        <div class="product-content">
            <div class="top-content">
                <!-- Marca -->
                <div class="product-brand">
                    <span>{{ props.brand }}</span>
                </div>

                <!-- Nome do produto -->
                <h3 class="product-name" :title="props.name">
                    {{ props.name }}
                </h3>

                <!-- Especificações -->
                <ul v-if="props.specs?.length" class="product-specs">
                    <li v-for="(spec, index) in props.specs" :key="index">
                        {{ spec }}
                    </li>
                </ul>
            </div>

            <div class="bottom-content">
                <!-- Avaliação -->
                <div v-if="props.rating" class="product-rating">
                    <div class="stars" :aria-label="`${props.rating} de 5 estrelas`">
                        <span 
                            v-for="star in 5" 
                            :key="star" 
                            :class="getStarClass(star)"
                            aria-hidden="true"
                        >
                            ★
                        </span>
                    </div>
                    <span v-if="props.reviewCount" class="review-count">
                        ({{ props.reviewCount }})
                    </span>
                </div>

                <!-- Preços -->
                <div class="product-prices">
                    <span class="current-price">
                        {{ formatPrice(props.currentPrice) }}
                    </span>
                    <span v-if="hasDiscount" class="original-price">
                        {{ formatPrice(props.originalPrice) }}
                    </span>
                </div>

                <!-- Botões de ação -->
                <div class="buttons-actions" :class="{ single: props.isOutOfStock }">
                    <button 
                        @click="handleBuyClick"
                        :disabled="props.isOutOfStock"
                        :class="['product-button', 'buy-button', { disabled: props.isOutOfStock }]"
                        :aria-label="buttonAriaLabel"
                    >
                        {{ buttonText }}
                    </button>

                    <button 
                        v-if="!props.isOutOfStock"
                        @click="handleCartClick"
                        class="product-button cart-button"
                        aria-label="Adicionar ao carrinho"
                    >
                        <v-icon>mdi-cart</v-icon>
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import router from '@/router'
import { computed } from 'vue'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        default: 'Imagem do produto'
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        validator: (value) => value >= 0 && value <= 5
    },
    reviewCount: {
        type: Number,
        default: null
    },
    originalPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    isOutOfStock: {
        type: Boolean,
        default: false
    },
    discountPercentage: {
        type: Number,
        default: null
    },
    specs: {
        type: Array,
        default: () => []
    },
    className: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['buy', 'add-to-cart'])

// Computeds
const discount = computed(() => {
    if (props.discountPercentage !== null) return props.discountPercentage
    if (props.originalPrice <= props.currentPrice) return 0
    return Math.round(((props.originalPrice - props.currentPrice) / props.originalPrice) * 100)
})

const hasDiscount = computed(() => props.originalPrice > props.currentPrice)
const buttonText = computed(() => props.isOutOfStock ? 'Indisponível' : 'Comprar')

const buttonAriaLabel = computed(() => 
    props.isOutOfStock 
        ? 'Produto indisponível' 
        : `Comprar ${props.name}`
)

// Methods
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(price)
}

const getStarClass = (starIndex) => {
    const fullStars = Math.floor(props.rating)
    const hasHalfStar = props.rating % 1 >= 0.5
    
    if (starIndex <= fullStars) return 'star-full'
    if (starIndex === fullStars + 1 && hasHalfStar) return 'star-half'
    return 'star-empty'
}

const handleBuyClick = () => {
    if (props.isOutOfStock) return
    emit('buy', props.id)
    router.push(`/blank/produtos/${props.id}`)
}

const handleCartClick = () => {
    emit('add-to-cart', props.id)
}
</script>

<style scoped>
.product-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    height: 550px;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
}

.product-card.out-of-stock {
    opacity: 0.7;
}

.product-discount {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--color-success, #10b981);
    color: white;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 6px;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.product-image {
    min-height: 185px;
    width: 100%;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    min-height: 100%;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.product-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    justify-content: space-between;
    min-height: 300px;
}
.top-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-brand {
    margin-bottom: 6px;
}

.product-brand span {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary, #2563eb);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.product-name {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 44px;
    line-height: 1.4;
}

.product-specs {
    margin: 0;
    padding: 0;
    font-size: 13px;
    color: #6b7280;
    list-style: none;
    min-height: 40px;
}

.product-specs li {
    margin-bottom: 4px;
    padding-left: 12px;
    position: relative;
}

.product-specs li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-primary, #2563eb);
    font-weight: bold;
}

.bottom-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 24px;
}

.stars {
    display: flex;
    gap: 2px;
}

.stars span {
    font-size: 16px;
    transition: transform 0.2s ease;
}

.product-card:hover .stars span {
    transform: scale(1.1);
}

.star-full {
    color: #fbbf24;
}

.star-half {
    color: #fbbf24;
    opacity: 0.7;
}

.star-empty {
    color: #e5e7eb;
}

.review-count {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
}

.product-prices {
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-height: 32px;
}

.current-price {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-primary, #2563eb);
}

.original-price {
    font-size: 14px;
    color: #9ca3af;
    text-decoration: line-through;
    font-weight: 500;
}

.product-stock {
    font-size: 14px;
    font-weight: 500;
    min-height: 24px;
}

.in-stock-text {
    color: #10b981;
}

.out-of-stock-text {
    color: #ef4444;
}

.buttons-actions {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 8px;
}

.buttons-actions.single {
    grid-template-columns: 1fr;
}

.product-button {
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.buy-button:not(.disabled) {
    background: var(--color-primary, #2563eb);
    color: white;
}

.buy-button:not(.disabled):hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.buy-button:not(.disabled):active {
    transform: translateY(0);
}

.cart-button {
    background: white;
    color: var(--color-primary, #2563eb);
    border: 2px solid var(--color-primary, #2563eb);
}

.cart-button:hover {
    background: var(--color-primary, #2563eb);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.cart-button:active {
    transform: translateY(0);
}

.product-button.disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 640px) {
    .product-card {
        height: auto;
    }

    .product-name {
        font-size: 15px;
        min-height: 40px;
    }

    .current-price {
        font-size: 20px;
    }

    .buttons-actions {
        grid-template-columns: 1fr;
    }

    .cart-button {
        display: none;
    }
}
</style>