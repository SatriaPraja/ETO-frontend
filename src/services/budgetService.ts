import api from '@/services/api' // Axios Instance yang sudah tersetup BaseURL & Auth Header
import type {
  BudgetItem,
  BudgetQueryParams,
  BudgetKpiStats,
  PaginatedBudgetResponse,
  ApiResponse,
  CreateBudgetPayload,
  UpdateBudgetPayload,
} from '@/models/budget'

export const budgetService = {
  /**
   * Mengambil statistik KPI Ringkasan Pagu DIPA, Serapan, & Sisa Saldo
   */
  async getKpiStats(): Promise<BudgetKpiStats> {
    const res = await api.get<ApiResponse<BudgetKpiStats>>('/v1/master/budget/stats')
    return res.data.data
  },

  /**
   * Mengambil daftar Mata Anggaran (MAK) dengan Filter & Pagination
   */
  async getBudgets(params: BudgetQueryParams): Promise<PaginatedBudgetResponse> {
    const res = await api.get<ApiResponse<PaginatedBudgetResponse>>('/v1/master/budget', { params })
    return res.data.data
  },

  /**
   * Mengambil detail Mata Anggaran berdasarkan UUID
   */
  async getBudgetById(id: string): Promise<BudgetItem> {
    const res = await api.get<ApiResponse<BudgetItem>>(`/v1/master/budget/${id}`)
    return res.data.data
  },

  /**
   * Membuat alokasi Mata Anggaran Baru
   */
  async createBudget(payload: CreateBudgetPayload): Promise<BudgetItem> {
    const res = await api.post<ApiResponse<BudgetItem>>('/v1/master/budget', payload)
    return res.data.data
  },

  /**
   * Memperbarui alokasi Mata Anggaran / Pagu DIPA
   */
  async updateBudget(id: string, payload: UpdateBudgetPayload): Promise<BudgetItem> {
    const res = await api.put<ApiResponse<BudgetItem>>(`/v1/master/budget/${id}`, payload)
    return res.data.data
  },

  /**
   * Menghapus Mata Anggaran
   */
  async deleteBudget(id: string): Promise<boolean> {
    const res = await api.delete<ApiResponse<null>>(`/v1/master/budget/${id}`)
    return res.data.success
  },
}