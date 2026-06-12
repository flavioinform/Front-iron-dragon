<template>
  <div class="product-detail-page-ei py-5">
    <div class="container">
      <!-- Botón de retorno rápido -->
      <router-link to="/productos" class="btn-back-ei mb-4">
        <i class="bi bi-arrow-left me-1"></i> Volver al Catálogo
      </router-link>

      <div v-if="product" class="product-glass-card p-4 p-md-5">
        <div class="row g-5 align-items-center">
          <!-- Columna Imagen -->
          <div class="col-12 col-md-5 text-center">
            <div class="img-detail-wrapper-ei p-4">
              <img 
                :src="getProductImage(product)" 
                class="img-fluid detail-product-image" 
                :alt="product.name"
              >
            </div>
          </div>

          <!-- Columna Información -->
          <div class="col-12 col-md-7">
            <!-- Categoría y Nombre -->
            <span class="ei-text-primary fw-bold text-uppercase tracking-wider small">Agua Moche Premium</span>
            <h1 class="fw-bold mt-1 mb-3 text-white">{{ product.name }}</h1>
            
            <!-- Disponibilidad y Stock -->
            <div class="d-flex align-items-center gap-3 mb-4">
              <span class="badge-stock-ei" :class="{ 'out-of-stock': product.stock <= 0 }">
                {{ product.stock > 0 ? '✓ En Stock' : '✕ Agotado' }}
              </span>
              <span class="text-muted small">Disponibles: <strong class="text-white">{{ product.stock }} unidades</strong></span>
            </div>

            <!-- Precio de Impacto -->
            <h2 class="text-price-ei mb-4">S/ {{ product.price }} <span class="tax-info-ei">c/u</span></h2>

            <hr class="my-4 border-ei" />

            <!-- Descripción -->
            <p class="text-desc-ei mb-4">{{ product.description || 'Disfruta de la frescura máxima de nuestro producto premium, purificado con tecnologías avanzadas.' }}</p>

            <!-- Sellos de inocuidad en detalle -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-sm-4">
                <div class="feature-pill-ei"><i class="bi bi-clipboard2-pulse me-1"></i> Purificado</div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="feature-pill-ei"><i class="bi bi-truck me-1"></i> Express</div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="feature-pill-ei"><i class="bi bi-recycle me-1"></i> Eco-Friendly</div>
              </div>
            </div>

            <hr class="my-4 border-ei" />

            <!-- Controlador de Cantidad e Incremento -->
            <div class="d-flex flex-wrap align-items-center gap-4">
              <div class="qty-selector-ei">
                <button 
                  class="qty-btn-ei" 
                  @click="decreaseQty"
                  :disabled="quantity <= 1"
                >-</button>
                <input 
                  type="number" 
                  v-model.number="quantity" 
                  min="1" 
                  :max="product.stock"
                  class="qty-input-ei"
                  readonly
                />
                <button 
                  class="qty-btn-ei" 
                  @click="increaseQty"
                  :disabled="quantity >= product.stock"
                >+</button>
              </div>

              <!-- Botón Agregar al Carrito -->
              <button 
                class="btn-add-cart-ei flex-grow-1 py-3 px-4" 
                @click="addItem"
                :disabled="product.stock <= 0"
              >
                <i class="bi bi-cart3 me-2"></i> Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Spinner de carga -->
      <div v-else class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <h5 class="mt-3 text-muted">Cargando detalles de pureza...</h5>
      </div>
    </div>

    <!-- Dialog Overlay (Dark Theme) -->
    <div class="mui-dialog-overlay" :class="{ 'show': showDialog }">
      <div class="mui-dialog-ei">
        <h3 class="mui-dialog-title-ei">Añadido al Carrito</h3>
        <p class="mui-dialog-content-ei">{{ dialogMessage }}</p>
        <div class="mui-dialog-actions">
          <button class="mui-btn-text text-muted" @click="showDialog = false">SEGUIR COMPRANDO</button>
          <button class="mui-btn-text ei-text-primary fw-bold" @click="goToCart">IR AL CARRITO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { addToCart } from '@/composables/useCart.js'
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
const product = ref(null)
const quantity = ref(1)

