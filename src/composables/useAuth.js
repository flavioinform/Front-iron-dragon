import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const username = ref("")
const isAdmin = ref(false)
const accessToken = ref(localStorage.getItem("access") || null)
const refreshToken = ref(localStorage.getItem("refresh") || null)

export function useAuth() {
  const router = useRouter()

  // 👤 Guardar datos de usuario
  const setUser = (data) => {
    username.value = data.username || ""
    isAdmin.value = data.is_superuser ||
      (Array.isArray(data.groups) && data.groups.some(g => g.name === "administrador"))
  }

  // 🔑 Login
  const login = async (user, pass) => {
    try {
      const res = await axios.post(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/token/`, {
        email: user,
        password: pass,
      })

      accessToken.value = res.data.access
      refreshToken.value = res.data.refresh
      localStorage.setItem("access", accessToken.value)
      localStorage.setItem("refresh", refreshToken.value)

      // Ahora pedimos el perfil
      await fetchProfile()

      router.push("/") // redirigir al inicio
    } catch (err) {
      console.error("❌ Error en login:", err)
      throw err
    }
  }

  // 👤 Perfil
  const fetchProfile = async () => {
    if (!accessToken.value) return

    try {
      const res = await axios.get(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/me/`, {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      })
      setUser(res.data)
    } catch (err) {
      console.error("❌ Error cargando perfil:", err)
      logout()
    }
  }

  // 🚪 Logout
  const logout = () => {
    accessToken.value = null
    refreshToken.value = null
    username.value = ""
    isAdmin.value = false
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    router.push("/login")
  }

  // 🔄 Refresh token
  const refresh = async () => {
    if (!refreshToken.value) return
    try {
      const res = await axios.post(`${process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/v1'}/auth/refresh/`, {
        refresh: refreshToken.value,
      })
      accessToken.value = res.data.access
      localStorage.setItem("access", accessToken.value)
    } catch (err) {
      console.error("❌ Error refrescando token:", err)
      logout()
    }
  }

  return {
    username,
    isAdmin,
    accessToken,
    login,
    logout,
    fetchProfile,
    refresh,
  }
}
