export interface TransportItem {
  id: string
  transportType: string
  category: 'INTERNAL' | 'EKSTERNAL'
  userId?: string
  guestName: string
  npkOrKtp: string
  jabatan: string
  instansi: string
  phone: string
  routeInfo: string
  departureInfo: string
  returnInfo: string
  maskapai: string
  departureDate: string
  departureTime: string
  isRoundTrip: boolean
  returnDate?: string
  returnTime?: string
  estimatedPrice: number
}

export interface HotelGuestItem {
  id: string
  roomNumber: string
  bedSlot: string
  category: 'INTERNAL' | 'EKSTERNAL'
  guestName: string
  npkOrKtp: string
  jabatanOrInstansi: string
  phone: string
  isFilled: boolean
}

export interface HotelItem {
  id: string
  hotelNameCustom: string
  roomCount: number
  checkInDate: string
  checkOutDate: string
  durationNights: number
  pricePerNight: number
  subtotalPrice: number
  cityName: string
  guests: HotelGuestItem[]
}

export interface ApprovalLogItem {
  id: string
  action: string
  notes?: string
  createdAt: string
  actorNama: string
  actorJabatan: string
}

export interface BudgetSummary {
  paguBudget: number
  totalEstimatedCost: number
  remainingBudget: number
  usagePercentage: string
}

export interface TravelOrderDetail {
  id: string
  toCode: string
  activityName: string
  bookerId?: string
  unitKerjaKode: string
  unitKerjaNama: string
  sprinNumber: string
  sprinDetail: string
  notes?: string
  orderDate: string
  status: string
  totalEstimatedCost: number
  createdAt: string
  bookerNama: string
  bookerRole: string
  approverNama: string
  approverJabatan: string
  budgetAccountNumber: string
  budgetAccountName: string
  paguBudget: number
  usedBudget: number
  transports: TransportItem[]
  hotels: HotelItem[]
  approvalLogs: ApprovalLogItem[]
  budgetSummary: BudgetSummary
}

export interface HistoryDetailApiResponse {
  success: boolean
  message: string
  data: TravelOrderDetail
}