const fetchProduct = () => {
  const productId = route.params.id
  axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/products/${productId}/`)
    .then(response => { product.value = response.data })
    .catch(error => { console.error('Error fetching product:', error) })
}

function increaseQty() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const showDialog = ref(false)
const dialogMessage = ref('')

function addItem() {
  if (!product.value) return
  addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value
  })
  
  dialogMessage.value = `${quantity.value}x ${product.value.name} añadido al carrito.`
  showDialog.value = true
}

const router = useRouter()

const goToCart = () => {
  showDialog.value = false
  router.push('/carrito')
}

onMounted(fetchProduct)
</script>

<style scoped>
/* Base Dark Theme (EcoInfinity) */
.product-detail-page-ei {
  background: transparent;
  min-height: 80vh;
  font-family: var(--font-body);
}

.text-white { color: var(--ei-text-main) !important; }
.text-muted { color: var(--ei-text-muted) !important; }
.ei-text-primary { color: var(--ei-secondary) !important; }

.tracking-wider { letter-spacing: 0.05em; }
.border-ei { border-color: var(--ei-border-muted) !important; }

/* Botón Volver */
.btn-back-ei {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--ei-border-muted);
  color: var(--ei-text-muted);
  font-weight: 600;
  padding: 8px 18px;
  border-radius: var(--radius-md);
  text-decoration: none !important;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-back-ei:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ei-text-main);
  transform: translateX(-2px);
  border-color: var(--ei-border-active);
}

/* Ficha del Producto */
.product-glass-card {
  background: rgba(10, 31, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

/* Imagen */
.img-detail-wrapper-ei {
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-product-image {
  max-width: 100%;
  max-height: 350px;
  width: auto;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.4));
  z-index: 2;
  position: relative;
}

.img-detail-wrapper-ei:hover .detail-product-image {
  transform: scale(1.06);
}

/* Stock Badges */
.badge-stock-ei {
  background-color: rgba(45, 212, 191, 0.15);
  color: #2dd4bf;
  border: 1px solid rgba(45, 212, 191, 0.3);
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.8rem;
}

.badge-stock-ei.out-of-stock {
  background-color: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

/* Precios */
.text-price-ei {
  font-size: 2.2rem;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--ei-secondary);
}

.tax-info-ei {
  font-size: 1rem;
  color: var(--ei-text-muted);
  font-weight: 500;
}

.text-desc-ei {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--ei-text-muted);
}

/* Feature pills */
.feature-pill-ei {
  background: rgba(255, 255, 255, 0.05);
  color: var(--ei-text-main);
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--ei-border-muted);
}

/* Selector de Cantidades */
.qty-selector-ei {
  display: flex;
  align-items: center;
  background: rgba(6, 13, 31, 0.6);
  border: 1px solid var(--ei-border-muted);
  border-radius: 14px;
  overflow: hidden;
}

.qty-btn-ei {
  background: transparent;
  border: none;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--ei-text-main);
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn-ei:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.qty-btn-ei:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: transparent;
}

.qty-input-ei {
  width: 50px;
  height: 48px;
  border: none;
  background: transparent;
  text-align: center;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--ei-text-main);
  -moz-appearance: textfield;
}

.qty-input-ei::-webkit-outer-spin-button,
.qty-input-ei::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Botón Añadir Carrito */
.btn-add-cart-ei {
  background-color: var(--ei-primary);
  color: #05101f;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(106, 176, 255, 0.25);
  transition: all 0.3s;
}

.btn-add-cart-ei:hover {
  background-color: var(--ei-primary-hover);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(112, 195, 212, 0.35);
}

.btn-add-cart-ei:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  transform: none;
  box-shadow: none;
}

/* Material UI Dialog Styles (Dark Theme) */
.mui-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mui-dialog-overlay.show {
  opacity: 1;
  visibility: visible;
}

.mui-dialog-ei {
  background-color: #0f172a;
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  transform: scale(0.9);
  transition: transform 0.3s ease;
  font-family: var(--font-body);
}

.mui-dialog-overlay.show .mui-dialog-ei {
  transform: scale(1);
}

.mui-dialog-title-ei {
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ei-text-main);
  font-family: var(--font-display);
}

.mui-dialog-content-ei {
  margin: 0 0 24px;
  font-size: 1rem;
  color: var(--ei-text-muted);
  line-height: 1.5;
}

.mui-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.mui-btn-text {
  background: transparent;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s;
}

.mui-btn-text:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

</style>
