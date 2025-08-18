// src/composables/useCart.js
import { ref } from 'vue'

export const cart = ref([])

export function initCart() {
  const saved = localStorage.getItem('cart')
  if (saved) {
    cart.value = JSON.parse(saved)
  }
}

export function addToCart(item) {
  const existing = cart.value.find(i => i.id === item.id)
  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.value.push({ ...item })
  }
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

export function removeFromCart(id) {
  cart.value = cart.value.filter(i => i.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

export function clearCart() {
  cart.value = []
  localStorage.removeItem('cart')
}
