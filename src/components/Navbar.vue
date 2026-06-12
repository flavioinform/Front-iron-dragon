<template>
  <header class="aguamoche-header">
    <!-- ── TIER 0: Pre-Header Promo Bar (Aquandes Style) ── -->
    <div class="preheader-promo text-center text-white py-2" style="background-color: var(--am-secondary); font-size: 0.85rem; letter-spacing: 0.5px;">
      <div class="container">
        <strong>🚚 Envío Express en Trujillo</strong> | 🎁 Regístrate y obtén <strong>10% dcto acumulable</strong> por referidos
      </div>
    </div>

    <!-- ── TIER 1: Top Bar (Blue) ── -->
    <div class="top-bar-blue">
      <div class="container top-bar-container">
        <div class="top-bar-left">
          <span>PEDIDOS HOGAR: +51 961 745 295</span>
          <span class="top-divider">|</span>
          <span>PEDIDOS EMPRESAS: +51 961 745 295</span>
        </div>
        <div class="top-bar-right">
          <a href="#despachos">DESPACHOS A DOMICILIO (consulta tu zona)</a>
          <span class="top-divider">|</span>
          <a href="#contacto">CONTACTO</a>
        </div>
      </div>
    </div>

    <!-- ── TIER 2: Main Bar (Search & User Actions) ── -->
    <div class="main-header-white">
      <div class="container main-header-container">
        <!-- Brand Logo -->
        <router-link to="/home" class="brand-logo-area">
          <img src="@/assets/moche3d1.png" alt="Agua Moche Logo" class="navbar-logo-img" />
        </router-link>

        <!-- Search Bar Complex -->
        <div class="search-complex">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            class="search-input" 
            v-model="searchQuery"
            @keyup.enter="triggerSearch"
          />

          <button class="search-btn" @click="triggerSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>

        <!-- User Actions -->
        <div class="user-actions-area">
          <template v-if="username">
            <div class="user-greeting d-none d-md-block">Hola, {{ username }}</div>
            
            <router-link v-if="isAdmin" to="/admin-dashboard" class="btn btn-sm btn-primary-am ms-3 fw-bold shadow-sm" style="background-color: var(--am-primary); color: white; border-radius: 8px;">
              <i class="bi bi-speedometer2 me-1"></i> Panel Admin
            </router-link>

            <router-link to="/referidos" class="action-link-text ms-3 text-primary" title="Mi Billetera">
              <i class="bi bi-wallet2 me-1"></i> Mi Billetera
            </router-link>

            <button @click="logout" class="icon-action-btn ms-3" title="Cerrar sesión">
              <i class="bi bi-power text-danger"></i>
            </button>
          </template>
          <template v-else>
            <router-link to="/login" class="action-link-text">INGRESAR</router-link>
          </template>
          
          <router-link to="/favoritos" class="icon-action-btn ms-3">
            <i class="bi bi-heart"></i>
          </router-link>
          
          <router-link to="/carrito" class="cart-action-btn ms-3">
            <div class="cart-icon-wrapper">
              <i class="bi bi-cart3"></i>
              <span class="cart-badge">{{ cartItemCount }}</span>
            </div>
            <span class="cart-total">S/ {{ cartTotal }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ── TIER 3: Bottom Navigation Bar ── -->
    <div class="bottom-nav-bar">
      <div class="container bottom-nav-container">
        <!-- Main Nav Links -->
        <nav class="main-nav-links">
          <router-link to="/home" class="nav-item">INICIO</router-link>
          <router-link to="/productos" class="nav-item">PRODUCTOS</router-link>
          <a href="#" class="nav-item">DESTACADOS</a>
          <a href="#" class="nav-item">NOVEDADES</a>
          <a href="#nosotros" class="nav-item">NOSOTROS</a>
          <a href="#contacto" class="nav-item">CONTACTO</a>
          <a href="#" class="nav-item text-primary-am">OFERTAS ESPECIALES</a>
        </nav>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { username, isAdmin, setUsername, setAdmin } from '@/composables/useUser.js'
import { cart, initCart } from '@/composables/useCart.js'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  setAdmin(false)
  setUsername('')
  router.push('/login')
}

// Reactive category properties
const categories = ref([])
const showCategoriesDropdown = ref(false)
const showSearchDropdown = ref(false)

