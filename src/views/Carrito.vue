<template>
  <div class="cart-page-dark py-5">
    <div class="container">
      <div class="d-flex align-items-center gap-3 mb-5">
        <div class="cart-icon-header">
          <i class="bi bi-cart3"></i>
        </div>
        <h2 class="fw-bold mb-0 ei-title">Mi Carrito de Compras</h2>
      </div>

      <div v-if="cart.length > 0" class="row g-4">
        <!-- Lista de Artículos -->
        <div class="col-12 col-lg-8">
          <div class="cart-glass-card p-4">
            <div class="cart-header d-none d-md-grid mb-3 pb-3 border-bottom-ei text-muted fw-semibold small text-uppercase tracking-wider">
              <div class="col-img">Producto</div>
              <div class="col-details"></div>
              <div class="col-price text-center">Precio</div>
              <div class="col-qty text-center">Cantidad</div>
              <div class="col-subtotal text-end">Subtotal</div>
              <div class="col-actions"></div>
            </div>

            <div class="cart-items-list">
              <div v-for="item in cart" :key="item.id" class="cart-item-row d-flex flex-column flex-md-row align-items-md-center py-3 border-bottom-ei">
                
                <div class="item-img-container me-md-4 mb-3 mb-md-0">
                  <img :src="item.image || 'placeholder.png'" :alt="item.name" class="item-img" />
                </div>
                
                <div class="item-details flex-grow-1 mb-3 mb-md-0">
                  <h5 class="fw-bold text-white mb-1">{{ item.name }}</h5>
                  <span class="badge-ei-mini">Calidad Premium</span>
                </div>
                
                <div class="item-price text-md-center fw-semibold text-muted mb-2 mb-md-0 d-flex justify-content-between d-md-block">
                  <span class="d-md-none text-muted">Precio:</span>
                  S/ {{ item.price.toFixed(2) }}
                </div>
                
                <div class="item-qty text-md-center mb-3 mb-md-0 d-flex justify-content-between d-md-block">
                  <span class="d-md-none text-muted">Cantidad:</span>
                  <span class="qty-pill-ei">{{ item.quantity }}</span>
                </div>
                
                <div class="item-subtotal text-md-end fw-bold ei-text-primary mb-3 mb-md-0 d-flex justify-content-between d-md-block fs-5">
                  <span class="d-md-none text-muted fw-normal fs-6">Subtotal:</span>
                  S/ {{ (item.price * item.quantity).toFixed(2) }}
                </div>
                
                <div class="item-actions ms-md-4 text-end">
                  <button class="btn-remove-ei" @click="removeItem(item.id)" title="Eliminar del carrito">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Resumen de Compra -->
        <div class="col-12 col-lg-4">
          <div class="cart-glass-card p-4 sticky-top-custom">
            <h4 class="fw-bold mb-4 text-white border-bottom-ei pb-3">Resumen de Compra</h4>
            
            <div class="d-flex justify-content-between mb-3 text-muted">
              <span>Subtotal:</span>
              <span class="fw-semibold text-white">S/ {{ total.toFixed(2) }}</span>
            </div>
            
            <div class="d-flex justify-content-between mb-4 text-muted">
              <span>Envío (Trujillo):</span>
              <span class="ei-text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Gratis</span>
            </div>

            <div class="total-row d-flex justify-content-between align-items-center mb-4 pt-3 border-top-ei">
              <span class="text-white fw-bold">Total a pagar:</span>
              <span class="ei-text-primary fw-black total-price">S/ {{ total.toFixed(2) }}</span>
            </div>

            <div class="alert-info-ei d-flex align-items-start gap-3 mb-4">
              <i class="bi bi-shield-check ei-text-primary fs-4"></i>
              <p class="mb-0 small text-muted leading-tight">
                Tu pedido será entregado directamente en tu domicilio de forma gratuita (zonas urbanas).
              </p>
            </div>

            <button class="btn-checkout-whatsapp w-100 mb-3" @click="checkoutWhatsApp">
              <i class="bi bi-whatsapp fs-5"></i>
              <span>Finalizar por WhatsApp</span>
            </button>

            <router-link to="/checkout" class="btn-checkout-online w-100 mb-3">
              <i class="bi bi-credit-card-fill fs-5"></i>
              <span>Pagar Online con MercadoPago</span>
            </router-link>
            
            <router-link to="/productos" class="btn-continue-ei w-100">
              Seguir Comprando
            </router-link>
          </div>
        </div>
      </div>

      <!-- Carrito Vacío -->
      <div v-else class="text-center py-5 my-5">
        <div class="cart-glass-card p-5 mx-auto" style="max-width: 500px;">
          <div class="empty-icon-wrapper-ei mb-4 mx-auto">
            <i class="bi bi-cart-x"></i>
          </div>
          <h2 class="fw-bold text-white mb-3">Tu carrito está muy ligero</h2>
          <p class="text-muted mb-5 fs-5">Descubre el agua más pura de Trujillo y llena tu vida de hidratación premium.</p>
          <router-link to="/productos" class="btn-primary-am px-5 py-3 rounded-pill shadow-sm fs-5 fw-bold text-decoration-none d-inline-block">
            Explorar Catálogo <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
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

