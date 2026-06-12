<template>
  <div class="header-shell">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-inner">
        <div class="contact-strip">
          <span class="contact-item">
            <i class="bi bi-geo-alt-fill"></i> Trujillo, Perú
          </span>
          <span class="contact-sep">·</span>
          <a href="mailto:Contactoaguamoche@gmail.com" class="text-white text-decoration-none small-text me-3 d-flex align-items-center">
            <i class="bi bi-envelope-fill me-1"></i> Contactoaguamoche@gmail.com
          </a>
          <span class="contact-sep">·</span>
          <a href="tel:+51961745295" class="text-white text-decoration-none fw-bold small-text d-flex align-items-center">
            <i class="bi bi-telephone-fill me-1"></i> +51 961 745 295
          </a>
        </div>

        <div class="session-controls">
          <template v-if="!username">
            <button class="top-btn" @click="handleAccountClick">
              <i class="bi bi-person-circle"></i> Iniciar Sesión
            </button>
            <button class="top-btn top-btn--filled" @click="handleRegisterClick">
              Crear cuenta
            </button>
          </template>
          <template v-else>
            <span class="user-pill">
              <i class="bi bi-droplet-fill"></i> {{ username }}
            </span>
            <button class="top-btn top-btn--danger" @click="logout">
              Salir <i class="bi bi-box-arrow-right ms-1"></i>
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Logo Bar -->
    <div class="logo-bar">
      <div class="logo-inner">
        <!-- Logo -->
        <div class="brand-wrap" @click="router.push('/')">
          <img src="../assets/moche3d1.png" alt="Agua Moche" class="brand-logo" />
          <div class="brand-wordmark">
            <span class="brand-name">Agua Moche</span>
            <span class="brand-tagline">Pureza · Frescura · Calidad</span>
          </div>
        </div>

        <!-- Right side -->
        <div class="logo-right">
          <span class="specialty-label d-none d-lg-inline-flex">
            <i class="bi bi-snow2"></i>
            Agua Purificada &amp; Hielo Premium
          </span>
          <router-link to="/carrito" class="cart-btn" id="header-cart-btn">
            <span class="cart-icon-wrap">
              <i class="bi bi-bag"></i>
              <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
            </span>
            <span class="cart-text d-none d-sm-block">Mi Bolsa</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { cart, clearCart, initCart } from '@/composables/useCart.js'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { username, setUsername, setAdmin } from '@/composables/useUser.js'

const router = useRouter()

const cartItemsCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

onMounted(() => {
  initCart()
  if (!username.value) {
    const token = localStorage.getItem('access')
    if (token) {
      axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUsername(res.data.username || '')
      }).catch(() => {
        setUsername('')
      })
    }
  }
})

function handleAccountClick() { router.push('/login') }
function handleRegisterClick() { router.push('/register') }

async function logout() {
  try {
    // Si no hay endpoint de logout configurado en backend JWT, fallará silenciosamente, 
    // pero limpiamos localStorage igualmente.
    await axios.post(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/logout/`, { refresh }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    })
  } catch (err) {
    console.error('Error cerrando sesión:', err)
  }
  clearCart()
  setUsername('')
  setAdmin(false)
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push('/login')
}
</script>

<style scoped>
/* ---------- Shell ---------- */
.header-shell {
  width: 100%;
  background: var(--am-void);
  border-bottom: 1px solid rgba(0, 201, 232, 0.08);
  position: relative;
}

/* ---------- Top Bar ---------- */
.top-bar {
  background: rgba(3, 12, 20, 0.95);
  border-bottom: 1px solid rgba(0, 201, 232, 0.06);
  padding: 8px 0;
}

.top-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-strip {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  transition: color 0.25s;
}

.contact-item:hover { color: var(--am-crystal); }
.contact-item i { color: var(--am-crystal); font-size: 0.72rem; }

.contact-sep {
  color: rgba(0, 201, 232, 0.2);
  font-size: 0.75rem;
}

.session-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-btn {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid rgba(0, 201, 232, 0.15);
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.25s;
  letter-spacing: 0.01em;
}

.top-btn:hover {
  border-color: var(--am-crystal);
  color: var(--am-crystal);
}

.top-btn--filled {
  background: var(--am-crystal);
  color: var(--am-void);
  border-color: transparent;
  font-weight: 600;
}

.top-btn--filled:hover {
  background: var(--am-frost);
  color: var(--am-void);
  border-color: transparent;
}

.top-btn--danger {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.2);
}

.top-btn--danger:hover {
  background: rgba(248, 113, 113, 0.1);
  border-color: #f87171;
  color: #f87171;
}

.user-pill {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--am-crystal);
  background: rgba(0, 201, 232, 0.08);
  border: 1px solid rgba(0, 201, 232, 0.2);
  padding: 5px 14px;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.user-pill i { font-size: 0.7rem; }

/* ---------- Logo Bar ---------- */
.logo-bar {
  background: linear-gradient(180deg, rgba(3,12,20,0.98) 0%, rgba(7,26,46,0.96) 100%);
  padding: 18px 0;
  /* Subtle water shimmer at bottom */
  box-shadow: 0 1px 0 rgba(0,201,232,0.07), 0 4px 24px rgba(0,0,0,0.4);
}

.logo-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand */
.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.brand-wrap:hover { opacity: 0.88; }

.brand-logo {
  height: 120px;
  margin-bottom: -40px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  transition: filter 0.4s, transform 0.4s var(--ease-spring);
  position: relative;
  z-index: 1050;
}

.brand-wrap:hover .brand-logo {
  filter: drop-shadow(0 6px 24px rgba(0, 201, 232, 0.5));
  transform: scale(1.03);
}

.brand-wordmark {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-display) !important;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--am-ivory);
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--am-ivory) 0%, var(--am-frost) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 0.65rem;
  color: var(--am-crystal);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 2px;
}

/* Right side */
.logo-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.specialty-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.01em;
}

.specialty-label i {
  color: var(--am-crystal);
  font-size: 0.9rem;
}

/* Cart Button */
.cart-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 201, 232, 0.07);
  border: 1px solid rgba(0, 201, 232, 0.2);
  color: var(--am-frost);
  padding: 11px 20px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.35s var(--ease-spring);
  letter-spacing: 0.01em;
}

.cart-btn:hover {
  background: rgba(0, 201, 232, 0.14);
  border-color: rgba(0, 201, 232, 0.4);
  color: var(--am-crystal);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 201, 232, 0.15);
}

.cart-icon-wrap {
  position: relative;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: var(--am-crystal);
  color: var(--am-void);
  border-radius: 50px;
  padding: 1px 6px;
  font-size: 0.65rem;
  font-weight: 800;
  animation: pulse-glow 2.5s infinite;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-strip { display: none; }
  .brand-wordmark { display: none; }
  .brand-logo { height: 90px; margin-bottom: -20px; }
  .logo-bar { padding: 14px 0; }
  .top-inner { justify-content: flex-end; }
  .specialty-label { display: none !important; }
}

@media (max-width: 480px) {
  .top-btn { padding: 4px 10px; font-size: 0.72rem; }
}
</style>
