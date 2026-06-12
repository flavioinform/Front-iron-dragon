/**
 * api.js - Instancia central de Axios con renovación automática de JWT.
 * Importar este módulo en lugar de axios directamente para todas
 * las peticiones que requieran autenticación.
 */
import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_URL || process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE,
})

// ── Request Interceptor ──────────────────────────────────────────────────────
// Adjuntar el access token a cada petición automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response Interceptor ─────────────────────────────────────────────────────
// Si el servidor responde 401, intentar renovar el access token y reintentar
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si el error es 401 y aún no hemos reintentado esta petición
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Encolar la petición y esperar al nuevo token
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh')

      if (!refreshToken) {
        // Sin refresh token → cerrar sesión
        isRefreshing = false
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(`${API_BASE}/auth/token/refresh/`, {
          refresh: refreshToken,
        })

        const newAccessToken = res.data.access
        localStorage.setItem('access', newAccessToken)
        // Si el backend rota el refresh token, guardarlo también
        if (res.data.refresh) {
          localStorage.setItem('refresh', res.data.refresh)
        }

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
