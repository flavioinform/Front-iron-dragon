<template>
  <div class="container py-4">
    <h1 class="text-center">Productos</h1>

    <!-- Buscador -->
    <div class="d-flex justify-content-center mb-4">
      <input 
        v-model="searchText"
        @input="filterProducts"
        class="form-control w-50" 
        type="text" 
        placeholder="Buscar productos..."
      />
    </div>

    <div class="row g-4">
      <div 
        class="col-6 col-md-3" 
        v-for="product in filteredProducts" 
        :key="product.id"
      >
        <!-- Card clickeable -->
        <div 
          class="card h-100 shadow-sm text-center p-3"
          @click="goToProduct(product.id)"
          style="cursor: pointer;"
        >
          <img 
            :src="product.image" 
            class="card-img-top img-fluid mx-auto d-block" 
            :alt="'imagen de ' + product.name"
            style="max-height: 150px; object-fit: contain;"
          >
          <div class="card-body">
            <h6 class="card-title fw-bold">{{ product.name }}</h6>
          </div>
          <div class="card-footer text-danger">
            PRECIO: {{ product.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const products = ref([])  // Todos los productos
const searchText = ref('')  // El texto del buscador

// Computed para filtrar productos basados en la búsqueda
const filteredProducts = computed(() => {
  const search = searchText.value.toLowerCase()
  return products.value.filter(product => 
    product.name.toLowerCase().includes(search)
  )
})

const fetchProducts = () => {
  const categoryId = route.query.category
  const url = categoryId 
    ? `http://127.0.0.1:8000/api/products/?category=${categoryId}` 
    : 'http://127.0.0.1:8000/api/products/'

  axios.get(url)
    .then(response => {
      products.value = response.data
    })
    .catch(error => {
      console.error('Error fetching products:', error)
    })
}

const filterProducts = () => {
  // Este método se llama cuando el usuario escribe en el buscador
  // No es necesario hacer nada aquí, ya que `filteredProducts` es reactivo
  console.log('Filtrando productos por nombre:', searchText.value)
}

const goToProduct = (id) => {
  router.push({ name: 'productDetail', params: { id } })
}

onMounted(fetchProducts)
watch(() => route.query.category, fetchProducts)
</script>

<style scoped>
/* Puedes agregar tus estilos aquí si lo necesitas */
</style>
