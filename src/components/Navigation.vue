<template>
  <section class="nav-section-light">
    <!-- ── Category Pills (Light & Vibrant) ── -->
    <div class="container">
      <div class="pills-header-light">
        <span class="badge-premium-light"><i class="bi bi-grid-fill"></i> Explorar Catálogo</span>
        <h2 class="pills-title-light">Elige tu Formato Ideal</h2>
        <p class="pills-sub-light">Soluciones completas para hidratación premium</p>
      </div>

      <div class="pills-row-light">
        <button
          class="category-pill-massive-light"
          :class="{ active: selectedCategoryId === null }"
          @click="filterByCategory(null)"
        >
          <div class="pill-icon"><i class="bi bi-grid-fill"></i></div>
          <span>Todo</span>
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-pill-massive-light"
          :class="{ active: selectedCategoryId === category.id }"
          @click="filterByCategory(category.id)"
        >
          <div class="pill-icon"><i class="bi bi-droplet-half"></i></div>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </div>

    <!-- ── Products Grid (Light 3D Breakout) ── -->
    <div class="container products-area-light">
      <transition-group name="fade-slide" tag="div" class="products-grid-light">
        <div
          v-for="product in productsToDisplay"
          :key="product.id"
          class="product-card-3d-light"
        >
          <div class="card-3d-backdrop-light"></div>
          <div class="card-3d-content-light">
            <div class="img-breakout-light" @click="goToProduct(product.id)">
              <img :src="getProductImage(product)" :alt="product.name" />
            </div>
            <div class="card-info-light">
              <h4 class="prod-title">{{ product.name }}</h4>
              <p class="prod-desc">{{ product.description }}</p>
              <div class="prod-action-row">
                <div class="prod-price">S/ <span>{{ product.price }}</span></div>
                <button class="btn-add-cart-light" @click.stop="addToCart(product)">
                  <i class="bi bi-cart-plus-fill"></i> Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <div v-if="productsToDisplay.length === 0" class="empty-cat-light">
        <i class="bi bi-droplet"></i>
        <p>No hay productos disponibles en esta categoría en este momento.</p>
      </div>
    </div>

    <!-- ── Quality Seals (Light Premium) ── -->
    <div class="quality-section-light-premium">
      <!-- SVG Wave Divider -->
      <div class="section-wave" aria-hidden="true" style="position:absolute; top:0; left:0; width:100%; line-height:0; transform: translateY(-99%);">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="display:block; width:100%; height:40px;">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="var(--am-bg-alt)"/>
          <path d="M0,50 C480,20 960,70 1440,30 L1440,60 L0,60 Z" fill="rgba(0,170,228,0.05)"/>
        </svg>
      </div>

      <div class="container">
        <div class="quality-header-light">
          <span class="badge-premium-light"><i class="bi bi-award-fill"></i> Garantía Agua Moche</span>
          <h2 class="quality-title-light">Certificaciones de Calidad</h2>
        </div>

        <div class="seals-grid-light">
          <div class="badge-seal-premium-light">
            <div class="seal-icon-wrap-light"><i class="bi bi-clipboard2-pulse"></i></div>
            <h5>Ósmosis Inversa</h5>
            <p>Filtración multietapa que remueve el 99.9% de impurezas.</p>
          </div>
          <div class="badge-seal-premium-light">
            <div class="seal-icon-wrap-light"><i class="bi bi-snow"></i></div>
            <h5>Hielo Premium</h5>
            <p>Sólido, cristalino y fabricado con agua 100% purificada.</p>
          </div>
          <div class="badge-seal-premium-light">
            <div class="seal-icon-wrap-light"><i class="bi bi-shield-check"></i></div>
            <h5>Esterilización UV</h5>
            <p>Desinfección microbiológica absoluta para tu seguridad.</p>
          </div>
          <div class="badge-seal-premium-light">
            <div class="seal-icon-wrap-light"><i class="bi bi-credit-card"></i></div>
            <h5>Pago Seguro</h5>
            <p>Aceptamos Yape, Plin, tarjetas y transferencias.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog Overlay -->
    <div class="mui-dialog-overlay" :class="{ 'show': showDialog }">
      <div class="mui-dialog">
        <h3 class="mui-dialog-title">Añadido al Carrito</h3>
        <p class="mui-dialog-content">{{ dialogMessage }}</p>
        <div class="mui-dialog-actions">
          <button class="mui-btn-text text-secondary" @click="showDialog = false">SEGUIR COMPRANDO</button>
          <button class="mui-btn-text text-primary" @click="goToCart">IR AL CARRITO</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import imageBottle from '@/assets/images2/1.jpeg'
import imageJug from '@/assets/images2/3.jpeg'
import imageGlass from '@/assets/images2/4.jpeg'
import { addToCart as globalAddToCart } from '@/composables/useCart.js'

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

const categories = ref([])
const products = ref([])
const selectedCategoryId = ref(null)
const router = useRouter()

const goToProduct = (id) => {
  router.push({ name: 'productDetail', params: { id } })
}

const filterByCategory = (id) => {
  selectedCategoryId.value = id
}

const showDialog = ref(false)
const dialogMessage = ref('')

const addToCart = (product) => {
  globalAddToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: getProductImage(product),
    quantity: 1
  })
  
  dialogMessage.value = `${product.name} ha sido añadido a tu carrito.`
  showDialog.value = true
}

const goToCart = () => {
  showDialog.value = false
  router.push('/carrito')
}

const productsToDisplay = computed(() => {
  if (selectedCategoryId.value === null) return products.value
  return products.value.filter(p => p.category === selectedCategoryId.value)
})

