import api from '@/services/api' // Axios instance dengan BaseURL /api/v1
import type {
  CityItem,
  AirportItem,
  CityAirportQueryParams,
  CityAirportKpiStats,
  PaginatedResponse,
  ApiResponse,
  CreateCityPayload,
  UpdateCityPayload,
  CreateAirportPayload,
  UpdateAirportPayload,
} from '@/models/cityAirport'

export const cityAirportService = {
  /**
   * Mengambil statistik KPI Kota & Bandara
   */
  async getKpiStats(): Promise<CityAirportKpiStats> {
    const res = await api.get<ApiResponse<CityAirportKpiStats>>('/v1/master/cities-airports/stats')
    return res.data.data
  },

  // ====================================================================
  // CITY ENDPOINTS
  // ====================================================================

  async getCities(params: CityAirportQueryParams): Promise<PaginatedResponse<CityItem>> {
    const res = await api.get<ApiResponse<PaginatedResponse<CityItem>>>('/v1/master/cities', { params })
    return res.data.data
  },

  async getCityById(id: number): Promise<CityItem> {
    const res = await api.get<ApiResponse<CityItem>>(`/v1/master/cities/${id}`)
    return res.data.data
  },

  async createCity(payload: CreateCityPayload): Promise<CityItem> {
    const res = await api.post<ApiResponse<CityItem>>('/v1/master/cities', payload)
    return res.data.data
  },

  async updateCity(id: number, payload: UpdateCityPayload): Promise<CityItem> {
    const res = await api.put<ApiResponse<CityItem>>(`/v1/master/cities/${id}`, payload)
    return res.data.data
  },

  async deleteCity(id: number): Promise<boolean> {
    const res = await api.delete<ApiResponse<null>>(`/v1/master/cities/${id}`)
    return res.data.success
  },

  // ====================================================================
  // AIRPORT ENDPOINTS
  // ====================================================================

  async getAirports(params: CityAirportQueryParams): Promise<PaginatedResponse<AirportItem>> {
    const res = await api.get<ApiResponse<PaginatedResponse<AirportItem>>>('/v1/master/airports', { params })
    return res.data.data
  },

  async getAirportById(id: number): Promise<AirportItem> {
    const res = await api.get<ApiResponse<AirportItem>>(`/v1/master/airports/${id}`)
    return res.data.data
  },

  async createAirport(payload: CreateAirportPayload): Promise<AirportItem> {
    const res = await api.post<ApiResponse<AirportItem>>('/v1/master/airports', payload)
    return res.data.data
  },

  async updateAirport(id: number, payload: UpdateAirportPayload): Promise<AirportItem> {
    const res = await api.put<ApiResponse<AirportItem>>(`/v1/master/airports/${id}`, payload)
    return res.data.data
  },

  async deleteAirport(id: number): Promise<boolean> {
    const res = await api.delete<ApiResponse<null>>(`/v1/master/airports/${id}`)
    return res.data.success
  },
}