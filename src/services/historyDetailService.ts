import type { HistoryDetailApiResponse } from '@/models/historyDetail'

export class HistoryDetailService {
  static async fetchOrderDetail(toCode: string): Promise<HistoryDetailApiResponse> {
    const response = await fetch(`/api/history/${encodeURIComponent(toCode)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })

    const resData: HistoryDetailApiResponse = await response.json()
    if (!response.ok || !resData.success) {
      throw new Error(resData.message || 'Gagal memuat detail Travel Order.')
    }

    return resData
  }
}