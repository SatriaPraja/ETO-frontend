// Tipe Moda Transportasi sesuai Enum Database
export type TransportType = 'flight' | 'train' | 'sea' | 'bus' | 'car'

// Query Parameters untuk Filter & Pagination Table Vendor
export interface VendorQueryParams {
  search?: string
  type?: TransportType
  status?: 'active' | 'inactive' | 'all'
  page?: number
  limit?: number
}

// Detail Kelas Transportasi
export interface VendorClassItem {
  id?: number
  className: string
  description?: string | null
}

// Model Item Vendor / Maskapai
export interface VendorItem {
  id: number
  code: string
  name: string
  vendorFullName?: string | null
  type: TransportType
  integrationType: string
  isActive: boolean
  notes?: string | null
  classes: VendorClassItem[]
}

// KPI Stats Modul Vendor
export interface VendorKpiStats {
  totalVendor: number
  activeVendor: number
  inactiveVendor: number
  apiLive: number
  perluPembaharuan: number
  topModa: {
    type: TransportType
    count: number
  }
}

// Distribusi Moda Rekanan
export interface VendorDistributionItem {
  transportType: TransportType
  count: number
  percentage: number
}

// Response API GET /api/v1/master/vendors
export interface GetVendorsResponse {
  success: boolean
  message: string
  data: {
    stats: VendorKpiStats
    distribution: VendorDistributionItem[]
    pagination: {
      totalData: number
      page: number
      limit: number
      totalPages: number
    }
    vendors: VendorItem[]
  }
}

// DTO Payload Create / Update Vendor
export interface CreateVendorPayload {
  code: string
  name: string
  vendorFullName?: string
  type: TransportType
  integrationType?: string
  isActive?: boolean
  notes?: string
  classes?: VendorClassItem[]
}

export type UpdateVendorPayload = Partial<CreateVendorPayload>