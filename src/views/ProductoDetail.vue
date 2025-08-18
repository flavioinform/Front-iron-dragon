<template>
  <div class="container py-4">
    <div v-if="product" class="card shadow-sm p-4">
      <div class="row g-4 align-items-center">
        <!-- Imagen -->
        <div class="col-md-5 text-center">
          <img 
            :src="product.image" 
            class="img-fluid product-image rounded" 
            :alt="'imagen de ' + product.name"
            style="max-height: 300px; object-fit: contain;"
          >
        </div>

        <!-- Info -->
        <div class="col-md-7">
          <h2 class="fw-bold">{{ product.name }}</h2>
          <h4 class="text-muted">Stock: {{ product.stock }}</h4>
          <h4 class="text-danger">Precio: ${{ product.price }}</h4>
          <p class="text-muted">{{ product.description }}</p>

          <!-- Cantidad -->
          <div class="d-flex align-items-center mb-3">
            <label for="qty" class="me-2 fw-bold">Cantidad:</label>
            <input 
              id="qty" 
              type="number" 
              v-model.number="quantity" 
              min="1" 
              :max="product.stock"
              class="form-control w-auto"
            />
          </div>

          <button class="btn btn-primary" @click="addItem">
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <h4>Cargando producto...</h4>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { addToCart } from '@/composables/useCart.js'

const route = useRoute()
const product = ref(null)
const quantity = ref(1)

const fetchProduct = () => {
  const productId = route.params.id
  axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
    .then(res => {
      product.value = res.data
    })
    .catch(err => {
      console.error("Error al cargar producto:", err)
    })
}

function addItem() {
  if (!product.value) return
  addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value
  })
  alert("Producto agregado al carrito ✅")
}

onMounted(fetchProduct)
</script>

<style>
.product-image {
  transition: filter 0.3s ease;
}
.product-image:hover {
  filter: grayscale(100%);
}
</style>
