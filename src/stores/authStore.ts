import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/authService'
import type { UserPayload, RoleDetail } from '@/models/authModel'

export interface ValidationErrorItem {
  field: string
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // Input State Form Login
  const username = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const isPasswordVisible = ref(false)

  // Auth & Error State Handling
  const user = ref<UserPayload | null>(null)
  const isAuthenticated = ref(false)
  const activeRole = ref<string | null>(null)
  const availableRoles = ref<RoleDetail[]>([])
  const loading = ref(false)
  const errorMessage = ref('')
  const validationErrors = ref<ValidationErrorItem[]>([])

  // Status penentu apakah pengguna sudah memilih/mengonfirmasi peran di sesi ini
  const isRoleConfirmed = ref(sessionStorage.getItem('isRoleConfirmed') === 'true')

  function setRoleConfirmed(status: boolean) {
    isRoleConfirmed.value = status
    sessionStorage.setItem('isRoleConfirmed', String(status))
  }

  function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  function clearError() {
    errorMessage.value = ''
    validationErrors.value = []
  }

  // 1. Submit Form Login
  async function handleLogin() {
    if (loading.value) return

    clearError()

    if (!username.value || !password.value) {
      errorMessage.value = 'Username (NPK/Email) dan kata sandi wajib diisi.'
      return
    }

    loading.value = true

    try {
      const response = await AuthService.login(username.value, password.value)
      const data = response.data

      user.value = data.user
      availableRoles.value = data.availableRoles
      activeRole.value = data.activeRole
      isAuthenticated.value = true

      setRoleConfirmed(false)
      password.value = ''
      router.push('/dashboard')
    } catch (err: any) {
      const errorResponse = err.response?.data
      errorMessage.value = errorResponse?.message || 'Gagal memverifikasi akun.'
      validationErrors.value = errorResponse?.errors || []
    } finally {
      loading.value = false
    }
  }

  // 2. Hydrate Sesi Profil User saat Page Reload (/auth/me)
async function fetchUser() {
    loading.value = true
    try {
      const response = await AuthService.fetchMe()
      const data = response.data

      user.value = data.user
      // Hanya isi availableRoles jika belum terisi agar tidak tertimpa respon tunggal
      if (availableRoles.value.length === 0) {
        availableRoles.value = data.availableRoles
      }
      activeRole.value = data.activeRole
      isAuthenticated.value = true
    } catch {
      user.value = null
      activeRole.value = null
      isAuthenticated.value = false
      setRoleConfirmed(false)
    } finally {
      loading.value = false
    }
  }
async function selectRole(roleId: string) {
    loading.value = true
    clearError()
    try {
      const response = await AuthService.switchRole(roleId)
      activeRole.value = response.data.activeRole
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || 'Gagal mengubah peran.'
    } finally {
      loading.value = false
    }
  }

  // 4. Logout (Blacklist Redis & Clear Cookie)
  async function logout() {
    try {
      await AuthService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      username.value = ''
      password.value = ''
      user.value = null
      availableRoles.value = []
      activeRole.value = null
      isAuthenticated.value = false
      clearError()
      router.push('/login')
    }
  }

  return {
    username,
    password,
    rememberMe,
    isPasswordVisible,
    errorMessage,
    validationErrors,
    user,
    isRoleConfirmed,
    setRoleConfirmed,
    isAuthenticated,
    activeRole,
    availableRoles,
    loading,
    togglePasswordVisibility,
    clearError,
    handleLogin,
    fetchUser,
    selectRole,
    logout,
  }
})
