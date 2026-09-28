export interface EditTransportItem {
  id?: string
  category?: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  guestName: string
  npkOrKtp?: string | null
  jabatan?: string | null
  instansi?: string | null
  phone: string
  departureDate: string
  departureTime?: string | null
  returnDate?: string | null
  returnTime?: string | null
  isRoundTrip?: boolean
  estimatedPrice: number
}

export interface EditHotelGuestItem {
  id?: string
  roomNumber: string
  bedSlot: string
  category?: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  guestName: string
  npkOrKtp?: string | null
  jabatanOrInstansi?: string | null
  phone?: string | null
}

export interface EditHotelItem {
  id?: string
  hotelId?: number | null
  hotelNameCustom?: string | null
  cityId?: number | null
  cityName?: string | null
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
  unitKerjaNama?: string
  budgetId: string
  sprinDetail: string
  notes: string
  transports: EditTransportItem[]
  hotels: EditHotelItem[]
}

export interface GetCorrectionDetailResponse {
  success: boolean
  message: string
  data: {
    id: string
    toCode: string
    status: string
    createdAt: string
    orderDate: string
    activityName: string
    unitKerjaKode: string
    unitKerjaNama: string
    sprinNumber: string
    sprinDetail: string
    notes: string | null
    totalEstimatedCost: string | number
    approverId: string
    approverNama: string
    budgetId: string
    budgetAccountNumber: string
    budgetAccountName: string
    programKerja: string
    remainingBudget: string | number
    transports: EditTransportItem[]
    hotels: EditHotelItem[]
  }
}

export interface UpdateTravelOrderResponse {
  success: boolean
  message: string
  data: any
}