<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-sticky" style="background-color: #050505; padding: 8px 16px;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">IronDragon</a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Quienes Somos</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categorías
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id">
                <router-link class="dropdown-item" :to="{ name: 'productos', query: { category: category.id } }">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos">Productos</router-link>
          </li>

          <!-- Opciones solo para administrador -->
          <li v-if="isAdmin" class="nav-item">
            <router-link class="nav-link text-warning" to="/productos/crear">Crear Producto</router-link>
          </li>
          <li v-if="isAdmin" class="nav-item">
            <router-link class="nav-link text-warning" to="/categorias/crear">Crear Categoría</router-link>
          </li>
        </ul>

        <!-- Buscador -->
        <!-- <form class="d-flex me-3" role="search" @submit.prevent="searchProducts">
          <input 
            class="form-control me-2" 
            type="search" 
            placeholder="Buscar productos..." 
            aria-label="Search" 
            v-model="searchText"
          />
          <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form> -->

        <!-- Botones de sesión -->
        <div>
          <button v-if="username" class="btn btn-outline-danger btn-sm" @click="logout">Salir</button>
          <router-link v-else class="btn btn-outline-light btn-sm" to="/login">Iniciar Sesión</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { username, isAdmin, setUsername, setAdmin } from '@/composables/useUser.js'

const searchText = ref('')
const categories = ref([])
const router = useRouter()


const searchProducts = () => {
  router.push({ name: 'productos', query: { search: searchText.value } })
}

const logout = () => {
  // 🔴 Limpiamos tokens
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')

  setAdmin(false)
  setUsername('')

  router.push('/login')
}

const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh')
  if (!refresh) return null

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
      refresh
    })
    const newAccessToken = response.data.access
    localStorage.setItem('access', newAccessToken)
    return newAccessToken
  } catch {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setAdmin(false)
    setUsername('')
    return null
  }
}

const fetchUserProfile = async (token) => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/profile/', {
      headers: { Authorization: `Bearer ${token}` }
    })

    setUsername(res.data.username)

    const isSuperUser = res.data.is_superuser === true
    const isAdminGroupString = Array.isArray(res.data.groups) && res.data.groups.includes("administrador")
    const isAdminGroupObj = Array.isArray(res.data.groups) && res.data.groups.some(g => g && g.name === "administrador")

    setAdmin(isSuperUser || isAdminGroupString || isAdminGroupObj)
    return true
  } catch (error) {
    throw error
  }
}

onMounted(async () => {
  // Cargar categorías
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories/')
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  // Verificar autenticación
  let token = localStorage.getItem('access')
  if (token) {
    try {
      await fetchUserProfile(token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken()
        if (newToken) {
          await fetchUserProfile(newToken)
        } else {
          setAdmin(false)
          setUsername('')
        }
      } else {
        setAdmin(false)
        setUsername('')
      }
    }
  }
})
</script>

<style>
.navbar-sticky {
  position: sticky;
  top: auto;
  z-index: 2020;
  width: 100%;
 
}


</style>