const selectedSearchCategory = ref(null)
const selectedSearchCategoryName = ref('CATEGORÍAS')
const searchQuery = ref('')

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/categories/`)
    categories.value = res.data.results || res.data
  } catch (error) {
    console.error('Error fetching categories in Navbar:', error)
  }
}

const toggleCategoriesDropdown = () => {
  showCategoriesDropdown.value = !showCategoriesDropdown.value
  showSearchDropdown.value = false
}

const toggleSearchDropdown = () => {
  showSearchDropdown.value = !showSearchDropdown.value
  showCategoriesDropdown.value = false
}

const selectCategory = (catId) => {
  showCategoriesDropdown.value = false
  if (catId) {
    router.push({ path: '/productos', query: { category: catId } })
  } else {
    router.push({ path: '/productos' })
  }
}

const selectSearchCategory = (catId, catName) => {
  selectedSearchCategory.value = catId
  selectedSearchCategoryName.value = catName
  showSearchDropdown.value = false
}

const triggerSearch = () => {
  const query = {}
  if (selectedSearchCategory.value) {
    query.category = selectedSearchCategory.value
  }
  if (searchQuery.value.trim()) {
    query.search = searchQuery.value.trim()
  }
  router.push({ path: '/productos', query })
}

const handleOutsideClick = (e) => {
  if (!e.target.closest('.categories-btn-wrapper') && !e.target.closest('.search-cat-dropdown-wrapper')) {
    showCategoriesDropdown.value = false
    showSearchDropdown.value = false
  }
}

const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + (item.quantity || 1), 0)
})

const cartTotal = computed(() => {
  const total = cart.value.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  return total.toFixed(2)
})

onMounted(() => {
  fetchCategories()
  window.addEventListener('click', handleOutsideClick)
  initCart()
})

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.navbar-logo-img {
  height: 190px;
  margin-top: -30px; /* Overlap the top bar */
  margin-bottom: -70px; /* Overlap the bottom nav */
  max-width: none;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  position: relative;
  z-index: 1050;
}
.navbar-logo-img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6));
}

.aguamoche-header {
  width: 100%;
  background: var(--am-bg-main, #ffffff);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
  z-index: 1000;
}

/* ── TIER 1: Top Bar ── */
.top-bar-blue {
  background-color: var(--am-primary, #00aae4);
  color: #ffffff;
  font-size: 0.75rem;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: none;
}

.top-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-left, .top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.top-divider {
  color: rgba(255,255,255,0.4);
}

.top-bar-right a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}
.top-bar-right a:hover {
  opacity: 0.8;
}

/* ── TIER 2: Main Bar ── */
.main-header-white {
  background: var(--am-bg-main, #ffffff);
  padding: 12px 0;
  border-bottom: none;
  position: relative;
  z-index: 1100;
}

.main-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

/* Brand */
.brand-logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  position: relative;
}

/* Search Complex */
.search-complex {
  flex-grow: 1;
  max-width: 600px;
  display: flex;
  align-items: stretch;
  border: 1px solid var(--am-border, #e0e0e0);
  border-radius: 50px;
  overflow: hidden;
  background: #ffffff;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.search-complex:focus-within {
  border-color: var(--am-primary);
  box-shadow: 0 0 0 3px rgba(0, 170, 228, 0.1);
}

.search-input {
  flex-grow: 1;
  min-width: 0;
  border: none;
  background: transparent !important;
  padding: 12px 20px;
  font-size: 0.95rem;
  color: var(--am-text-main, #333333) !important;
  outline: none;
}
.search-input::placeholder { color: var(--am-text-muted, #6c757d); }



.search-btn {
  background: var(--am-primary, #00aae4);
  color: #ffffff;
  border: none;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.search-btn:hover {
  background: var(--am-secondary, #0062cc);
}

/* User Actions */
.user-actions-area {
  display: flex;
  align-items: center;
  color: var(--am-text-main, #333333);
}

.action-link-text {
  color: var(--am-text-main, #333333);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.action-link-text:hover { color: var(--am-primary, #00aae4); }

.icon-action-btn {
  background: none;
  border: none;
  color: var(--am-text-main, #333333);
  font-size: 1.3rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}
.icon-action-btn:hover { color: var(--am-primary, #00aae4); }

.cart-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--am-text-main, #333333);
  transition: color 0.2s;
}

.cart-icon-wrapper {
  position: relative;
  font-size: 1.5rem;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background: var(--am-primary, #00aae4);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-total {
  font-weight: 700;
  font-size: 0.95rem;
}
.cart-action-btn:hover { color: var(--am-primary, #00aae4); }

.bottom-nav-bar {
  background: var(--am-bg-main, #ffffff);
  border-bottom: none;
  padding: 16px 0;
}

.bottom-nav-container {
  display: flex;
  align-items: center;
}

/* Custom Dropdowns */
.categories-nav-dropdown, .search-dropdown-list {
  z-index: 1100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  background: #ffffff !important;
  border: 1px solid var(--am-border, #e0e0e0);
}

.categories-dropdown-item, .search-dropdown-item {
  color: var(--am-text-main, #333333) !important;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.categories-dropdown-item:hover, .search-dropdown-item:hover {
  background-color: var(--am-bg-alt, #f8f9fa) !important;
  color: var(--am-primary, #00aae4) !important;
}

.search-dropdown-list {
  top: 100%;
  right: 0;
  width: 220px;
  margin-top: 12px;
}

.main-nav-links {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 25px;
  margin-left: 230px; /* Clear space for the overhanging logo */
}

.nav-item {
  text-decoration: none;
  color: var(--am-text-main, #333333);
  font-size: 0.8rem;
  font-weight: 700;
  transition: color 0.2s;
}

.nav-item:hover, .router-link-exact-active {
  color: var(--am-primary, #00aae4);
}

.text-primary-am {
  color: var(--am-primary, #00aae4) !important;
}

/* Responsive */
@media (max-width: 991px) {
  .top-bar-blue { display: none; }
  .search-cat-dropdown { display: none; }
  .bottom-nav-bar { display: none; }
  .main-header-container { flex-wrap: wrap; }
  .search-complex { order: 3; max-width: 100%; margin-top: 15px; }
  .navbar-logo-img { 
    height: 90px; 
    margin-top: 0;
    margin-bottom: 0; 
  }
  .main-nav-links {
    margin-left: 0;
  }
}
</style>
