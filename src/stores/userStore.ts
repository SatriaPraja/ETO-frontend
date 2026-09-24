import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserService } from '@/services/userService'
import type { UserItem, UserDTO } from '@/models/userModel'

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export const useUserStore = defineStore('userStore', () => {
  const users = ref<UserItem[]>([])
  const loading = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')
  const selectedRoleFilter = ref('ALL')

  // 🟢 1. Tambahkan State untuk Paginasi
  const currentPage = ref(1)
  const limit = ref(10)
  const meta = ref<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  // Fetch all users dari backend
  async function fetchUsers() {
    loading.value = true
    errorMessage.value = ''
    try {
      const response = await UserService.getUsers({
        search: searchQuery.value,
        role: selectedRoleFilter.value !== 'ALL' ? selectedRoleFilter.value : undefined,
        page: currentPage.value, // 🟢 Kirim halaman aktif
        limit: limit.value,      // 🟢 Kirim limit
      })

      users.value = response.data
      
      // 🟢 Simpan metadata paginasi dari response backend (jika ada)
      if (response.meta) {
        meta.value = response.meta
      }
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || 'Gagal mengambil data user.'
    } finally {
      loading.value = false
    }
  }

  // 🟢 2. Buat Fungsi setPage untuk Mengubah Halaman
  function setPage(page: number) {
    if (page < 1) return
    currentPage.value = page
    fetchUsers()
  }

  // Add User via POST /api/auth/register
  async function addUser(payload: UserDTO) {
    loading.value = true
    try {
      await UserService.createUser(payload)
      await fetchUsers() // Reload list
    } catch (err: any) {
      throw err.response?.data?.message || 'Gagal menambahkan user baru.'
    } finally {
      loading.value = false
    }
  }

  // Edit User via PUT /api/users/:id
  async function editUser(id: string, payload: Partial<UserDTO>) {
    loading.value = true
    try {
      await UserService.updateUser(id, payload)
      await fetchUsers()
    } catch (err: any) {
      throw err.response?.data?.message || 'Gagal mengedit data user.'
    } finally {
      loading.value = false
    }
  }

  // Toggle Status User
  async function toggleStatus(user: UserItem) {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    try {
      await UserService.toggleStatus(user.id, newStatus)
      user.status = newStatus
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || 'Gagal mengubah status user.'
    }
  }

  // 🟢 3. Pastikan Semua State & Function Di-return
  return {
    users,
    loading,
    errorMessage,
    searchQuery,
    selectedRoleFilter,
    currentPage,
    meta,
    fetchUsers,
    setPage,
    addUser,
    editUser,
    toggleStatus,
  }
})