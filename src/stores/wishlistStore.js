// src/stores/wishlist.js
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToWishlist(product) {
      const exists = this.items.find(item => item.sku === product.sku)
      if (!exists) {
        this.items.push(product)
      }
    },
    removeFromWishlist(sku) {
      this.items = this.items.filter(item => item.sku !== sku)
    },
    clearWishlist() {
      this.items = []
    },
  },
})
