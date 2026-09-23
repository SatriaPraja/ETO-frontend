import type { FetchEmployeeParams, EmployeePaginationResponse } from '@/models/employee'

export class EmployeeService {
  private static getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  static async getEmployees(params?: FetchEmployeeParams): Promise<EmployeePaginationResponse> {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.append('search', params.search)
    if (params?.scope) queryParams.append('scope', params.scope)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const response = await fetch(`/api/users/employees?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat data personel HCIS.')
    }

    return {
      employees: result.data || [],
      pagination: result.pagination || { totalItems: 0, page: 1, limit: 10, totalPages: 1 },
    }
  }
}