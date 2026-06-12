<template>
  <div class="catalog-page-light">
    <div class="container">

      <!-- ── Page header ── -->
      <div class="page-header-light">
        <h1 class="page-title-light">Nuestros Productos</h1>
        <div class="header-line"></div>
        <p class="page-sub-light">Agua pura libre de impurezas y accesorios en múltiples formatos.</p>
      </div>

      <!-- ── Search ── -->
      <div class="search-wrap-light">
        <div class="search-box-light">
          <i class="bi bi-search search-icon"></i>
          <input
            v-model="searchText"
            @input="filterProducts"
            type="text"
            class="search-input-light"
            placeholder="Buscar por nombre (ej: bidón, hielo, garrafón)..."
          />
        </div>
      </div>

      <!-- ── Grid ── -->
      <div class="products-grid-light">
        <div
          class="product-card-light"
          v-for="product in filteredProducts"
          :key="product.id"
          @click="goToProduct(product.id)"
        >
          <div class="card-img-wrap">
            <span class="badge-pure-light" v-if="product.category === 'aguas'">100% Puro</span>
            <img :src="getProductImage(product)" :alt="product.name" />
          </div>
          <div class="card-body-light">
            <h6 class="prod-title">{{ product.name }}</h6>
            <p class="prod-desc">{{ product.description || 'Producto premium de Agua Moche.' }}</p>
            <div class="prod-action-row d-flex flex-column align-items-start w-100">
              <span class="prod-price mb-3">S/ {{ product.price }}</span>
              <button class="btn-primary-am btn-sm w-100 text-uppercase fw-bold shadow-sm" style="letter-spacing: 0.5px; border-radius: 6px; padding: 10px;">
                <i class="bi bi-cart-plus me-1"></i> Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Empty state ── -->
      <div v-if="filteredProducts.length === 0" class="empty-state-light">
        <span class="empty-icon"><i class="bi bi-droplet"></i></span>
        <h4>Sin resultados</h4>
        <p>Intenta con otro término de búsqueda o explora todas las categorías.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import imageBottle from '@/assets/images2/1.jpeg'
import imageJug from '@/assets/images2/3.jpeg'
import imageGlass from '@/assets/images2/4.jpeg'

const getProductImage = (product) => {
  if (product && product.image && !product.image.includes('placeholder.png') && product.image !== 'placeholder.png') {
    return product.image
  }
  const name = (product && product.name ? product.name : '').toLowerCase()
  if (name.includes('20l') || name.includes('bidón') || name.includes('jug')) {
    return imageJug
  }
  if (name.includes('botella') || name.includes('10l') || name.includes('personal')) {
    return imageBottle
  }
  return imageGlass
}

const route = useRoute()
const router = useRouter()

const products = ref([])
const searchText = ref('')

const filteredProducts = computed(() => {
  const search = searchText.value.toLowerCase().trim()
  return products.value.filter(product =>
    product.name.toLowerCase().includes(search) ||
    (product.description && product.description.toLowerCase().includes(search))
  )
})

const fetchProducts = () => {
  const categoryId = route.query.category
  const url = categoryId
    ? `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/products/?category=${categoryId}`
    : `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/products/`

  axios.get(url)
    .then(response => { products.value = response.data.results || response.data })
    .catch(error => { console.error('Error fetching products:', error) })
}

const filterProducts = () => {}

const goToProduct = (id) => {
  router.push({ name: 'productDetail', params: { id } })
}

onMounted(() => {
  fetchProducts()
  searchText.value = route.query.search || ''
})

watch(() => route.query.category, fetchProducts)
watch(() => route.query.search, (newSearch) => {
  searchText.value = newSearch || ''
})
</script>

<style scoped>
.catalog-page-light {
  background-color: var(--am-bg-main);
  min-height: 80vh;
  padding: 60px 0 80px;
}

/* Header */
.page-header-light {
  text-align: center;
  margin-bottom: 40px;
}

.page-title-light {
  font-size: 2.5rem;
  color: var(--am-text-main);
  margin-bottom: 10px;
}

.header-line {
  width: 60px;
  height: 4px;
  background-color: var(--am-primary);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.page-sub-light {
  font-size: 1.1rem;
  color: var(--am-text-muted);
}

/* Search */
.search-wrap-light {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.search-box-light {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--am-text-muted);
}

.search-input-light {
  width: 100%;
  border: 1px solid var(--am-border);
  border-radius: 50px;
  padding: 12px 20px 12px 40px;
  background: var(--am-bg-alt);
  color: var(--am-text-main);
  outline: none;
  transition: all 0.2s;
}

.search-input-light:focus {
  border-color: var(--am-primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 170, 228, 0.1);
}

/* Grid */
.products-grid-light {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

/* Card */
.product-card-light {
  background: #fff;
  border: 1px solid var(--am-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.product-card-light:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  transform: translateY(-3px);
}

.card-img-wrap {
  position: relative;
  background: var(--am-bg-alt);
  padding: 20px;
  display: flex;
  justify-content: center;
}
.card-img-wrap img {
  height: 180px;
  object-fit: contain;
  transition: transform 0.3s;
}
.product-card-light:hover .card-img-wrap img {
  transform: scale(1.05);
}

.badge-pure-light {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--am-secondary);
  color: white;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 4px;
}

.card-body-light {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.prod-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--am-text-main);
  margin-bottom: 8px;
}

.prod-desc {
  font-size: 0.9rem;
  color: var(--am-text-muted);
  flex-grow: 1;
  margin-bottom: 15px;
}

.prod-action-row {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.prod-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--am-primary);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}

/* Empty */
.empty-state-light {
  text-align: center;
  padding: 60px 20px;
  background: var(--am-bg-alt);
  border-radius: var(--radius-md);
  margin-top: 20px;
}
.empty-icon {
  font-size: 3rem;
  color: var(--am-text-muted);
  display: block;
  margin-bottom: 15px;
}
</style>
