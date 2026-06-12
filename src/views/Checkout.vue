<template>
  <div class="checkout-ei-section py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-9">

          <!-- Encabezado -->
          <div class="d-flex align-items-center gap-3 mb-5">
            <router-link to="/carrito" class="btn-back-ei">
              <i class="bi bi-arrow-left"></i>
            </router-link>
            <div>
              <h2 class="fw-bold text-white mb-0">Finalizar Compra</h2>
              <p class="text-muted-ei mb-0 small">Completa tus datos para continuar al pago</p>
            </div>
          </div>

          <!-- Error global -->
          <div v-if="errorMessage" class="alert-danger-ei d-flex align-items-start gap-3 mb-4">
            <i class="bi bi-exclamation-triangle-fill fs-4 text-danger mt-1"></i>
            <div>
              <strong class="text-white">Error</strong>
              <p class="mb-0 small text-muted-ei">{{ errorMessage }}</p>
            </div>
          </div>

          <div class="row g-4">
            <!-- Columna izquierda: Formulario -->
            <div class="col-12 col-lg-7">
              <div class="checkout-glass-card p-4">
                <h5 class="fw-bold text-white mb-4 border-bottom-ei pb-3">
                  <i class="bi bi-geo-alt-fill ei-text-primary me-2"></i>
                  Datos de Entrega
                </h5>

                <form @submit.prevent="handleCheckout" id="checkout-form">
                  <!-- TIPO DE ENTREGA -->
                  <h5 class="fw-bold text-white mb-3 mt-2">
                    <i class="bi bi-truck ei-text-primary me-2"></i>
                    Método de Entrega
                  </h5>
                  <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
                    <div class="delivery-method-card flex-grow-1" :class="{ active: form.delivery_method === 'delivery' }" @click="form.delivery_method = 'delivery'">
                      <div class="d-flex align-items-center gap-3">
                        <div class="payment-method-radio">
                          <div class="radio-dot" v-if="form.delivery_method === 'delivery'"></div>
                        </div>
                        <div>
                          <p class="fw-bold text-white mb-0">Envío a Domicilio</p>
                          <small class="text-muted-ei">Recíbelo en tu hogar u oficina</small>
                        </div>
                      </div>
                    </div>
                    
                    <div class="delivery-method-card flex-grow-1" :class="{ active: form.delivery_method === 'pickup' }" @click="form.delivery_method = 'pickup'">
                      <div class="d-flex align-items-center gap-3">
                        <div class="payment-method-radio">
                          <div class="radio-dot" v-if="form.delivery_method === 'pickup'"></div>
                        </div>
                        <div>
                          <p class="fw-bold text-white mb-0">Retiro en Local</p>
                          <small class="text-muted-ei">Pasa a buscarlo sin costo de envío</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- DATOS DEL DESTINATARIO -->
                  <h5 class="fw-bold text-white mb-4 border-bottom-ei pb-3">
                    <i class="bi bi-person-lines-fill ei-text-primary me-2"></i>
                    Datos Personales
                  </h5>

                  <div class="form-floating mb-3">
                    <input
                      v-model="form.shipping_name"
                      type="text"
                      id="shippingName"
                      placeholder="Nombre completo"
                      class="form-control input-ei"
                      required
                      maxlength="200"
                    />
                    <label for="shippingName" class="label-ei">Nombre completo de quien recibe</label>
                  </div>

                  <div v-if="form.delivery_method === 'delivery'">
                    <div class="form-floating mb-3">
                      <input
                        v-model="form.shipping_address"
                        type="text"
                        id="shippingAddress"
                        placeholder="Dirección"
                        class="form-control input-ei"
                        required
                        maxlength="500"
                      />
                      <label for="shippingAddress" class="label-ei">Dirección de entrega</label>
                    </div>

                    <div class="row g-3 mb-3">
                      <div class="col-12 col-sm-6">
                        <div class="form-floating">
                          <input
                            v-model="form.shipping_city"
                            type="text"
                            id="shippingCity"
                            placeholder="Ciudad"
                            class="form-control input-ei"
                            required
                            maxlength="100"
                          />
                          <label for="shippingCity" class="label-ei">Ciudad</label>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6">
                        <div class="form-floating">
                          <input
                            v-model="form.shipping_phone"
                            type="tel"
                            id="shippingPhone"
                            placeholder="Teléfono"
                            class="form-control input-ei"
                            required
                            maxlength="20"
                            pattern="[0-9+\-\s]+"
                          />
                          <label for="shippingPhone" class="label-ei">Teléfono de contacto</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="row g-3 mb-3">
                      <div class="col-12">
                        <div class="form-floating">
                          <input
                            v-model="form.shipping_phone"
                            type="tel"
                            id="shippingPhonePickup"
                            placeholder="Teléfono"
                            class="form-control input-ei"
                            required
                            maxlength="20"
                            pattern="[0-9+\-\s]+"
                          />
                          <label for="shippingPhonePickup" class="label-ei">Teléfono de contacto</label>
                        </div>
                      </div>
                  </div>

                  <div class="form-floating mb-4">
                    <textarea
                      v-model="form.notes"
                      id="notes"
                      placeholder="Notas"
                      class="form-control input-ei"
                      style="height: 90px;"
                      maxlength="500"
                    ></textarea>
                    <label for="notes" class="label-ei">Notas adicionales (opcional)</label>
                  </div>

                  <!-- Método de pago -->
                  <h5 class="fw-bold text-white mb-3 border-bottom-ei pb-3">
                    <i class="bi bi-credit-card-fill ei-text-primary me-2"></i>
                    Método de Pago
                  </h5>

                  <div class="payment-method-card active mb-4" @click="form.payment_method = 'mercadopago'">
                    <div class="d-flex align-items-center gap-3">
                      <div class="payment-method-radio">
                        <div class="radio-dot" v-if="form.payment_method === 'mercadopago'"></div>
                      </div>
                      <img src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/online/468X60.jpg"
                           alt="MercadoPago"
                           class="mp-logo"
                           onerror="this.style.display='none'"
                      />
                      <div>
                        <p class="fw-bold text-white mb-0">MercadoPago</p>
                        <small class="text-muted-ei">Tarjeta, Yape, Plin y más</small>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>

            <!-- Columna derecha: Resumen -->
            <div class="col-12 col-lg-5">
              <div class="checkout-glass-card p-4 sticky-top-custom">
                <h5 class="fw-bold text-white mb-4 border-bottom-ei pb-3">Resumen del Pedido</h5>

                <div v-for="item in cart" :key="item.id" class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center gap-2">
                    <span class="qty-chip-ei">{{ item.quantity }}x</span>
                    <span class="text-white small fw-semibold">{{ item.name }}</span>
                  </div>
                  <span class="text-muted-ei small fw-bold">S/ {{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>

                <div class="border-top-ei mt-3 pt-3 mb-4">
                  <div class="d-flex justify-content-between mb-2 text-muted-ei small">
                    <span>Envío:</span>
                    <span class="text-success fw-bold">Gratis</span>
                  </div>
                  <div v-if="referralDiscountPct > 0" class="d-flex justify-content-between mb-2 small text-warning">
                    <span>Descuento Referidos ({{ referralDiscountPct }}%):</span>
                    <span class="fw-bold">-S/ {{ referralDiscountAmount.toFixed(2) }}</span>
                  </div>
                  
                  <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top-ei">
                    <span class="text-white fw-bold">Total:</span>
                    <span class="ei-text-primary fw-black fs-4">S/ {{ finalTotal.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Banner Aplicar Descuento de Referidos -->
                <div v-if="availableReferralDiscount > 0" class="alert-info-ei mb-4 p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <strong class="text-white d-block"><i class="bi bi-gift-fill me-2 text-warning"></i>¡Tienes un {{ availableReferralDiscount }}% de descuento!</strong>
                    <span class="small text-muted-ei">Por tus referidos acumulados.</span>
                  </div>
                  <div class="form-check form-switch ms-3">
                    <input class="form-check-input" type="checkbox" role="switch" id="applyRefDiscount" v-model="applyReferralDiscount">
                    <label class="form-check-label text-white small ms-1" for="applyRefDiscount">Aplicar</label>
                  </div>
                </div>

                <!-- Seguridad -->
                <div class="security-badge-ei mb-4">
                  <i class="bi bi-lock-fill ei-text-primary me-2"></i>
                  <span class="small text-muted-ei">Pago 100% seguro con cifrado SSL</span>
                </div>

                <!-- Botón de pago -->
                <button
                  type="submit"
                  form="checkout-form"
                  class="btn-pay-mp w-100"
                  :disabled="isLoading || cart.length === 0"
                >
                  <span v-if="isLoading">
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando...
                  </span>
                  <span v-else>
                    <i class="bi bi-lock-fill me-2"></i>
                    Pagar S/ {{ finalTotal.toFixed(2) }} con MercadoPago
                  </span>
                </button>

                <p class="text-center text-muted-ei small mt-3">
                  Al continuar, aceptas nuestros
                  <router-link to="/politica" class="ei-text-primary">Términos de Servicio</router-link>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { cart, clearCart } from '@/composables/useCart.js'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

const availableReferralDiscount = ref(0)
const applyReferralDiscount = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('access')
  if (token) {
    try {
      const res = await axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const currentReferrals = res.data.current_referrals || 0
      availableReferralDiscount.value = Math.floor(currentReferrals / 20) * 10
    } catch (e) {
      console.error('No se pudo cargar perfil', e)
    }
  }
})

const form = ref({
  shipping_name: '',
  shipping_address: '',
  shipping_city: 'Trujillo',
  shipping_phone: '',
  notes: '',
  payment_method: 'mercadopago',
  delivery_method: 'delivery',
})

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const referralDiscountPct = computed(() => {
  return applyReferralDiscount.value ? availableReferralDiscount.value : 0
})

const referralDiscountAmount = computed(() => {
  return (total.value * referralDiscountPct.value) / 100
})

const finalTotal = computed(() => {
  return Math.max(0, total.value - referralDiscountAmount.value)
})

async function handleCheckout() {
  if (cart.value.length === 0) {
    errorMessage.value = 'Tu carrito está vacío. Agrega productos antes de continuar.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  const token = localStorage.getItem('access')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    // Construir items del carrito para enviar al backend
    // El backend los resolverá a variantes automáticamente usando product_id
    const cartItems = cart.value.map(item => ({
      product_id: item.id,      // ID del producto en localStorage
      quantity: item.quantity
    }))

    const orderPayload = {
      shipping_name: form.value.shipping_name,
      shipping_address: form.value.delivery_method === 'delivery' ? form.value.shipping_address : 'Retiro en Local',
      shipping_city: form.value.delivery_method === 'delivery' ? form.value.shipping_city : 'Trujillo',
      shipping_phone: form.value.shipping_phone,
      payment_method: form.value.payment_method,
      delivery_method: form.value.delivery_method,
      notes: form.value.notes || '',
      items: cartItems,   // Items directos del frontend
      apply_referral_discount: applyReferralDiscount.value,
    }

    // Paso 1: Crear la orden en el backend
    const orderRes = await axios.post(
      `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/orders/checkout/`,
      orderPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    const orderId = orderRes.data.id

    // Paso 2: Crear la Preference de MercadoPago
    const prefRes = await axios.post(
      `${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/payments/create-preference/`,
      { order_id: orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // Paso 3: Limpiar carrito local antes de redirigir
    clearCart()

    // Paso 4: Redirigir al usuario a MercadoPago
    const paymentUrl = prefRes.data.init_point || prefRes.data.sandbox_init_point
    window.location.href = paymentUrl

  } catch (err) {
    console.error('Error en checkout:', err)
    const data = err.response?.data
    if (data) {
      const firstKey = Object.keys(data)[0]
      if (Array.isArray(data[firstKey])) {
        errorMessage.value = data[firstKey][0]
      } else if (typeof data[firstKey] === 'string') {
        errorMessage.value = data[firstKey]
      } else if (data.error) {
        errorMessage.value = data.error
      } else if (data.detail) {
        errorMessage.value = data.detail
      } else {
        errorMessage.value = 'Ocurrió un error al procesar el pago. Intenta de nuevo.'
      }
    } else {
      errorMessage.value = 'No se pudo conectar con el servidor.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.checkout-ei-section {
  background: transparent;
  min-height: 85vh;
  font-family: var(--font-body);
}

.text-white { color: var(--ei-text-main) !important; }
.text-muted-ei { color: var(--ei-text-muted) !important; }
.ei-text-primary { color: var(--ei-secondary) !important; }
.fw-black { font-weight: 900; }
.border-bottom-ei { border-bottom: 1px solid var(--ei-border-muted); }
.border-top-ei { border-top: 1px solid var(--ei-border-muted); }

.btn-back-ei {
  width: 42px;
  height: 42px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  color: var(--ei-text-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.btn-back-ei:hover {
  border-color: var(--ei-border-active);
  color: var(--ei-text-main);
}

.checkout-glass-card {
  background: rgba(10, 31, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.sticky-top-custom {
  position: sticky;
  top: 100px;
}

/* Inputs */
.input-ei {
  background-color: rgba(6, 13, 31, 0.6) !important;
  border: 1px solid var(--ei-border-muted) !important;
  border-radius: var(--radius-md) !important;
  color: var(--ei-text-main) !important;
  transition: all 0.3s;
}
.input-ei:focus {
  background-color: rgba(6, 13, 31, 0.85) !important;
  border-color: var(--ei-primary) !important;
  box-shadow: 0 0 0 3px rgba(106, 176, 255, 0.2) !important;
}
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  color: var(--ei-primary) !important;
}
.form-floating > .form-control:focus ~ label::after,
.form-floating > .form-control:not(:placeholder-shown) ~ label::after {
  background-color: transparent !important;
}
.label-ei { color: var(--ei-text-muted); }

/* Método de pago y Envío */
.payment-method-card, .delivery-method-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.payment-method-card.active, .delivery-method-card.active {
  border-color: var(--ei-primary);
  background: rgba(106, 176, 255, 0.05);
}
.payment-method-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--ei-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.radio-dot {
  width: 10px;
  height: 10px;
  background: var(--ei-primary);
  border-radius: 50%;
}
.mp-logo {
  height: 30px;
  width: auto;
  object-fit: contain;
}

/* Resumen */
.qty-chip-ei {
  background: rgba(106, 176, 255, 0.1);
  color: var(--ei-secondary);
  border: 1px solid rgba(106, 176, 255, 0.2);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.security-badge-ei {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

/* Botón Principal de Pago */
.btn-pay-mp {
  background: linear-gradient(135deg, #009ee3 0%, #0070a8 100%);
  color: white;
  border: none;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 158, 227, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-pay-mp:hover:not(:disabled) {
  background: linear-gradient(135deg, #00b4f5 0%, #009ee3 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 158, 227, 0.4);
}
.btn-pay-mp:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Alert danger dark */
.alert-danger-ei {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  padding: 16px;
}
</style>
