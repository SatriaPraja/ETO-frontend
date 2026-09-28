// ====================================================================
// A. DETAIL TRANSPORT ITEM
// ====================================================================
export interface EditTransportItem {
  id?: string
  transportType?: 'flight' | 'train' | 'sea' | 'bus' | 'car'
  category?: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  user_id?: string | null

  // Identitas Traveller
  guestName: string
  guest_name?: string
  npkOrKtp?: string | null
  npk_or_ktp?: string | null
  jabatan?: string | null
  instansi?: string | null
  phone: string

  // Detail Rute & Kota
  routeInfo?: string | null
  route_info?: string | null
  originCityId?: number | null
  origin_city_id?: number | null
  destinationCityId?: number | null
  destination_city_id?: number | null

  // Departure Leg
  departureDate: string
  departure_date?: string
  departureTime?: string | null
  departure_time?: string | null
  maskapai?: string | null
  kelas?: string | null

  // Return Leg (PP)
  isRoundTrip?: boolean
  is_round_trip?: boolean
  returnDate?: string | null
  return_date?: string | null
  returnTime?: string | null
  return_time?: string | null
  returnMaskapai?: string | null
  return_maskapai?: string | null
  returnKelas?: string | null
  return_kelas?: string | null

  estimatedPrice: number
  estimated_price?: number
}

// ====================================================================
// B. DETAIL HOTEL GUEST ITEM
// ====================================================================
export interface EditHotelGuestItem {
  id?: string
  roomNumber: string
  room_number?: string
  bedSlot: string
  bed_slot?: string
  category?: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  user_id?: string | null
  guestName: string
  guest_name?: string
  npkOrKtp?: string | null
  npk_or_ktp?: string | null
  jabatanOrInstansi?: string | null
  jabatan_or_instansi?: string | null
  phone?: string | null
  isFilled?: boolean
  is_filled?: boolean
}

// ====================================================================
// C. DETAIL HOTEL ITEM
// ====================================================================
export interface EditHotelItem {
  id?: string
  hotelId?: number | null
  hotel_id?: number | null
  hotelNameCustom?: string | null
  hotel_name_custom?: string | null
  cityId?: number | null
  city_id?: number | null
  cityName?: string | null
  city_name?: string | null
  roomCount: number
  room_count?: number
  checkInDate: string
  check_in_date?: string
  checkOutDate: string
  check_out_date?: string
  durationNights: number
  duration_nights?: number
  pricePerNight: number
  price_per_night?: number
  subtotalPrice: number
  subtotal_price?: number
  guests: EditHotelGuestItem[]
}

// ====================================================================
// D. PAYLOAD UPDATE & RESPONSES
// ====================================================================
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