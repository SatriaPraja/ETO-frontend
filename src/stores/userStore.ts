import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserService } from '@/services/userService'
import type { UserItem, UserDTO } from '@/models/userModel'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<UserItem[]>([])
  const loading = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')
  const selectedRoleFilter = ref('ALL')

  // Fetch all users dari backend
  async function fetchUsers() {
    loading.value = true
    errorMessage.value = ''
    try {
      const response = await UserService.getUsers({
        search: searchQuery.value,
        role: selectedRoleFilter.value !== 'ALL' ? selectedRoleFilter.value : undefined,
      })
      users.value = response.data
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || 'Gagal mengambil data user.'
    } finally {
      loading.value = false
    }
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

  return {
    users,
    loading,
    errorMessage,
    searchQuery,
    selectedRoleFilter,
    fetchUsers,
    addUser,
    editUser,
    toggleStatus,
  }
})