import api from './api'
import type { ApiResponse } from '@/models/authModel'
import type { UserItem, UserDTO } from '@/models/userModel'

export const UserService = {
  // 1. Fetch daftar user
  async getUsers(params?: { search?: string; role?: string }): Promise<ApiResponse<UserItem[]>> {
    const response = await api.get<ApiResponse<UserItem[]>>('/users', { params })
    return response.data
  },

  // 2. Create User (Ubah URL dari '/auth/register' menjadi '/users')
  async createUser(payload: UserDTO): Promise<ApiResponse<UserItem>> {
    const response = await api.post<ApiResponse<UserItem>>('/users', payload)
    return response.data
  },

  // 3. Update Data User
  async updateUser(id: string, payload: Partial<UserDTO>): Promise<ApiResponse<UserItem>> {
    const response = await api.put<ApiResponse<UserItem>>(`/users/${id}`, payload)
    return response.data
  },

  // 4. Toggle Status Active / Inactive
  async toggleStatus(id: string, status: 'active' | 'inactive'): Promise<ApiResponse<UserItem>> {
    const response = await api.patch<ApiResponse<UserItem>>(`/users/${id}/status`, { status })
    return response.data
  },
}