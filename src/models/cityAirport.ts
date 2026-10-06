// Query Parameters untuk List & Filtering
export interface CityAirportQueryParams {
  search?: string
  status?: 'active' | 'inactive' | 'all'
  page?: number
  limit?: number
}

// Model Item Kota / Kabupaten
export interface CityItem {
  id: number
  code: string
  name: string
  province: string
  isActive: boolean
  createdAt?: string
  airportsCount?: number
}

// Model Item Bandara (IATA)
export interface AirportItem {
  id: number
  code: string 
  name: string
  cityId: number
  cityName?: string
  provinceName?: string
  isActive: boolean
}

// KPI Stats Modul Kota & Bandara
export interface CityAirportKpiStats {
  totalCities: number
  totalAirports: number
  activeAirports: number
  inactiveAirports: number
  topProvince: {
    name: string
    count: number
  }
}

// Standard API Pagination Response
export interface PaginatedResponse<T> {
  totalData: number
  page: number
  limit: number
  totalPages: number
  data: T[]
}

// Standard API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

// Payload DTOs
export interface CreateCityPayload {
  code: string
  name: string
  province: string
  isActive?: boolean
}

export type UpdateCityPayload = Partial<CreateCityPayload>

export interface CreateAirportPayload {
  code: string
  name: string
  cityId: number
  isActive?: boolean
}

export type UpdateAirportPayload = Partial<CreateAirportPayload>