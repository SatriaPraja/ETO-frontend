// src/services/reportService.ts
import api from '@/services/api'
import type {
  ReportHotelQueryParams,
  GetHotelReportResponse,
  HotelTransactionItem,
  ReportTransportQueryParams,
  GetTransportReportResponse,
  TransportTransactionItem,
} from '@/models/reports'

export const reportService = {
  async getHotelReport(params: ReportHotelQueryParams): Promise<GetHotelReportResponse> {
    const response = await api.get<GetHotelReportResponse>('/v1/reports/hotels', { params })
    return response.data
  },

  async getTransportReport(
    params: ReportTransportQueryParams,
  ): Promise<GetTransportReportResponse> {
    const response = await api.get<GetTransportReportResponse>('/v1/reports/transports', { params })
    return response.data
  },

  async getAllHotelReportForPrint(
    params?: ReportHotelQueryParams,
  ): Promise<HotelTransactionItem[]> {
    const response = await api.get<{ success: boolean; data: HotelTransactionItem[] }>(
      '/v1/reports/hotel/print-data',
      { params },
    )
    return response.data?.data || []
  },

  // 🟢 Fetch SELURUH Data Transportasi Tanpa Limit Pagination untuk PDF
  async getAllTransportReportForPrint(
    params?: ReportTransportQueryParams,
  ): Promise<TransportTransactionItem[]> {
    const response = await api.get<{ success: boolean; data: TransportTransactionItem[] }>(
      '/v1/reports/transport/print-data',
      { params },
    )
    return response.data?.data || []
  },

  async downloadHotelExport(params?: ReportHotelQueryParams): Promise<void> {
    const response = await api.get('/v1/reports/hotel/export', { params, responseType: 'blob' })
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Laporan_Akomodasi_Hotel_${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },

  async downloadTransportExport(params?: ReportTransportQueryParams): Promise<void> {
    const response = await api.get('/v1/reports/transport/export', { params, responseType: 'blob' })
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Laporan_Transportasi_Dinas_${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },
 
}
