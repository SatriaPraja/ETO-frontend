import api from '@/services/api' // Instance Axios
import type {
  ReportHotelQueryParams,
  GetHotelReportResponse,
  ReportTransportQueryParams,
  GetTransportReportResponse,
} from '@/models/reports'

export const reportService = {
  /**
   * Mengambil Laporan Transaksi Akomodasi Hotel & Rekapitulasi Stats
   */
  async getHotelReport(params: ReportHotelQueryParams): Promise<GetHotelReportResponse> {
    const response = await api.get<GetHotelReportResponse>('/v1/reports/hotels', {
      params,
    })
    return response.data
  },

  /**
   * Mengambil Laporan History Perjalanan Dinas Transportasi & Analytics
   */
  async getTransportReport(
    params: ReportTransportQueryParams,
  ): Promise<GetTransportReportResponse> {
    const response = await api.get<GetTransportReportResponse>('/v1/reports/transports', {
      params,
    })
    return response.data
  },
}