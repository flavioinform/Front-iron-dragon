<template>
  <div class="payment-result-page d-flex align-items-center justify-content-center">
    <div class="result-glass-card text-center p-5">
      <div class="failure-icon-wrapper mb-4 mx-auto">
        <i class="bi bi-x-lg failure-icon"></i>
      </div>

      <h2 class="fw-bold text-white mb-2">Pago no completado</h2>
      <p class="text-muted-ei mb-5 fs-5">El pago fue cancelado o rechazado. Tu orden sigue guardada.</p>

      <div class="info-card-ei mb-5 text-start">
        <div class="d-flex align-items-start gap-3">
          <i class="bi bi-info-circle-fill ei-text-primary fs-4 mt-1"></i>
          <div>
            <p class="text-white fw-semibold mb-1">¿Qué pasó?</p>
            <ul class="text-muted-ei small mb-0 ps-3">
              <li>La tarjeta puede no tener saldo suficiente.</li>
              <li>La transacción fue cancelada manualmente.</li>
              <li>El banco bloqueó el cargo por seguridad.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <router-link to="/carrito" class="btn-retry-ei">
          <i class="bi bi-arrow-repeat me-2"></i>Volver al carrito
        </router-link>
        <router-link to="/home" class="btn-secondary-ei">
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

.failure-icon-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.failure-icon {
  font-size: 3rem;
  color: #ef4444;
}
@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.info-card-ei {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-md);
  padding: 20px;
}

.btn-retry-ei {
  background-color: var(--ei-primary);
  color: #05101f;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-retry-ei:hover {
  background-color: var(--ei-primary-hover);
  color: white;
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
</style>
