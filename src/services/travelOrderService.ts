import type {
  CreateTravelOrderHeaderPayload,
  AddTransportToExistingTOPayload,
  AddHotelToExistingTOPayload,
  ExistingTOItem,
  FetchExistingTOParams,
  TravelOrderApiResponse,
} from '@/models/travelOrder'

export class TravelOrderService {
  private static getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  // 1. Ambil Daftar Travel Order Existing
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

    const result: TravelOrderApiResponse<ExistingTOItem[]> = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat data Travel Order.')
    }

    return result.data || []
  }

  private static sanitizeTime(timeStr?: string | null): string {
    if (!timeStr) return ''
    return timeStr.replace(/\s*(WIB|WITA|WIT)/gi, '').trim()
  }

  // 2. POST /api/travel-orders (Buat Header Travel Order Mandiri)
  static async createTravelOrderHeader(
    payload: CreateTravelOrderHeaderPayload,
  ): Promise<TravelOrderApiResponse<{ id: string; to_code: string }>> {
    const response = await fetch('/api/travel-orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal membuat Header Travel Order.')
    }

    return result
  }

  // 3. POST /api/travel-orders/transport (Tambah Transportasi ke TO Existing)
  static async addTransportOrder(
    payload: AddTransportToExistingTOPayload,
  ): Promise<TravelOrderApiResponse> {
    const sanitizedTravellers = payload.travellers.map((t) => ({
      ...t,
      departureTime: this.sanitizeTime(t.departureTime),
      returnTime: t.returnTime ? this.sanitizeTime(t.returnTime) : null,
    }))

    const finalPayload: AddTransportToExistingTOPayload = {
      ...payload,
      travellers: sanitizedTravellers,
    }

    const response = await fetch('/api/travel-orders/transport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(finalPayload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal menambahkan reservasi transportasi.')
    }

    return result
  }

  // 4. POST /api/travel-orders/hotel (Tambah Hotel ke TO Existing)
  static async addHotelOrder(
    payload: AddHotelToExistingTOPayload,
  ): Promise<TravelOrderApiResponse> {
    const response = await fetch('/api/travel-orders/hotel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal menambahkan reservasi hotel.')
    }

    return result
  }
}
