<template>

  <div v-if="!showCategoryView">
    <navigation-component @category-selected="categoryID"/>  

    <!-- Secciones de productos por categoría -->
    <div class="container py-4">
      <div v-for="category in categoriesWithProducts" :key="category.id" class="mb-5">
        <div class="bg-dark text-white py-2">
          <h3 class="text-center mb-0">{{ category.name }}</h3>
        </div>
        <div class="row g-4 mt-4">
          <div 
            class="col-6 col-md-3" 
            v-for="product in category.products" 
            :key="product.id"
          >
            <div class="card category-card h-100 shadow-sm text-center p-3">
              <img 
                :src="product.image" 
                class="card-img-top img-fluid mx-auto d-block" 
                :alt="'imagen de ' + product.name"
              >
              <div class="card-body">
                <h6 class="card-title fw-bold text-danger">{{ product.name }}</h6>
                <p class="card-text">{{ product.description }}</p>
              </div>
              <div class="card-footer text-danger">
                PRECIO: {{ product.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <h3>Productos de la categoría {{ categoryreceived }}</h3>
    <button class="btn btn-lg btn-warning mb-4" @click="resetFilter">Volver a categoria principal</button>
    <div class="alert alert-warning" role="alert" v-if="filteredProducts.length === 0">
      <strong>Atención!</strong> No hay productos disponibles en esta categoría.
    </div>
    <div class="container py-4">
      <div class="row g-4">
        <div 
          class="col-6 col-md-3" 
          v-for="product in filteredProducts" 
          :key="product.id"
        >
          <div 
            class="card category-card h-100 shadow-sm text-center p-3"
          >
            <img 
              :src="product.image" 
              class="card-img-top img-fluid mx-auto d-block" 
              :alt="'imagen de ' + product.name"
            >
            <div class="card-body">
              <h6 class="card-title fw-bold text-danger">{{ product.name }}</h6>
              <p class="card-text">{{ product.description }}</p>
            </div>
            <div class="card-footer text-danger">
              PRECIO: {{ product.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import NavigationComponent from '@/components/Navigation.vue'
// import Navbar from '@/components/Navbar.vue'
// import HeroCarousel from '@/components/HeroCarousel.vue'
// import Header from '@/components/Header.vue'
// import iron from '@/assets/images/banners/Iron.png'
// import prot from '@/assets/images/banners/prot.jpg'
// import train from '@/assets/images/banners/train.jpg'

import { ref, onMounted } from 'vue'

// const carouselImages = ref([iron, prot, train])
const products = ref([])
const categoriesWithProducts = ref([]) // Nueva variable para categorías con productos
const categoryreceived = ref(null)
const filteredProducts = ref([])
const searchTextRule = ref(null)
const showCategoryView = ref(false)

const search = (searchText) => {
  searchTextRule.value = searchText
  if (searchText) {
    filteredProducts.value = products.value.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    )
    if (filteredProducts.value.length === 0) {
      alert('No se encontraron productos con ese criterio de búsqueda')
    }
  } else {
    filteredProducts.value = products.value
  }
}

const categoryID = (id, name) => {
  categoryreceived.value = name
  showCategoryView.value = true
  filteredProducts.value = id
    ? products.value.filter(product => product.category == id)
    : products.value
}

const resetFilter = () => {
  categoryreceived.value = null
  showCategoryView.value = false
  filteredProducts.value = products.value
}

onMounted(() => {
  axios.get('http://127.0.0.1:8000/api/products/')
    .then(response => {
      products.value = response.data

      // Agrupar productos por categoría
      const groupedProducts = products.value.reduce((acc, product) => {
        const category = acc.find(cat => cat.id === product.category);
        if (category) {
          category.products.push(product);
        } else {
          acc.push({ id: product.category, name: product.category_name, products: [product] });
        }
        return acc;
      }, []);
      categoriesWithProducts.value = groupedProducts;
    })
    .catch(error => {
      console.error('Error fetching products:', error)
    })
})
</script>

<style>
.hero-carousel img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}

.category-card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: center;
}

.category-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important; /* sombra tipo Bootstrap */
}

.category-card img {
  transition: transform 0.3s ease;
}

.category-card:hover img {
  transform: scale(1.1);
}

.container {
  padding-left: 15px; /* Espaciado izquierdo */
  padding-right: 15px; /* Espaciado derecho */
}

.bg-dark {
  background-color: #000 !important;
}
</style>