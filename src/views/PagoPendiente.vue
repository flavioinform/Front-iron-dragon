<template>
  <div class="payment-result-page d-flex align-items-center justify-content-center">
    <div class="result-glass-card text-center p-5">
      <div class="pending-icon-wrapper mb-4 mx-auto">
        <i class="bi bi-hourglass-split pending-icon"></i>
      </div>

      <h2 class="fw-bold text-white mb-2">Pago en Proceso</h2>
      <p class="text-muted-ei mb-5 fs-5">Tu pago está siendo verificado. Te notificaremos cuando se confirme.</p>

      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <router-link to="/home" class="btn-primary-ei-checkout">
          <i class="bi bi-house me-2"></i>Ir al inicio
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

.result-glass-card {
  background: rgba(10, 31, 56, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  max-width: 520px;
  width: 90%;
}

.pending-icon-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pending-icon {
  font-size: 3rem;
  color: #f59e0b;
  animation: spin-slow 3s linear infinite;
}
@keyframes spin-slow {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

.btn-primary-ei-checkout {
  background-color: var(--ei-primary);
  color: #05101f;
  padding: 12px 32px;
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
