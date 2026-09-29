// Query Parameters untuk List, Search, dan Filter MAK
export interface BudgetQueryParams {
  search?: string
  officeName?: string
  status?: 'aman' | 'warning' | 'critical' | 'all'
  page?: number
  limit?: number
}

// Model Item Mata Anggaran (MAK / COA)
export interface BudgetItem {
  id: string
  officeName: string
  accountNumber: string // COA e.g. 5.2.1.04.01
  accountName: string // Uraian Anggaran
  programName: string // Program Kerja Resmi
  activityName: string // Kegiatan Operasional
  paguBudget: number
  usedBudget: number
  remainingBudget?: number
  remainingPercentage?: number
  createdAt?: string
  updatedAt?: string
}

// Model Metrics Statistik KPI Header
export interface BudgetKpiStats {
  totalPaguDipa: number
  totalRealisasiIssued: number
  realisasiPercentage: string
  dalamProsesPersetujuan: number
  totalPengajuanCount: number
  persetujuanPercentage: string
  sisaSaldoPaguTersedia: number
  sisaPercentage: string
  totalAkunCoa: number
  totalUnitKerja: number
}

// Response API Pagination Standard
export interface PaginatedBudgetResponse {
  totalData: number
  page: number
  limit: number
  totalPages: number
  data: BudgetItem[]
}

// Response Wrapper API Standard
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

// DTO Payload Create / Update MAK
export interface CreateBudgetPayload {
  officeName: string
  accountNumber: string
  accountName: string
  programName: string
  activityName: string
  paguBudget: number
  usedBudget?: number
}

export type UpdateBudgetPayload = Partial<CreateBudgetPayload>