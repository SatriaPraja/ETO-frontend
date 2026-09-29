import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cityAirportService } from '@/services/cityAirportService'
import type {
  CityItem,
  AirportItem,
  CityAirportQueryParams,
  CityAirportKpiStats,
  CreateCityPayload,
  UpdateCityPayload,
  CreateAirportPayload,
  UpdateAirportPayload,
} from '@/models/cityAirport'

export const useCityAirportStore = defineStore('cityAirport', () => {
  // ====================================================================
  // STATE
  // ====================================================================
  const activeTab = ref<'city' | 'airport'>('airport')

  const filters = ref<CityAirportQueryParams>({
    search: '',
    status: 'all',
    page: 1,
    limit: 10,
  })

  const stats = ref<CityAirportKpiStats>({
    totalCities: 0,
    totalAirports: 0,
    activeAirports: 0,
    inactiveAirports: 0,
    topProvince: { name: '-', count: 0 },
  })

  const cities = ref<CityItem[]>([])
  const airports = ref<AirportItem[]>([])

  const totalData = ref<number>(0)
  const totalPages = ref<number>(1)

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // ====================================================================
  // ACTIONS
  // ====================================================================

  /**
   * Memuat statistik KPI
   */
  async function fetchStats(): Promise<void> {
    try {
      stats.value = await cityAirportService.getKpiStats()
    } catch (error) {
      console.error('Gagal memuat KPI stats:', error)
    }
  }

  /**
   * Memuat data tabel (Kota atau Bandara sesuai tab aktif)
   */
  async function fetchData(): Promise<void> {
    isLoading.value = true
    try {
      await fetchStats()

      if (activeTab.value === 'city') {
        const response = await cityAirportService.getCities(filters.value)
        cities.value = response.data || []
        totalData.value = response.totalData || 0
        totalPages.value = response.totalPages || 1
      } else {
        const response = await cityAirportService.getAirports(filters.value)
        airports.value = response.data || []
        totalData.value = response.totalData || 0
        totalPages.value = response.totalPages || 1
      }
    } catch (error) {
      console.error('Gagal memuat data master kota/bandara:', error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Berpindah antar tab Kota & Bandara
   */
  async function switchTab(tab: 'city' | 'airport'): Promise<void> {
    activeTab.value = tab
    filters.value.page = 1
    filters.value.search = ''
    await fetchData()
  }

  /**
   * Menambahkan data Kota Baru
   */
  async function addCity(payload: CreateCityPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await cityAirportService.createCity(payload)
      await fetchData()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Memperbarui data Kota
   */
  async function editCity(id: number, payload: UpdateCityPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await cityAirportService.updateCity(id, payload)
      await fetchData()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Menghapus Kota
   */
  async function removeCity(id: number): Promise<void> {
    isLoading.value = true
    try {
      await cityAirportService.deleteCity(id)
      await fetchData()
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Menambahkan data Bandara Baru
   */
  async function addAirport(payload: CreateAirportPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await cityAirportService.createAirport(payload)
      await fetchData()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Memperbarui data Bandara
   */
  async function editAirport(id: number, payload: UpdateAirportPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await cityAirportService.updateAirport(id, payload)
      await fetchData()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Menghapus Bandara
   */
  async function removeAirport(id: number): Promise<void> {
    isLoading.value = true
    try {
      await cityAirportService.deleteAirport(id)
      await fetchData()
    } finally {
      isLoading.value = false
    }
  }

  return {
    activeTab,
    filters,
    stats,
    cities,
    airports,
    totalData,
    totalPages,
    isLoading,
    isSubmitting,
    fetchStats,
    fetchData,
    switchTab,
    addCity,
    editCity,
    removeCity,
    addAirport,
    editAirport,
    removeAirport,
  }
})