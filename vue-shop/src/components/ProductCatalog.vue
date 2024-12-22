<template>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id"
          class="bg-white shadow rounded-lg p-4 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <img :src="product.image" :alt="product.name" class="w-32 h-32 object-cover mb-4 rounded-md"
            @click="goToProduct(product)" />
          <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-500 text-sm mb-2">{{ product.description }}</p>
          <span class="text-green-800 font-bold text-lg">
            {{ formatPrice(product.price) }} ₽
          </span>
          <div class="flex space-x-2 mt-4">
            <button @click="goToProduct(product)"
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full">
              Подробнее
            </button>
            <button @click="addToCart(product)"
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full">
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useCartStore } from '@/store/cartStore';
  import kot1 from '@/assets/kot1.webp';
  import kot2 from '@/assets/kot2.webp';
  import kot3 from '@/assets/kot3.webp';
  import kot4 from '@/assets/kot4.webp';
  import kot5 from '@/assets/kot5.webp';


  
  export default defineComponent({
    name: 'ProductCatalog',
    data() {
      return {
        products: [
          {
            id: 1,
            name: 'кот милашка',
            description: 'но щас нападет',
            price: 14999,
            image: kot1,
          },
          {
            id: 2,
            name: 'кот спокойный',
            description: 'наблюдает',
            price: 5000,
            image: kot2,
          },
          {
            id: 3,
            name: 'кот злой',
            description: 'не трогайте его',
            price: 1000,
            image: kot3,
          },
          {
            id: 4,
            name: 'кот',
            description: 'в шоке',
            price: 25000,
            image: kot4,
          },
          {
            id: 5,
            name: 'кот обычный',
            description: 'на расслабоне',
            price: 999999999999,
            image: kot5,
          },
        ],
      };
    },
    methods: {
      addToCart(product: { id: number, name: string, description: string, price: number, image: string }) {
        const cartStore = useCartStore();
        console.log(product)
        cartStore.addToCart(product);
      },
      formatPrice(price: number): string {
        return price.toLocaleString('ru-RU');
      },
      goToProduct(product: { id: number }) {
        this.$router.push(`/product/${product.id}`);
      },
    },
  });
  </script>
  <style>
span.text-green-800.font-bold.text-lg {
    color: #9d2f3a !important;
}
button.bg-green-500.text-white.px-4.py-2.rounded-md.hover\:bg-green-600.transition.w-full {
    background-color: #9d2f3a !important;
    border-radius: 30px;
}
.grid.grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-4.gap-6 {
    grid-template-columns: repeat(3, minmax(0, 1fr));

}
</style>
  