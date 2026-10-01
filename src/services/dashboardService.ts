import api from '@/services/api' // Axios Instance dengan BaseURL & Bearer Auth Cookie/Token
import type {
  DashboardOverviewData,
  DashboardQueryParams,
  ApiResponse,
} from '@/models/dashboard'

export const dashboardService = {
  /**
   * Mengambil seluruh ringkasan agregasi data Dashboard (KPI, Personil Aktif, Realisasi Anggaran, & Recent Orders)
   */
  async getOverview(params?: DashboardQueryParams): Promise<DashboardOverviewData> {
    const res = await api.get<ApiResponse<DashboardOverviewData>>('/v1/dashboard/overview', {
      params,
    })
    return res.data.data
  },
}