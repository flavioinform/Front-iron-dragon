<template>
  <section class="register-ei-section d-flex align-items-center justify-content-center">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6">
          <div class="register-glass-card shadow-2xl p-4 p-md-5">
            <!-- Logotipo de la Marca y Cabecera -->
            <div class="text-center mb-5">
              <img src="../assets/moche3d1.png" alt="Agua Moche" class="register-logo mb-3" />
              <h4 class="fw-bold ei-title mb-1">Crea tu Cuenta</h4>
              <p class="text-muted-ei small">Regístrate en pocos segundos y comienza a pedir tu provisión de agua y hielo</p>
            </div>

            <!-- Banner de Referido -->
            <div v-if="activeReferralCode" class="alert-info-ei d-flex align-items-center mb-4">
              <i class="bi bi-gift-fill me-3 ei-text-primary fs-3"></i>
              <div>
                <strong class="text-white">¡Estás registrándote con un enlace de referido!</strong>
                <p class="mb-0 small text-muted-ei">Recibirás beneficios en tu primera compra.</p>
              </div>
              <button type="button" class="btn-close btn-close-white ms-auto" aria-label="Close" @click="activeReferralCode = null"></button>
            </div>

            <!-- Error de validación -->
            <div v-if="errorMessage" class="alert-danger-ei d-flex align-items-center mb-4">
              <i class="bi bi-exclamation-triangle-fill me-3 fs-3 text-danger"></i>
              <div>
                <strong class="text-white">Ocurrió un error:</strong>
                <p class="mb-0 small text-muted-ei">{{ errorMessage }}</p>
              </div>
            </div>

            <!-- Formulario de Registro -->
            <form @submit.prevent="handleRegister">
              <!-- Nombre de Usuario -->
              <div class="form-floating mb-4">
                <input 
                  v-model="username" 
                  type="text" 
                  id="userInput"
                  placeholder="Usuario"
                  class="form-control input-ei" 
                  required 
                />
                <label for="userInput" class="label-ei">Nombre de Usuario</label>
              </div>

              <!-- Correo Electrónico -->
              <div class="form-floating mb-4">
                <input 
                  v-model="email" 
                  type="email" 
                  id="emailInput"
                  placeholder="Correo Electrónico"
                  class="form-control input-ei" 
                  required 
                />
                <label for="emailInput" class="label-ei">Correo Electrónico</label>
              </div>

              <!-- Contraseña -->
              <div class="form-floating mb-4">
                <input 
                  v-model="password" 
                  type="password" 
                  id="passwordInput"
                  placeholder="Contraseña"
                  class="form-control input-ei" 
                  required 
                />
                <label for="passwordInput" class="label-ei">Contraseña</label>
              </div>

              <!-- Botón de Envío -->
              <button class="btn-action-ei w-100 py-3 mt-2" type="submit">
                <i class="bi bi-person-plus-fill me-2"></i>Completar Registro <i class="bi bi-arrow-right-short ms-1"></i>
              </button>

              <!-- Retorno a Login -->
              <div class="text-center mt-4">
                <p class="mb-0 text-muted-ei small">
                  ¿Ya tienes una cuenta registrada? 
                  <router-link to="/login" class="ei-text-primary fw-bold text-decoration-none">
                    Inicia sesión aquí
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const activeReferralCode = ref(null)
const errorMessage = ref('')
const router = useRouter()

onMounted(() => {
  const code = localStorage.getItem('referral_code')
  const timestamp = localStorage.getItem('referral_timestamp')

  if (code && timestamp) {
    const age = Date.now() - parseInt(timestamp, 10)
    const thirtyDays = 30 * 24 * 60 * 60 * 1000
    if (age <= thirtyDays) {
      activeReferralCode.value = code
    } else {
      // Expirado
      localStorage.removeItem('referral_code')
      localStorage.removeItem('referral_timestamp')
    }
  }
})

async function handleRegister() {
  try {
    errorMessage.value = ''
    const payload = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    if (activeReferralCode.value) {
      payload.referral_code = activeReferralCode.value
    }

    await axios.post(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/register/`, payload)
    
    // Limpiar localStorage de referidos si fue exitoso
    localStorage.removeItem('referral_code')
    localStorage.removeItem('referral_timestamp')

    alert('¡Usuario registrado con éxito!')
    router.push('/login')
  } catch (err) {
    console.error('Error capturado:', err.response?.data || err)
    
    if (err.response && err.response.data) {
      const data = err.response.data
      
      // Extraer el mensaje específico según cómo Django envíe el error
      const firstKey = Object.keys(data)[0]
      if (firstKey && Array.isArray(data[firstKey])) {
        errorMessage.value = data[firstKey][0]
      } else if (data.detail) {
        errorMessage.value = data.detail
      } else if (typeof data === 'string') {
        errorMessage.value = data
      } else {
        errorMessage.value = 'Error al registrar usuario. Inténtalo de nuevo.'
      }
    } else {
      errorMessage.value = 'No se pudo conectar con el servidor. Verifica tu conexión.'
    }
  }
}
</script>

<style scoped>
.register-ei-section {
  min-height: 80vh;
  background: transparent;
  padding: 40px 0;
  font-family: var(--font-body);
}

.ei-title { color: var(--ei-text-main); }
.text-white { color: var(--ei-text-main) !important; }
.text-muted-ei { color: var(--ei-text-muted) !important; }
.ei-text-primary { color: var(--ei-secondary) !important; }

/* Glass Card */
.register-glass-card {
  background: rgba(10, 31, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--ei-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.register-logo {
  height: 80px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
}

/* Alerts */
.alert-info-ei {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: var(--radius-md);
  padding: 16px;
}

.alert-danger-ei {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  padding: 16px;
}

/* Inputs Estilizados */
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

/* Fix for floating label in dark theme */
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  color: var(--ei-primary) !important;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}

.form-floating > .form-control:focus ~ label::after,
.form-floating > .form-control:not(:placeholder-shown) ~ label::after {
  background-color: transparent !important;
}

.form-floating > .form-control:-webkit-autofill ~ label {
  color: var(--ei-primary) !important;
}

.label-ei {
  color: var(--ei-text-muted);
  transition: all 0.2s;
}

/* Botón de Acción Principal */
.btn-action-ei {
  background-color: var(--ei-primary);
  color: #05101f;
  border: none;
  font-weight: 700;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  box-shadow: 0 4px 14px rgba(106, 176, 255, 0.25);
  transition: all 0.3s;
}

.btn-action-ei:hover {
  background-color: var(--ei-primary-hover);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(112, 195, 212, 0.35);
}
</style>
