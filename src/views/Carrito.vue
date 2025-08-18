<template>
  <div class="container py-4">
    <h2 class="fw-bold mb-4">🛒 Carrito de compras</h2>

    <div v-if="cart.length > 0">
      <table class="table table-bordered align-middle text-center">
        <thead class="table-light">
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              <img :src="item.image" :alt="item.name" style="height:60px; object-fit:contain;" />
            </td>
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.price * item.quantity }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">
                ❌ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-between mt-3">
        <h4>Total: ${{ total }}</h4>
        <button class="btn btn-success">Finalizar compra</button>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h4>Tu carrito está vacío 🛍️</h4>
      <router-link to="/" class="btn btn-primary mt-3">Volver a la tienda</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cart, removeFromCart } from '@/composables/useCart.js'

const total = computed(() => 
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function removeItem(id) {
  removeFromCart(id)
}
</script>
