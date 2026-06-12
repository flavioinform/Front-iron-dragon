<template>
  <div class="referidos-page">
    <div class="container py-5">
      <!-- ── Tarjeta de Bienvenida ── -->
      <div class="welcome-card mb-4 shadow-sm">
        <div class="d-flex align-items-center">
          <div class="welcome-icon">
            <i class="bi bi-gift"></i>
          </div>
          <div>
            <h2 class="welcome-title mb-1">Tu Programa de Referidos</h2>
            <p class="text-muted mb-0">Comparte Agua Moche con tus amigos y gana descuentos acumulables. ¡Obtén 10% de descuento por cada 20 referidos!</p>
          </div>
        </div>
      </div>

      <!-- ── Panel de Administrador ── -->
      <div v-if="isAdmin" class="admin-panel mb-4">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <div>
            <h6 class="admin-title mb-1"><i class="bi bi-shield-check me-2"></i>Panel Administrador — Referidos</h6>
            <p class="text-muted small mb-0">
              <span v-if="pendingCount > 0" class="text-warning fw-bold">
                {{ pendingCount }} referido(s) pendiente(s) de recompensa
              </span>
              <span v-else class="text-success fw-bold">Todos los referidos están recompensados ✓</span>
            </p>
          </div>
          <button
            v-if="pendingCount > 0"
            class="btn-reward-all"
            @click="rewardAllPending"
            :disabled="rewardingAll"
          >
            <span v-if="rewardingAll" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-check-all me-2"></i>
            {{ rewardingAll ? 'Procesando...' : `Aprobar ${pendingCount} referido(s)` }}
          </button>
        </div>
        
        <div v-if="rewardMessage" class="alert-success-inline mb-3">
          <i class="bi bi-check-circle me-2"></i>{{ rewardMessage }}
        </div>
        <div v-if="rewardError" class="alert-danger-inline mb-3">
          <i class="bi bi-x-circle me-2"></i>{{ rewardError }}
        </div>

        <div v-if="adminStats.length > 0" class="mt-4 border-top pt-3">
          <h6 class="fw-bold mb-3"><i class="bi bi-people-fill text-primary me-2"></i>Usuarios que han compartido su enlace</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover align-middle bg-white rounded overflow-hidden shadow-sm">
              <thead class="table-light">
                <tr>
                  <th>Usuario</th>
                  <th>Código</th>
                  <th class="text-center">Total Referidos</th>
                  <th>Ganancia Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stat in adminStats" :key="stat.code">
                  <td class="fw-medium">{{ stat.user_email }}</td>
                  <td><span class="badge bg-secondary font-monospace">{{ stat.code }}</span></td>
                  <td class="text-center"><span class="badge bg-primary rounded-pill">{{ stat.total_referrals }}</span></td>
                  <td class="text-success fw-bold">S/ {{ stat.total_earned }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <!-- ── Progreso de Referidos ── -->
        <div class="col-lg-12">
          <div class="card shadow-sm h-100 p-4 border-0" style="background: linear-gradient(135deg, rgba(0, 153, 255, 0.05), rgba(106, 176, 255, 0.1));">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-dark m-0"><i class="bi bi-star-fill text-warning me-2"></i>Progreso para tu próximo descuento</h5>
              <span class="badge bg-primary fs-6">{{ referralData.current_referrals }} / 20 Referidos</span>
            </div>
            
            <div class="progress" style="height: 25px; border-radius: 15px; background-color: #e9ecef; border: 1px solid rgba(0,0,0,0.1);">
              <div class="progress-bar bg-success progress-bar-striped progress-bar-animated text-dark fw-bold" role="progressbar" 
                   :style="{ width: `${(referralData.current_referrals % 20) * 5}%` }" 
                   :aria-valuenow="(referralData.current_referrals % 20) * 5" 
                   aria-valuemin="0" 
                   aria-valuemax="100">
                {{ (referralData.current_referrals % 20) * 5 }}%
              </div>
            </div>
            <p class="text-muted small mt-2 m-0 text-center">
              Te faltan <strong>{{ 20 - (referralData.current_referrals % 20) }}</strong> referidos para tu próximo 10% de descuento. 
              <span v-if="Math.floor(referralData.current_referrals / 20) > 0" class="text-success fw-bold ms-1">
                (Ya tienes acumulado un {{ Math.floor(referralData.current_referrals / 20) * 10 }}% de descuento)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <!-- ── Link de Referido ── -->
        <div class="col-lg-12">
          <div class="card ref-link-card shadow-sm h-100">
            <div class="card-body p-4">
              <h5 class="card-title fw-bold text-dark mb-3"><i class="bi bi-link-45deg text-primary me-2"></i>Tu Enlace Único</h5>
              <div class="input-group">
                <input type="text" class="form-control bg-light" :value="referralLink" readonly />
                <button class="btn btn-primary btn-copy" @click="copyLink">
                  <i v-if="!copied" class="bi bi-clipboard"></i>
                  <i v-else class="bi bi-check2"></i>
                  {{ copied ? '¡Copiado!' : 'Copiar enlace' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Métricas KPI (Billetera) ── -->
        <div class="col-md-4">
          <div class="kpi-card shadow-sm">
            <div class="kpi-icon"><i class="bi bi-wallet2"></i></div>
            <div class="kpi-info">
              <span class="kpi-label">Saldo Disponible</span>
              <span class="kpi-value">S/ {{ wallet.balance || '0.00' }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="kpi-card shadow-sm">
            <div class="kpi-icon"><i class="bi bi-graph-up-arrow"></i></div>
            <div class="kpi-info">
              <span class="kpi-label">Total Ganado</span>
              <span class="kpi-value">S/ {{ wallet.total_earned || '0.00' }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="kpi-card shadow-sm">
            <div class="kpi-icon"><i class="bi bi-cart-check"></i></div>
            <div class="kpi-info">
              <span class="kpi-label">Total Gastado</span>
              <span class="kpi-value">S/ {{ wallet.total_spent || '0.00' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Tablas de Historial ── -->
      <div class="row g-4">
        <!-- Mis Referidos -->
        <div class="col-lg-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
              <h5 class="fw-bold text-dark"><i class="bi bi-people text-primary me-2"></i>Mis Referidos</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>Usuario</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ref in history" :key="ref.id">
                      <td>{{ ref.referred_email }}</td>
                      <td>{{ formatDate(ref.referred_at) }}</td>
                      <td>
                        <span class="badge"
                          :class="{
                            'badge-rewarded': ref.status === 'rewarded',
                            'badge-pending': ref.status === 'pending',
                            'badge-cancelled': ref.status === 'cancelled' || ref.status === 'expired',
                          }">
                          <i class="bi" :class="ref.status === 'rewarded' ? 'bi-check-circle' : (ref.status === 'pending' ? 'bi-hourglass-split' : 'bi-x-circle')"></i>
                          {{ ref.status_display }}
                        </span>
                      </td>
                      <td class="fw-semibold" :class="ref.status === 'rewarded' ? 'text-success' : 'text-muted'">
                        {{ ref.status === 'rewarded' ? `+S/ ${ref.reward_amount_granted}` : `S/ ${ref.reward_value}` }}
                      </td>
                    </tr>
                    <tr v-if="history.length === 0">
                      <td colspan="4" class="text-center text-muted py-4">Aún no tienes referidos. ¡Comparte tu enlace!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Historial de Transacciones -->
        <div class="col-lg-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
              <h5 class="fw-bold text-dark"><i class="bi bi-clock-history text-primary me-2"></i>Movimientos de Billetera</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle text-nowrap">
                  <thead class="table-light">
                    <tr>
                      <th>Tipo</th>
                      <th>Monto</th>
                      <th>Saldo Posterior</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tx in transactions" :key="tx.id">
                      <td>
                        <span v-if="tx.tx_type === 'credit'" class="text-success fw-bold"><i class="bi bi-arrow-down-circle me-1"></i>Crédito</span>
                        <span v-else-if="tx.tx_type === 'debit'" class="text-danger fw-bold"><i class="bi bi-arrow-up-circle me-1"></i>Débito</span>
                        <span v-else class="text-muted fw-bold"><i class="bi bi-dash-circle me-1"></i>Otro</span>
                      </td>
                      <td :class="tx.tx_type === 'credit' ? 'text-success fw-bold' : (tx.tx_type === 'debit' ? 'text-danger fw-bold' : '')">
                        {{ tx.tx_type === 'credit' ? '+' : (tx.tx_type === 'debit' ? '-' : '') }}S/ {{ tx.amount }}
                      </td>
                      <td class="fw-bold text-dark">S/ {{ tx.balance_after }}</td>
                      <td class="text-muted small">{{ formatDate(tx.created_at) }}</td>
                    </tr>
                    <tr v-if="transactions.length === 0">
                      <td colspan="4" class="text-center text-muted py-4">No hay movimientos en tu billetera.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/composables/api.js'
import { isAdmin } from '@/composables/useUser.js'

const referralLink = ref('')
const referralCode = ref('')
const referralData = ref({ total_referrals: 0, current_referrals: 0 })
const wallet = ref({ balance: '0.00', total_earned: '0.00', total_spent: '0.00', transactions: [] })
const history = ref([])
const transactions = ref([])
const copied = ref(false)
const rewardingAll = ref(false)
const rewardMessage = ref('')
const rewardError = ref('')
const adminStats = ref([])

const pendingCount = computed(() => history.value.filter(r => r.status === 'pending').length)

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  try {
    const promises = [
      api.get('/referrals/code/'),
      api.get('/referrals/wallet/'),
      api.get('/referrals/history/'),
      api.get('/referrals/transactions/'),
    ]

    if (isAdmin.value) {
      promises.push(api.get('/referrals/admin/stats/'))
    }

    const results = await Promise.all(promises)

    referralCode.value = results[0].data.code
    referralData.value = results[0].data
    referralLink.value = `${window.location.origin}/register?ref=${results[0].data.code}`
    wallet.value = results[1].data
    history.value = results[2].data.results || results[2].data
    transactions.value = results[3].data.results || results[3].data

    if (isAdmin.value && results[4]) {
      adminStats.value = results[4].data.results || results[4].data
    }

  } catch (err) {
    console.error('Error cargando datos de referidos:', err)
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Error al copiar:', err)
  }
}

const rewardAllPending = async () => {
  rewardingAll.value = true
  rewardMessage.value = ''
  rewardError.value = ''
  try {
    const res = await api.post('/referrals/reward-all/')
    rewardMessage.value = res.data.message
    // Recargar datos para mostrar el balance actualizado
    await loadData()
  } catch (err) {
    rewardError.value = err.response?.data?.error || 'Error al procesar las recompensas'
    console.error('Error recompensando referidos:', err)
  } finally {
    rewardingAll.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.referidos-page {
  background-color: var(--am-bg-alt, #f8f9fa);
  min-height: 80vh;
  font-family: var(--font-body, 'Inter', sans-serif);
}

.welcome-card {
  background: #ffffff;
  border-radius: 12px;
  border-left: 5px solid var(--am-primary, #0099FF);
  padding: 24px 30px;
}

.welcome-icon {
  font-size: 2.5rem;
  color: var(--am-primary, #0099FF);
  margin-right: 20px;
  background: rgba(0, 153, 255, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-title {
  font-weight: 800;
  color: var(--am-text-main, #1A1A2E);
}

.ref-link-card {
  border: 1px solid var(--am-border, #E5E7EB);
  border-radius: 12px;
}

.input-group {
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  border-radius: 8px;
  overflow: hidden;
}

.input-group .form-control {
  border: 1px solid var(--am-border, #E5E7EB);
  font-family: monospace;
  font-size: 0.95rem;
  color: var(--am-text-muted);
}

.btn-copy {
  background-color: var(--am-primary, #0099FF);
  border: none;
  font-weight: 600;
  padding: 0 25px;
  transition: all 0.2s;
  min-width: 150px;
}

.btn-copy:hover {
  background-color: var(--am-secondary, #0062cc);
}

.kpi-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--am-border, #E5E7EB);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;
}

.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important;
}

.kpi-icon {
  font-size: 2rem;
  color: var(--am-primary, #0099FF);
  background: rgba(0, 153, 255, 0.1);
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-info {
  display: flex;
  flex-direction: column;
}

.kpi-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--am-text-muted, #6c757d);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--am-text-main, #1A1A2E);
  line-height: 1;
}

.card {
  border: 1px solid var(--am-border, #E5E7EB);
  border-radius: 12px;
}

.table th {
  font-weight: 600;
  color: var(--am-text-muted, #6c757d);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--am-border, #E5E7EB);
}

.table td {
  color: var(--am-text-main, #1A1A2E);
  vertical-align: middle;
  border-color: var(--am-border, #E5E7EB);
}

/* ── Admin Panel ── */
.admin-panel {
  background: linear-gradient(135deg, #fff8e1, #fffde7);
  border: 1px solid #ffc107;
  border-left: 5px solid #ffc107;
  border-radius: 12px;
  padding: 20px 24px;
}

.admin-title {
  font-size: 1rem;
  font-weight: 700;
  color: #856404;
}

.btn-reward-all {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-reward-all:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);
}

.btn-reward-all:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert-success-inline {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 600;
}

.alert-danger-inline {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* ── Badge Variants ── */
.badge-rewarded {
  background-color: #d4edda;
  color: #155724;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-pending {
  background-color: #fff3cd;
  color: #856404;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-cancelled {
  background-color: #f8d7da;
  color: #721c24;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
