export type HistoryOrderStatus =
  'WAITING_PEJABAT' | 'WAITING_ADMINTRAVEL' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'CANCELLED'

export interface HistoryOrderItem {
  id: string
  toCode: string
  activityName: string
  unitKerjaKode: string
  unitKerjaNama: string
  sprinNumber: string
  orderDate: string
  status: HistoryOrderStatus
  totalEstimatedCost: number
  createdAt: string
  bookerNama: string
  bookerNpk: string
  totalTravellers: number
  totalHotelRooms: number
}

export interface HistoryPaginationMeta {
  totalData: number
  currentPage: number
  totalPages: number
  limit: number
}

export interface HistoryApiResponse {
  success: boolean
  message: string
  data: HistoryOrderItem[]
  pagination: HistoryPaginationMeta
}

export interface HistoryFilterState {
  search: string
  status: string
  unitKerjaKode: string
  startDate: string
  endDate: string
  page: number
  limit: number
}
