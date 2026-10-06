export type TOStatusUI = 'Menunggu Persetujuan Pejabat' | 'Disetujui' | 'Perlu Koreksi'

export interface TransportBadge {
  type: 'flight' | 'train' | 'hotel' | 'bus' | 'car'
  label: string
}

export interface ExistingTOItem {
  id: string
  toCode: string
  status: TOStatusUI
  date: string
  orderDate?: string
  title: string
  unitKerjaKode?: string
  unitKerja: string
  bookerName: string
  bookerNpp: string
  totalEstimate: string
  transports: TransportBadge[]
  approverId?: string
  approverNama?: string
  budgetId?: string
  budgetAccount?: string
  programKerja?: string
  sprinNumber?: string
  sprinDetail?: string
  notes?: string
  remainingBudget?: number
}

export interface FetchExistingTOParams {
  search?: string
  status?: string
}

export type TransportType = 'flight' | 'train' | 'sea' | 'bus' | 'car' | 'hotel'

// 🟢 DTO 1: Pembuatan Header Travel Order Standalone
export interface CreateTravelOrderHeaderPayload {
  toCode?: string | null
  activityName: string
  unitKerjaKode?: string | null
  unitKerjaNama?: string | null
  programKerja?: string | null
  approverId: string
  budgetId: string
  sprinNumber: string
  sprinDetail: string
  notes?: string | null
}

// 🟢 DTO 2: Item Transportasi
export interface TravellerItemPayload {
  category: 'INTERNAL' | 'EKSTERNAL'
  transportType?: TransportType
  userId?: string | null
  name: string
  npkOrKtp?: string | null
  jabatanOrInstansi?: string | null
  phone: string
  route?: string | null
  originCityId?: number | null
  destinationCityId?: number | null
  departureDate: string
  departureTime: string 
  departureInfo?: string | null
  maskapai?: string | null
  kelas?: string | null
  transportId?: number | null
  transportClassId?: number | null
  isRoundTrip: boolean
  returnDate?: string | null
  returnTime?: string | null 
  returnInfo?: string | null
  returnMaskapai?: string | null
  returnKelas?: string | null
  returnTransportId?: number | null
  returnTransportClassId?: number | null
  price: number
}

export interface AddTransportToExistingTOPayload {
  travelOrderId: string
  travellers: TravellerItemPayload[]
}

// 🟢 DTO 3: Item Hotel
export interface HotelGuestPayload {
  roomNumber?: string
  bedSlot?: string
  category: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  guestName: string
  npkOrKtp?: string | null
  jabatanOrInstansi?: string | null
  phone?: string | null
}

export interface HotelItemPayload {
  hotelId?: number | null
  hotelNameCustom?: string | null
  cityId?: number | null
  roomCount: number
  checkInDate: string
  checkOutDate: string
  durationNights: number
  pricePerNight: number
  subtotalPrice: number
  guests: HotelGuestPayload[]
}

export interface AddHotelToExistingTOPayload {
  travelOrderId: string
  hotels: HotelItemPayload[]
}

// Standard API Response
export interface TravelOrderApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}
