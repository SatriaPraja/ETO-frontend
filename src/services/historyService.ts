import type { HistoryApiResponse, HistoryFilterState } from '@/models/history'

export class HistoryService {
  static async fetchHistory(filters: HistoryFilterState): Promise<HistoryApiResponse> {
    const params = new URLSearchParams()

    if (filters.search) params.append('search', filters.search)
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status)
    if (filters.unitKerjaKode) params.append('unitKerjaKode', filters.unitKerjaKode)
    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)
    params.append('page', filters.page.toString())
    params.append('limit', filters.limit.toString())

    const response = await fetch(`/api/history?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })

    const resData: HistoryApiResponse = await response.json()
    if (!response.ok || !resData.success) {
      throw new Error(resData.message || 'Gagal memuat riwayat pengajuan e-TO.')
    }

    return resData
  }
}