<template>
  <div class="login-page-clean">
    <div class="container py-5">
      
      <!-- Brand Logo Premium -->
      <div class="text-center mb-4">
        <router-link to="/home" class="login-brand-wrapper">
          <img src="@/assets/moche3d1.png" alt="Agua Moche Logo" class="login-logo-img" />
        </router-link>
      </div>

      <div class="login-box-clean">
        <div class="row g-0">
          
          <!-- ── Columna Izquierda: ACCEDER ── -->
          <div class="col-md-6 login-col-left">
            <h3 class="login-heading">ACCEDER</h3>
            
            <form @submit.prevent="handleLogin" class="login-form">
              
              <!-- Alerta de Error -->
              <div v-if="error" class="alert alert-danger py-2 px-3 text-center mb-3">
                <i class="bi bi-exclamation-circle me-1"></i> Credenciales incorrectas.
              </div>

              <!-- Usuario / Correo -->
              <div class="form-group">
                <label for="username">Nombre de usuario o correo electrónico <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  id="username" 
                  v-model="username" 
                  class="form-control-clean" 
                  required
                />
              </div>

              <!-- Contraseña -->
              <div class="form-group">
                <label for="password">Contraseña <span class="text-danger">*</span></label>
                <div class="password-wrapper">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="password" 
                    class="form-control-clean" 
                    required
                  />
                  <i 
                    class="bi pass-icon" 
                    :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                    @click="showPassword = !showPassword"
                  ></i>
                </div>
              </div>

              <!-- Botón Ingresar -->
              <button type="submit" class="btn-primary-am btn-block w-100 py-3 mt-2" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                INGRESAR
              </button>

              <!-- Recordar y Recuperar -->
              <div class="login-footer-actions">
                <label class="checkbox-label">
                  <input type="checkbox" /> Recordar
                </label>
                <a href="#" class="recover-link">Recuperar contraseña</a>
              </div>

            </form>
          </div>

          <!-- ── Columna Derecha: REGISTRARSE ── -->
          <div class="col-md-6 login-col-right">
            <h3 class="login-heading">REGISTRARSE</h3>
            <p class="register-text">
              Al registrarse en este sitio podrás acceder al estado y al historial de tus pedidos. 
              Solo tiene que completar los campos que aparecen a continuación para crear una cuenta de cliente. 
              Solo solicitaremos la información necesaria para que el proceso de compra sea más rápido y sencillo.
            </p>
            <div class="text-center mt-4">
              <router-link to="/register" class="btn-gray-clean">
                REGISTRARSE
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { setAdmin, setUsername } from '@/composables/useUser.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  error.value = false
  loading.value = true

  try {
    const response = await axios.post(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/token/`, {
      email: username.value,
      password: password.value
    })

    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)

    setUsername(username.value)
    checkAdmin(response.data.access)
  } catch (err) {
    console.error('Error al iniciar sesión:', err)
    error.value = true
    loading.value = false
  }
}

const checkAdmin = async (token) => {
  try {
    const res = await axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/me/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setAdmin(res.data.is_staff)
    router.push('/home')
  } catch (err) {
    console.error('Error verificando admin:', err)
    router.push('/home')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page-clean {
  background-color: var(--am-bg-main);
  min-height: 100vh;
  display: flex;
  align-items: center;
  font-family: var(--font-body);
  padding: 40px 0;
}

.login-brand-wrapper {
  display: inline-block;
  text-decoration: none;
}

.login-logo-img {
  height: 90px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(112, 195, 212, 0.2));
}

.login-logo-img:hover {
  transform: translateY(-2px) scale(1.03);
  filter: drop-shadow(0 6px 20px rgba(112, 195, 212, 0.4));
}

.login-box-clean {
  background: rgba(15, 45, 90, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  max-width: 920px;
  margin: 0 auto;
  border: 1px solid var(--ei-border-active);
  border-radius: var(--radius-lg);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
}

.login-box-clean:hover {
  border-color: rgba(112, 195, 212, 0.6);
  box-shadow: 0 20px 45px rgba(112, 195, 212, 0.1);
}

/* Columns */
.login-col-left {
  padding: 50px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.login-col-right {
  padding: 50px;
  background-color: rgba(6, 13, 31, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Headings */
.login-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--ei-text-main);
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 0.05em;
  position: relative;
}

.login-heading::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--ei-primary);
  margin: 10px auto 0;
  border-radius: 2px;
}

/* Form Styles */
.form-group {
  margin-bottom: 22px;
}

.form-group label {
  font-size: 0.85rem;
  color: var(--am-text-muted);
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
}

.form-control-clean {
  width: 100%;
  padding: 13px 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 14px !important;
  font-size: 0.95rem;
  color: #ffffff !important;
  background-color: rgba(6, 13, 31, 0.6) !important;
  outline: none;
  transition: all 0.3s ease;
}

.form-control-clean:focus {
  border-color: var(--ei-primary-hover) !important;
  background-color: rgba(6, 13, 31, 0.85) !important;
  box-shadow: 0 0 0 3px rgba(112, 195, 212, 0.25) !important;
}

.password-wrapper {
  position: relative;
}

.pass-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--am-text-muted);
  cursor: pointer;
  font-size: 1.25rem;
  transition: color 0.2s ease;
}
.pass-icon:hover { 
  color: var(--ei-primary); 
}

/* Login Actions */
.login-footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  font-size: 0.85rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--am-text-muted);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.checkbox-label:hover {
  color: var(--am-text-main);
}

.checkbox-label input[type="checkbox"] {
  accent-color: var(--ei-primary);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.recover-link {
  color: var(--ei-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.recover-link:hover { 
  color: var(--ei-primary-hover);
  text-decoration: underline; 
}

/* Register Col */
.register-text {
  font-size: 0.9rem;
  color: var(--am-text-muted);
  line-height: 1.8;
  text-align: center;
  margin-bottom: 25px;
}

.btn-gray-clean {
  display: inline-block;
  background: rgba(112, 195, 212, 0.05);
  border: 1.5px solid var(--ei-primary);
  color: var(--ei-primary);
  padding: 12px 35px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.03em;
  box-shadow: 0 4px 15px rgba(112, 195, 212, 0.05);
}

.btn-gray-clean:hover {
  background: var(--ei-primary);
  color: var(--ei-dark-contrast);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(112, 195, 212, 0.3);
}

.login-form .btn-primary-am {
  border-radius: 14px !important;
  font-weight: 700;
  letter-spacing: 0.03em;
}

@media (max-width: 768px) {
  .login-col-left {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 40px 24px;
  }
  .login-col-right {
    padding: 40px 24px;
  }
}
</style>
