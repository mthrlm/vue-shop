<template>
  <div>
    <Header />
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Корзина</h1>

      <div v-if="cart.length > 0">
        <ul class="divide-y divide-gray-300">
          <li
            v-for="(item, index) in cart"
            :key="index"
            class="flex items-center justify-between py-4"
          >
            <div class="flex items-center">
              <img
                :src="item.image"
                alt="Product Image"
                class="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                <p class="text-gray-500 text-sm">Цена: {{ formattedPrice(item.price) }} ₽</p>
                <div class="mt-2 flex items-center">
                  <button
                    @click="updateQuantity(item.id, (item.quantity || 1) - 1)"
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span class="mx-4">{{ item.quantity || 1 }}</span>
                  <button
                    @click="updateQuantity(item.id, (item.quantity || 1) + 1)"
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="removeFromCart(item.id)"
              class="text-red-600 hover:underline"
            >
              Удалить
            </button>
          </li>
        </ul>

        <div class="mt-8">
          <h2 class="text-xl font-semibold">
            Итог: {{ formattedPrice(totalPrice) }} ₽
          </h2>
          <button
            @click="checkout"
            class="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Оформить заказ
          </button>
        </div>
      </div>

      <div v-else>
        <p class="text-gray-600">Ваша корзина пуста.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useCartStore } from "../store/cartStore";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Cart",
  components: { Header },
  setup() {
    const cartStore = useCartStore();

    onMounted(() => {
      cartStore.loadCart(); // Загружаем состояние корзины
    });

    const cart = computed(() => cartStore.cart);
    const totalPrice = computed(() => cartStore.totalPrice);

    const removeFromCart = (productId: number) => {
      cartStore.removeFromCart(productId);
    };

    const updateQuantity = (productId: number, quantity: number) => {
      cartStore.updateQuantity(productId, quantity);
    };

    const checkout = () => {
      alert("Заказ оформлен! Спасибо за покупку.");
      cartStore.clearCart();
    };

    return {
      cart,
      totalPrice,
      removeFromCart,
      updateQuantity,
      checkout,
      formattedPrice: (price: number) => price.toLocaleString("ru-RU"),
    };
  },
});
</script>
