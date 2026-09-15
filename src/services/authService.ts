import api from './api'
import type { ApiResponse, LoginResponseData } from '@/models/authModel'

export const AuthService = {
  async login(username: string, password: string): Promise<ApiResponse<LoginResponseData>> {
    const response = await api.post<ApiResponse<LoginResponseData>>('/auth/login', {
      username,
      password,
    })
    return response.data
  },

  async fetchMe(): Promise<ApiResponse<LoginResponseData>> {
    const response = await api.get<ApiResponse<LoginResponseData>>('/auth/me')
    return response.data
  },

  async switchRole(targetRoleId: string): Promise<ApiResponse<{ activeRole: string }>> {
    const response = await api.post<ApiResponse<{ activeRole: string }>>('/auth/switch-role', {
      targetRoleId,
    })
    return response.data
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await api.post<ApiResponse<null>>('/auth/logout')
    return response.data
  },
}