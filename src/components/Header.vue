<template>
  <div class="header-container">
    <!-- Barra superior roja -->
    <div class="top-bar">
      <div class="top-content">
        <!-- Información de contacto -->
        <div class="contact-info">
          <span class="contact-item">📍 Universidad de Tarapacá, Iquique</span>
          <span class="contact-item">✉️ irondragon@gmail.com</span>
          <span class="contact-item">📞 +569 1234 5678</span>
        </div>
        <!-- Botones derecha -->
        <div class="top-buttons">
          <!-- <a href="#" class="instagram-link">📷</a> -->
          <button class="account-btn" v-if="!username" @click="handleAccountClick">
            👤 Mi Cuenta
          </button>
          <button class="account-btn" v-if="!username" @click="handleRegisterClick" style="margin-left:8px;">
            Crear cuenta
          </button>
          <button class="account-btn" v-else @click="logout">
            <span style="margin-right:8px; color:black; font-weight:600;">{{ username }}</span>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
    <!-- Sección del logo -->
    <div class="logo-section">
      <div class="logo-content">
        <!-- Logo -->
        <div class="logo">
          <img src="../assets/images/logodr.png" alt="IronDragon" class="logo-img" />
        </div>
        <!-- Derecha: mensaje y carrito -->
        <div class="right-section">
          <div class="specialist-text">
            Somos la tienda especialista en <span class="red-text">Suplementos</span>
          </div>
          <router-link to="/carrito" class="cart-btn">
            🛒
            <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
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
import { username, isAdmin, setUsername, setAdmin } from '@/composables/useUser.js'

const router = useRouter()

const cartItemsCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

onMounted(() => {
  initCart()
  if (!username.value) {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => {
        setUsername(res.data.username || res.data.user || res.data.name || '')
      }).catch(() => {
        setUsername('')
      })
    }
  }
})

function handleAccountClick() {
  router.push('/login')
}
function handleRegisterClick() {
  router.push('/register')
}
async function logout() {
  const refresh = localStorage.getItem("refresh")
  try {
    await axios.post("http://127.0.0.1:8000/api/logout/", { refresh }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
    })
  } catch (err) {
    console.error("Error cerrando sesión:", err)
  }
  clearCart()
  setUsername('')
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push('/login')
}

</script>

<style scoped>
.header-container {
   width: 100%;
  font-family: Arial, sans-serif;
  z-index: 2020;
  background: #fff;
}
.top-bar {
  background-color: #dc2626;
  color: white;
  padding: 8px 16px;
  margin-bottom: 0;
}
.top-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.contact-info {
  display: flex;
  gap: 24px;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.top-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}
.instagram-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
}
.instagram-link:hover {
  opacity: 0.8;
}
.account-btn {
  background-color: white;
  color: #dc2626;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.account-btn:hover {
  background-color: #f3f4f6;
}
.logo-section {
  background-color: rgb(252, 251, 251);
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-top: 0;
}
.logo-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-img {
  height: 80px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
}
.right-section {
  display: flex;
  align-items: center;
  gap: 24px;
}
.specialist-text {
  font-size: 16px;
  color: #374151;
}
.red-text {
  color: #dc2626;
  font-weight: 600;
}
.cart-btn {
  position: relative;
  background: none;
  border: 2px solid #dc2626;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.cart-btn:hover {
  background-color: #fef2f2;
}
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc2626;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
@media (max-width: 768px) {
  .contact-info {
    gap: 12px;
  }
  .contact-item:first-child {
    display: none;
  }
  .specialist-text {
    display: none;
  }
  .logo {
    font-size: 32px;
  }
}
@media (max-width: 480px) {
  .contact-info {
    flex-direction: column;
    gap: 4px;
  }
  .top-content {
    font-size: 12px;
  }
}
</style>