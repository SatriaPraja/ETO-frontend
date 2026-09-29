import api from '@/services/api' // Instance Axios Frontend
import type {
  VendorQueryParams,
  GetVendorsResponse,
  VendorItem,
  CreateVendorPayload,
  UpdateVendorPayload,
} from '@/models/vendor'

export const vendorService = {
  /**
   * Mengambil daftar vendor, statistik KPI, dan distribusi moda
   */
  async getVendors(params: VendorQueryParams): Promise<GetVendorsResponse> {
    const response = await api.get<GetVendorsResponse>('/v1/master/vendors', { params })
    return response.data
  },

  /**
   * Mengambil detail vendor berdasarkan ID
   */
  async getVendorById(id: number): Promise<VendorItem> {
    const response = await api.get<{ success: boolean; data: VendorItem }>(`/v1/master/vendors/${id}`)
    return response.data.data
  },

  /**
   * Menambahkan vendor / maskapai baru
   */
  async createVendor(payload: CreateVendorPayload): Promise<VendorItem> {
    const response = await api.post<{ success: boolean; data: VendorItem }>('/v1/master/vendors', payload)
    return response.data.data
  },

  /**
   * Memperbarui data vendor / maskapai
   */
  async updateVendor(id: number, payload: UpdateVendorPayload): Promise<VendorItem> {
    const response = await api.put<{ success: boolean; data: VendorItem }>(`/v1/master/vendors/${id}`, payload)
    return response.data.data
  },

  /**
   * Menghapus vendor / maskapai
   */
  async deleteVendor(id: number): Promise<boolean> {
    const response = await api.delete<{ success: boolean }>(`/v1/master/vendors/${id}`)
    return response.data.success
  },
}