// Query Parameters untuk Pengajuan Terakhir & Filtering Dashboard
export interface DashboardQueryParams {
  search?: string
  status?: 'ALL' | 'WAITING_PEJABAT' | 'APPROVED' | 'RETURNED' | 'REJECTED' | 'CANCELLED'
  limit?: number
  page?: number
  monthYear?: string // Format YYYY-MM
}

// 1. KPI Counter Cards (Top Bar)
export interface DashboardKpiStats {
  waitingCount: number
  approvedThisMonthCount: number
  returnedCount: number
  rejectedCount: number
}

// 2. Personil Sedang Berlangsung Hari Ini
export interface OngoingTraveller {
  id: string
  guestName: string
  maskapai: string
  routeInfo: string
  departureInfo: string
  avatarInitials?: string
}

// 3. Ringkasan Realisasi Anggaran Unit Kerja
export interface DashboardBudgetSummary {
  paguTotal: number
  realisasi: number
  pending: number
  sisa: number
  percentageTerpakai: number
}

// 4. Item Table Pengajuan Terakhir (Recent Orders)
export interface RecentOrderItem {
  id: string
  toCode: string
  activityName: string
  unitKerjaKode: string
  unitKerjaNama: string
  orderDate: string
  status: 'WAITING_PEJABAT' | 'APPROVED' | 'RETURNED' | 'REJECTED' | 'CANCELLED'
  totalEstimatedCost: number
  createdAt: string
  totalTravellers: number
}

// Metadata Pagination
export interface DashboardPaginationMeta {
  totalData: number
  currentPage: number
  totalPages: number
  limit: number
}

// Response Aggregation dari API Backend /overview
export interface DashboardOverviewData {
  kpiStats: DashboardKpiStats
  ongoingTravellers: OngoingTraveller[]
  budgetSummary: DashboardBudgetSummary
  recentOrders: RecentOrderItem[]
  meta: DashboardPaginationMeta
}

// Standard API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}