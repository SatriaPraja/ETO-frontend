import api from './api'
import type { ApiResponse } from '@/models/authModel'
import type { UserItem, UserDTO, GetUsersQuery, UserPaginatedResponse } from '@/models/userModel'

export const UserService = {
  // 1. Fetch daftar user (Sudah mendukung page & limit)
  async getUsers(params?: GetUsersQuery): Promise<UserPaginatedResponse<UserItem[]>> {
    const response = await api.get<UserPaginatedResponse<UserItem[]>>('/users', { params })
    return response.data
  },

  // 2. Create User
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