<template>
  <section class="vh-100" style="background-color: black;  margin-bottom: 228px;">
    <div class="container py-5  h-100">
      <div class="row d-flex justify-content-center align-items-center  h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem; border-color: black;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="../assets/images/logindragon.png"
                  alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="handleLogin">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0">IronDragon</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                      Inicia sesión en tu cuenta
                    </h5>

                    <!-- Mostrar errores -->
                    <div v-if="errorMessage" class="alert alert-danger" role="alert">
                      {{ errorMessage }}
                    </div>

                    <!-- Mostrar loading -->
                    <div v-if="isLoading" class="alert alert-info" role="alert">
                      Iniciando sesión...
                    </div>

                    <div class="form-outline mb-4">
                      <input 
                        v-model="username" 
                        type="text" 
                        class="form-control form-control-lg"
                        :disabled="isLoading"
                        required 
                      />
                      <label class="form-label">Usuario</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input 
                        v-model="password" 
                        type="password" 
                        class="form-control form-control-lg"
                        :disabled="isLoading"
                        required 
                      />
                      <label class="form-label">Contraseña</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button 
                        class="btn btn-dark btn-lg btn-block" 
                        type="submit"
                        :disabled="isLoading"
                      >
                        <span v-if="isLoading">Iniciando sesión...</span>
                        <span v-else>Iniciar sesión</span>
                      </button>
                    </div>

                    <div class="text-center">
                      <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { setUsername, setAdmin } from '@/composables/useUser.js'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor, completa todos los campos'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    console.log('🔐 Attempting login with username:', username.value)
    
    // ✅ Usar el endpoint correcto de JWT
    const res = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username.value,
      password: password.value
    })

    console.log('✅ Login successful, response:', res.data)

    // ✅ Guardar tokens JWT
    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)

    console.log('💾 Tokens saved to localStorage')

    // ✅ Obtener información del usuario con el token
    try {
      const profileRes = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Bearer ${res.data.access}` }
      })

      console.log('👤 Profile data received:', profileRes.data)

      // ✅ Guardar información del usuario
      setUsername(profileRes.data.username)

      // ✅ Detectar si es administrador
      const isSuperUser = profileRes.data.is_superuser === true
      const isAdminGroup = Array.isArray(profileRes.data.groups) && 
                          profileRes.data.groups.includes("administrador")
      
      const isAdminUser = isSuperUser || isAdminGroup
      
      console.log('🔍 Admin detection:')
      console.log('  - is_superuser:', isSuperUser)
      console.log('  - isAdminGroup:', isAdminGroup)
      console.log('  - Final isAdmin:', isAdminUser)

      setAdmin(isAdminUser)

      // ✅ Redirigir al usuario
      console.log('🚀 Redirecting to home page')
      router.push('/')
      
    } catch (profileError) {
      console.error('❌ Error getting user profile:', profileError)
      // Aún así permitir el login, pero sin información de admin
      setUsername(username.value)
      setAdmin(false)
      router.push('/')
    }

  } catch (err) {
    console.error('❌ Login error:', err)
    
    if (err.response) {
      console.error('Response status:', err.response.status)
      console.error('Response data:', err.response.data)
      
      if (err.response.status === 401) {
        errorMessage.value = 'Usuario o contraseña incorrectos'
      } else {
        errorMessage.value = 'Error en el servidor. Inténtalo más tarde.'
      }
    } else if (err.request) {
      errorMessage.value = 'No se pudo conectar al servidor'
    } else {
      errorMessage.value = 'Error inesperado. Inténtalo más tarde.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>

.container {
  margin-bottom: 30px;
  width: 100%;
  background-color: black;
}

.btn-block {
  width: 100%;
}

.form-outline {
  position: relative;
}

.form-label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.375rem 0.75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  color: #6c757d;
}

.form-control:focus ~ .form-label,
.form-control:not(:placeholder-shown) ~ .form-label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
</style>