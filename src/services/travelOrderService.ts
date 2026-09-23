import type { CreateFlightOrderPayload, ExistingTOItem, FetchExistingTOParams, FlightOrderResponse } from "@/models/travelOrder"


export class TravelOrderService {
  private static getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  static async fetchExistingOrders(params?: FetchExistingTOParams): Promise<ExistingTOItem[]> {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.append('search', params.search)
    if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status)

    const response = await fetch(`/api/travel-orders/existing?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat data Travel Order.')
    }

    return result.data as ExistingTOItem[]
  }

  private static sanitizeTime(timeStr?: string | null): string {
    if (!timeStr) return ''
    return timeStr.replace(/\s*(WIB|WITA|WIT)/gi, '').trim()
  }

  static async submitFlightOrder(payload: CreateFlightOrderPayload): Promise<FlightOrderResponse> {
    // 🟢 Sanitasi jam pada seluruh array travellers agar PostgreSQL TIME tidak error
    const sanitizedTravellers = payload.travellers.map((t) => ({
      ...t,
      departureTime: this.sanitizeTime(t.departureTime),
      returnTime: t.returnTime ? this.sanitizeTime(t.returnTime) : null,
    }))

    const finalPayload: CreateFlightOrderPayload = {
      ...payload,
      travellers: sanitizedTravellers,
    }

    const response = await fetch('/api/travel-orders/flight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(finalPayload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal mengajukan Travel Order Pesawat.')
    }

    return result
  }
}