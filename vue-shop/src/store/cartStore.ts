import { defineStore } from "pinia";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartState {
  cart: Product[];
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    cart: [],
  }),
  getters: {
    totalPrice(state): number {
      return state.cart.reduce(
        (total, item) => total + (item.price * (item.quantity || 1)),
        0
      );
    },
    cartCount(state): number {
      return state.cart.reduce((count, item) => count + (item.quantity || 1), 0);
    },
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        this.cart = [...this.cart, { ...product, quantity: 1 }];
      }
      this.saveCart();
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      this.saveCart();
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        this.saveCart();
      }
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },
  },
});