onMounted(async () => {
  try {
    const [catRes, prodRes] = await Promise.all([
      axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/categories/`),
      axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/products/`)
    ])
    categories.value = catRes.data.results || catRes.data
    products.value = prodRes.data.results || prodRes.data
  } catch (err) {
    console.error('Error cargando datos:', err)
  }
})
</script>

<style scoped>
.nav-section-light {
  background-color: var(--am-bg-main);
  position: relative;
  overflow: hidden;
}

/* ── Pills Header ── */
.pills-header-light {
  text-align: center;
  padding: 80px 0 40px;
}

.badge-premium-light {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(0, 170, 228, 0.1);
  border: 1px solid rgba(0, 170, 228, 0.2);
  border-radius: 50px;
  color: var(--am-primary);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.pills-title-light {
  font-family: var(--font-display) !important;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--am-text-main);
  margin-bottom: 15px;
}

.pills-sub-light {
  font-size: 1.1rem;
  color: var(--am-text-muted);
}

/* Massive Category Pills (Light) */
.pills-row-light {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 60px;
}

.category-pill-massive-light {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #ffffff;
  border: 1px solid var(--am-border);
  border-radius: 60px;
  padding: 12px 30px 12px 12px;
  color: var(--am-text-main);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
}

.category-pill-massive-light .pill-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--am-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--am-text-muted);
  transition: all 0.4s;
}

.category-pill-massive-light:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-color: rgba(0, 170, 228, 0.3);
}

.category-pill-massive-light.active {
  background: var(--am-primary);
  color: #fff;
  border-color: var(--am-primary);
  box-shadow: 0 10px 30px rgba(0, 170, 228, 0.3);
}

.category-pill-massive-light.active .pill-icon {
  background: #fff;
  color: var(--am-primary);
}

/* ── 3D Breakout Cards (Light) ── */
.products-area-light {
  padding-bottom: 100px;
}

.products-grid-light {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  padding-top: 50px; /* Space for breakout images */
}

.product-card-3d-light {
  position: relative;
  height: 100%;
  padding-top: 60px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card-3d-light:hover {
  transform: translateY(-15px);
}

.card-3d-backdrop-light {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background: #ffffff;
  border: 1px solid var(--am-border);
  border-radius: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  transition: all 0.4s;
}

.product-card-3d-light:hover .card-3d-backdrop-light {
  border-color: rgba(0, 170, 228, 0.3);
  box-shadow: 0 20px 50px rgba(0, 170, 228, 0.15);
}

.card-3d-content-light {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 25px 25px;
}

.img-breakout-light {
  position: relative;
  margin-top: -60px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.img-breakout-light img {
  height: 220px;
  object-fit: contain;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.1));
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s;
}

.product-card-3d-light:hover .img-breakout-light img {
  transform: scale(1.1) rotate(3deg);
  filter: drop-shadow(0 20px 30px rgba(0, 170, 228, 0.2));
}

.card-info-light {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.prod-title {
  font-family: var(--font-display) !important;
  font-size: 1.4rem;
  color: var(--am-text-main);
  margin-bottom: 10px;
  font-weight: 700;
}

.prod-desc {
  color: var(--am-text-muted);
  font-size: 0.95rem;
  flex-grow: 1;
  margin-bottom: 25px;
}

.prod-action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--am-border);
  padding-top: 20px;
}

.prod-price {
  color: var(--am-text-muted);
  font-size: 1rem;
}

.prod-price span {
  font-family: var(--font-display) !important;
  color: var(--am-primary);
  font-size: 1.8rem;
  font-weight: 800;
}

.btn-add-cart-light {
  background: rgba(0, 170, 228, 0.1);
  border: none;
  color: var(--am-primary);
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-add-cart-light:hover {
  background: var(--am-primary);
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 170, 228, 0.4);
}

/* Fade Slide Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ── Quality Section ── */
.quality-section-light-premium {
  position: relative;
  background: var(--am-bg-alt);
  padding: 120px 0;
}

.quality-header-light {
  text-align: center;
  margin-bottom: 60px;
}

.quality-title-light {
  font-family: var(--font-display) !important;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--am-text-main);
}

.seals-grid-light {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.badge-seal-premium-light {
  background: #ffffff;
  border: 1px solid var(--am-border);
  border-radius: 30px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  transition: transform 0.4s, box-shadow 0.4s;
}

.badge-seal-premium-light:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 170, 228, 0.1);
  border-color: rgba(0, 170, 228, 0.2);
}

.seal-icon-wrap-light {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: rgba(0, 170, 228, 0.1);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--am-primary);
  transform: rotate(45deg);
}

.seal-icon-wrap-light i {
  transform: rotate(-45deg);
}

.badge-seal-premium-light h5 {
  font-family: var(--font-display) !important;
  color: var(--am-text-main);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.badge-seal-premium-light p {
  color: var(--am-text-muted);
  font-size: 0.95rem;
  margin: 0;
}

@media (max-width: 768px) {
  .products-grid-light { grid-template-columns: 1fr; }
  .pills-row-light { gap: 10px; }
}

/* Material UI Dialog Styles */
.mui-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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

.mui-dialog {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12);
  transform: scale(0.9);
  transition: transform 0.3s ease;
  font-family: "Roboto", "Segoe UI", sans-serif;
}

.mui-dialog-overlay.show .mui-dialog {
  transform: scale(1);
}

.mui-dialog-title {
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.mui-dialog-content {
  margin: 0 0 24px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.6);
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
  letter-spacing: 0.02857em;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.mui-btn-text:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.mui-btn-text.text-primary {
  color: #0284c7;
}

.mui-btn-text.text-primary:hover {
  background-color: rgba(2, 132, 199, 0.08);
}

.mui-btn-text.text-secondary {
  color: #64748b;
}

.mui-btn-text.text-secondary:hover {
  background-color: rgba(100, 116, 139, 0.08);
}

</style>
