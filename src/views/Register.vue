<template>
  <section class="vh-100" style="background-color: black; margin-bottom: 0px;">
    <!-- Contenedor del Banner -->
    <div class="banner"></div>

    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-md-9 col-lg-6 col-xl-5">
          <div class="card" style="border-radius: 1rem; border-color: black;">
            <div class="card-body p-4 p-lg-5 text-black">
              <h3 class="mb-5 text-center text-black">Registrate</h3>

              <form @submit.prevent="handleRegister">
                <div class="form-outline mb-4">
                  <input v-model="username" type="text" class="form-control form-control-lg" required />
                  <label class="form-label">Usuario</label>
                </div>

                <div class="form-outline mb-4">
                  <input v-model="email" type="email" class="form-control form-control-lg" required />
                  <label class="form-label">Correo Electronico</label>
                </div>

                <div class="form-outline mb-4">
                  <input v-model="password" type="password" class="form-control form-control-lg" required />
                  <label class="form-label">Contraseña</label>
                </div>

                <button class="btn btn-dark btn-lg w-100" type="submit">
                  Registrarse
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

async function handleRegister() {
  try {
    await axios.post('http://127.0.0.1:8000/api/register/', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    alert('Usuario registrado ✅')
    router.push('/login')
  } catch (err) {
    alert('Error en el registro ❌')
    console.error(err.response?.data || err)
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 30px;
  width: 100%;
   background-image: url('@/assets/images/registerdra.png');
     background-repeat: no-repeat;
     background-size: contain;
     background-position: center;

}

.banner {
  position: absolute; /* Asegura que el banner se coloque detrás de la tarjeta */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
 /* Imagen de fondo */
  background-size: cover;
  background-position: center;
  z-index: -1; /* Coloca el banner detrás de la tarjeta */
}

.card {
  border-radius: 1rem;
  border-color: black;
}

.card-body {
  padding: 2rem 2rem;
  color: black;
}

h3 {
  color: white;
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

.btn-dark {
  background-color: #343a40;
  border: none;
  color: white;
}

.btn-dark:hover {
  background-color: #495057;
}
</style>
