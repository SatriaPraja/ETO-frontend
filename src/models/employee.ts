export interface EmployeeItem {
  id: string
  name: string
  email: string
  npk: string
  jabatan: string
  golongan: string
  unitKerja: string
  unitKerjaKode?: string
  phone: string
  status: 'Tersedia' | 'Sedang Cuti Dinas' | 'Dalam Perjalanan Dinas'
  avatarUrl?: string
  avatarInitials?: string
}

export interface FetchEmployeeParams {
  search?: string
  scope?: 'my-unit' | 'national'
  page?: number
  limit?: number
}

export interface EmployeePaginationResponse {
  employees: EmployeeItem[]
  pagination: {
    totalItems: number
    page: number
    limit: number
    totalPages: number
  }
}