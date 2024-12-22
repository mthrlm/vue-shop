<template>
    <Header />
    <div class="container mx-auto py-8">
        <div v-if="product">
            <div class="flex flex-col lg:flex-row items-center">
                <div class="flex-1 mb-8 lg:mb-0 lg:w-1/2">
                    <img :src="product.image" :alt="product.name"
                        class="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>

                <div class="flex-1 lg:ml-8">
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
                    <p class="text-gray-600 mb-6">{{ product.description }}</p>

                    <div class="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                        <h2 class="text-lg font-semibold text-gray-700 mb-2">Характеристики:</h2>
                        <ul class="list-disc list-inside text-gray-600">
                            <li v-for="(spec, index) in product.specs" :key="index">
                                {{ spec }}
                            </li>
                        </ul>
                    </div>

                    <div class="text-xl font-semibold text-green-800 mb-6">
                        {{ formattedPrice(product.price) }} ₽
                    </div>

                    <button @click="addToCart(product)"
                        class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Товар не найден.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import { useCartStore } from "@/store/cartStore";
import kot1 from '@/assets/kot1.webp';
import kot2 from '@/assets/kot2.webp';
import kot3 from '@/assets/kot3.webp';
import kot4 from '@/assets/kot4.webp';
import kot5 from '@/assets/kot5.webp';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    specs: string[];
}

export default defineComponent({
    name: "Product",
    components: { Header },
    data() {
        return {
            product: null as Product | null,
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        fetchProduct(): void {
            const products: Product[] = [
                {
                    id: 1,
                    name: "кот милашка",
                    description: "но щас нападет",
                    price: 14999,
                    image: kot1,
                    specs: [
                    ]
                },
                {
                    id: 2,
                    name: "кот спокойный",
                    description: "наблюдает",
                    price: 5000,
                    image: kot2,
                    specs: [
                    ]
                },
                {
                    id: 3,
                    name: "кот злой",
                    description: "не трогайте его",
                    price: 1000,
                    image: kot3,
                    specs: [
                    ]
                },
                {
                    id: 4,
                    name: "кот",
                    description: "в шоке",
                    price: 25000,
                    image: kot4,
                    specs: [
                    ]
                },
                {
                    id: 5,
                    name: "кот обычный",
                    description: "на расслабоне",
                    price: 999999999999,
                    image: kot5,
                    specs: [
                    ]
                }
            ];

            const paramId = Array.isArray(this.$route.params.id)
                ? this.$route.params.id[0]
                : this.$route.params.id;

            // Преобразуем параметр id в число
            const productId = parseInt(paramId, 10);

            if (isNaN(productId)) {
                console.error("Некорректный ID товара!");
                return;
            }

            this.product = products.find((prod) => prod.id === productId) || null;

            if (!this.product) {
                console.error("Товар с таким id не найден!");
            }
        },

        formattedPrice(price: number): string {
            return price.toLocaleString("ru-RU");
        },
        addToCart(product: Product): void {
            const cartStore = useCartStore();
            cartStore.addToCart(product);
        },
    },
});
</script>
<style>
.text-xl.font-semibold.text-green-800.mb-6 {
    color: #9d2f3a !important;
}
button.px-6.py-3.bg-green-600.text-white.font-semibold.rounded-lg.hover\:bg-green-700.transition.duration-300 {
    background-color: #9d2f3a !important;
    border-radius: 30px;
}
</style>
