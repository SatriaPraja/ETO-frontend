export interface EditTransportItem {
  id?: string
  guestName: string
  npkOrKtp?: string
  jabatan?: string
  instansi?: string
  phone: string
  routeInfo?: string // 🟢 Tambahkan properti ini
  departureDate?: string
  departureTime?: string
  returnDate?: string | null // 🟢 Tambahkan | null
  returnTime?: string | null // 🟢 Tambahkan | null
  isRoundTrip?: boolean
  estimatedPrice: number
}

export interface EditHotelGuestItem {
  id?: string
  roomNumber: string
  bedSlot: string
  guestName: string
  npkOrKtp?: string
  jabatanOrInstansi?: string
  phone?: string
}

export interface EditHotelItem {
  id?: string
  hotelId?: number
  hotelNameCustom?: string
  cityId?: number
  roomCount: number
  checkInDate: string
  checkOutDate: string
  durationNights: number
  pricePerNight: number
  subtotalPrice: number
  guests: EditHotelGuestItem[]
}

export interface UpdateTravelOrderPayload {
  travelOrderId: string
  sprinNumber: string
  activityName: string
  budgetId: string
  sprinDetail: string
  notes: string
  transports: EditTransportItem[]
  hotels: EditHotelItem[]
}

export interface UpdateTravelOrderResponse {
  success: boolean
  message: string
  data: any
}
