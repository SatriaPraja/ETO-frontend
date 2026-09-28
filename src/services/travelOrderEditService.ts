import type {
  GetCorrectionDetailResponse,
  UpdateTravelOrderPayload,
  UpdateTravelOrderResponse,
} from '@/models/travelOrderEdit'

export class TravelOrderEditService {
  /**
   * 🟢 Private Helper untuk mengambil Token JWT dari LocalStorage
   */
  private static getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  /**
   * 🟢 Private Helper untuk membersihkan format jam dari zona waktu (WIB/WITA/WIT)
   * agar tidak menyebabkan error tipe data TIME di PostgreSQL
   */
  private static sanitizeTime(timeStr?: string | null): string | null {
    if (!timeStr) return null
    const cleaned = timeStr.replace(/\s*(WIB|WITA|WIT)/gi, '').trim()
    return cleaned || null
  }

  /**
   * 🟢 1. GET: Ambil Detail Data Koreksi Travel Order
   * Endpoint: GET /api/travel-orders/edit/:identifier
   */
  static async getOrderForCorrection(identifier: string): Promise<GetCorrectionDetailResponse> {
    const response = await fetch(`/api/travel-orders/edit/${encodeURIComponent(identifier)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat data koreksi Travel Order.')
    }

    return result as GetCorrectionDetailResponse
  }

  /**
   * 🟢 2. PUT: Kirim Ulang Perbaikan / Resubmit Travel Order
   * Endpoint: PUT /api/travel-orders/edit/:id
   */
  static async updateAndResubmitOrder(
    payload: UpdateTravelOrderPayload,
  ): Promise<UpdateTravelOrderResponse> {
    // Sanitasi jam keberangkatan & kepulangan pada array transports
    const sanitizedTransports = payload.transports.map((t) => ({
      ...t,
      departureTime: this.sanitizeTime(t.departureTime),
      returnTime: this.sanitizeTime(t.returnTime),
    }))

    const finalPayload: UpdateTravelOrderPayload = {
      ...payload,
      transports: sanitizedTransports,
    }

    const response = await fetch(`/api/travel-orders/edit/${payload.travelOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(finalPayload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal mengirim ulang perbaikan Travel Order.')
    }

    return result as UpdateTravelOrderResponse
  }
}

// Export instance/object kompatibel agar Pinia Store dapat memanggil method secara langsung
export const travelOrderEditService = TravelOrderEditService