function checkoutWhatsApp() {
  if (cart.value.length === 0) return

  const phoneNumber = "51947823456" // Número real
  
  // Construir mensaje detallado de compra
  let message = "¡Hola Agua Moche! 💧 Quisiera concretar la compra de los siguientes productos de mi carrito:\n\n"
  
  cart.value.forEach(item => {
    message += `🔹 *${item.name}* (Cant: ${item.quantity}) - Subtotal: S/ ${(item.price * item.quantity).toFixed(2)}\n`
  })
  
  message += `\n💵 *Total a Pagar*: S/ ${total.value.toFixed(2)}\n`
  message += `🚚 *Envío*: Gratis (Domicilio en Trujillo)\n\n`
  message += "¿Me podrían indicar los datos para realizar la transferencia/pago e indicarme los horarios de reparto para hoy? ¡Muchas gracias!"

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}
</script>

<style scoped>
/* Base Dark Theme (EcoInfinity) */
.cart-page-dark {
  background: transparent;
  min-height: 85vh;
  font-family: var(--font-body);
}

.ei-title { color: var(--ei-text-main); }
.text-white { color: var(--ei-text-main) !important; }
.text-muted { color: var(--ei-text-muted) !important; }
.ei-text-primary { color: var(--ei-secondary); }
.ei-text-success { color: #2dd4bf; } /* Minty green for success in dark theme */

.fw-black { font-weight: 900; }
.leading-tight { line-height: 1.4; }
.tracking-wider { letter-spacing: 0.05em; }

.border-bottom-ei { border-bottom: 1px solid var(--ei-border-muted); }
.border-top-ei { border-top: 1px solid var(--ei-border-muted); }

/* Glass Cards */
.cart-glass-card {
  background: rgba(10, 31, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s;
}
.cart-glass-card:hover {
  border-color: var(--ei-border-active);
}

/* Header Icon */
.cart-icon-header {
  width: 50px;
  height: 50px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--ei-secondary);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
}

/* Cart Headers & Rows */
.cart-header {
  grid-template-columns: 80px 2fr 1fr 1fr 1.5fr 50px;
  gap: 15px;
}

.cart-item-row {
  transition: background-color 0.2s;
}
.cart-item-row:last-child {
  border-bottom: none !important;
}
.cart-item-row:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

@media (min-width: 768px) {
  .cart-item-row {
    display: grid !important;
    grid-template-columns: 80px 2fr 1fr 1fr 1.5fr 50px;
    gap: 15px;
  }
}

/* Image */
.item-img-container {
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
}

/* Mini Badge */
.badge-ei-mini {
  background-color: rgba(45, 212, 191, 0.1); /* Mint tint */
  color: #2dd4bf; /* Mint color */
  border: 1px solid rgba(45, 212, 191, 0.3);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
}

/* Qty Pill */
.qty-pill-ei {
  background: rgba(255, 255, 255, 0.05);
  color: var(--ei-text-main);
  padding: 4px 16px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1px solid var(--ei-border-muted);
}

/* Remove Button Subtle */
.btn-remove-ei {
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  border: none;
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
}
.btn-remove-ei:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  transform: scale(1.1);
}

/* Summary Card Sticky */
.sticky-top-custom {
  position: sticky;
  top: 100px;
}

.total-price {
  font-size: 2rem;
  letter-spacing: -0.02em;
}

.alert-info-ei {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
  padding: 16px;
}

/* Checkout Button WhatsApp */
.btn-checkout-whatsapp {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-checkout-whatsapp:hover {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

/* Checkout Button MercadoPago Online */
.btn-checkout-online {
  background: linear-gradient(135deg, #009ee3 0%, #0070a8 100%);
  color: white;
  border: none;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(0, 158, 227, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}
.btn-checkout-online:hover {
  background: linear-gradient(135deg, #00b4f5 0%, #009ee3 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 158, 227, 0.4);
}

/* Continue Shopping */
.btn-continue-ei {
  display: block;
  text-align: center;
  background: transparent;
  color: var(--ei-text-muted);
  border: 1px solid var(--ei-border-muted);
  padding: 14px;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-continue-ei:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--ei-text-main);
  border-color: var(--ei-border-active);
}

/* Empty State */
.empty-icon-wrapper-ei {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--ei-border-muted);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--ei-text-muted);
  box-shadow: inset 0 4px 10px rgba(0,0,0,0.5);
}
</style>
