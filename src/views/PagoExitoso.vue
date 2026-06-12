<template>
  <div class="payment-result-page d-flex align-items-center justify-content-center">
    <div class="result-glass-card text-center p-5">
      <!-- Animación de éxito -->
      <div class="success-icon-wrapper mb-4 mx-auto">
        <div class="success-ring"></div>
        <i class="bi bi-check-lg success-checkmark"></i>
      </div>

      <h2 class="fw-bold text-white mb-2">¡Pago Exitoso!</h2>
      <p class="text-muted-ei mb-1 fs-5">Tu pedido ha sido confirmado</p>
      <p v-if="orderId" class="text-muted-ei small mb-5">
        Orden <strong class="ei-text-primary">#{{ orderId }}</strong>
      </p>

      <div class="order-info-card mb-5">
        <div class="d-flex align-items-center gap-3 mb-3">
          <i class="bi bi-truck fs-4 ei-text-primary"></i>
          <div class="text-start">
            <p class="text-white fw-semibold mb-0">Entrega a domicilio</p>
            <p class="text-muted-ei small mb-0">Recibirás una confirmación pronto</p>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-whatsapp fs-4 text-success"></i>
          <div class="text-start">
            <p class="text-white fw-semibold mb-0">Coordina tu entrega</p>
            <p class="text-muted-ei small mb-0">Nuestro equipo te contactará pronto</p>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <router-link to="/home" class="btn-secondary-ei">
          <i class="bi bi-house me-2"></i>Volver al inicio
        </router-link>
        <router-link to="/productos" class="btn-primary-ei-checkout">
          <i class="bi bi-bag me-2"></i>Seguir comprando
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderId = computed(() => route.query.order_id || '')
</script>

<style scoped>
.payment-result-page {
  min-height: 80vh;
  background: transparent;
  font-family: var(--font-body);
}
.text-white { color: var(--ei-text-main) !important; }
.text-muted-ei { color: var(--ei-text-muted) !important; }
.ei-text-primary { color: var(--ei-secondary) !important; }

.result-glass-card {
  background: rgba(10, 31, 56, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  max-width: 520px;
  width: 90%;
}

/* Icono de éxito animado */
.success-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid #2dd4bf;
  animation: expand-ring 0.6s ease-out forwards, glow-success 2s 0.6s infinite;
}

.success-checkmark {
  font-size: 3rem;
  color: #2dd4bf;
  animation: pop-in 0.4s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes expand-ring {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
@keyframes pop-in {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}
@keyframes glow-success {
  0%, 100% { box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(45, 212, 191, 0); }
}

.order-info-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-md);
  padding: 20px;
}

.btn-secondary-ei {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--ei-border-muted);
  color: var(--ei-text-muted);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-secondary-ei:hover {
  background: rgba(255,255,255,0.1);
  color: var(--ei-text-main);
}

.btn-primary-ei-checkout {
  background-color: var(--ei-primary);
  color: #05101f;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-primary-ei-checkout:hover {
  background-color: var(--ei-primary-hover);
  color: white;
}
</style>
