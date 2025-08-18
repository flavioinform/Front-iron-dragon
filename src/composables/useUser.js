import { ref } from 'vue'

export const username = ref(localStorage.getItem('username') || '')
export const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

console.log('🚀 useUser initialized')
console.log('Initial username:', username.value)
console.log('Initial isAdmin:', isAdmin.value, typeof isAdmin.value)

export function setUsername(name) {
  console.log('📝 setUsername called with:', name)
  username.value = name

  if (name) {
    localStorage.setItem('username', name)
  } else {
    // 🔴 limpiar siempre al hacer logout
    localStorage.removeItem('username')
  }
}

export function setAdmin(value) {
  console.log('🔧 setAdmin called with:', value, typeof value)
  isAdmin.value = value

  if (value) {
    // ✅ solo guardamos si es true
    localStorage.setItem('isAdmin', 'true')
  } else {
    // 🔴 si es false, mejor eliminar del localStorage
    localStorage.removeItem('isAdmin')
  }

  console.log('✅ After setAdmin:')
  console.log('  - isAdmin.value:', isAdmin.value, typeof isAdmin.value)
  console.log('  - localStorage isAdmin:', localStorage.getItem('isAdmin'))
}
