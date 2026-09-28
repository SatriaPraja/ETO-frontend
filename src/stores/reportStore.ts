import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reportService } from '@/services/reportService'
import type {
  ReportHotelQueryParams,
  HotelReportStats,
  HotelTransactionItem,
  ReportTransportQueryParams,
  TransportReportStats,
  TransportTransactionItem,
  TransportCompositionItem,
  TopCorridorItem,
} from '@/models/reports'

export const useReportStore = defineStore('report', () => {
  // ====================================================================
  // 1. STATE LAPORAN HOTEL
  // ====================================================================
  const hotelFilters = ref<ReportHotelQueryParams>({
    unitKerjaKode: '',
    cityId: null,
    searchCategory: 'hotelName',
    keyword: '',
    period: '',
    status: undefined,
    page: 1,
    limit: 10,
  })

  const hotelStats = ref<HotelReportStats>({
    totalReservasi: 0,
    totalKamar: 0,
    totalRoomNights: 0,
    totalBebanHotel: 0,
    rataRataTarifMalam: 0,
    rataRataMalam: 0,
    rasioKamarPerReservasi: 0,
  })

  const hotelTransactions = ref<HotelTransactionItem[]>([])
  const hotelTotalData = ref<number>(0)
  const hotelTotalPages = ref<number>(1)
  const isHotelLoading = ref<boolean>(false)

  // ====================================================================
  // 2. STATE LAPORAN TRANSPORTASI
  // ====================================================================
  const transportFilters = ref<ReportTransportQueryParams>({
    unitKerjaKode: '',
    budgetId: undefined,
    searchCategory: 'guestName',
    keyword: '',
    startDate: '',
    endDate: '',
    status: undefined,
    category: undefined,
    transportType: undefined,
    page: 1,
    limit: 10,
  })

  const transportStats = ref<TransportReportStats>({
    totalPengajuan: 0,
    disetujuiResmi: 0,
    menunggu: 0,
    ditolak: 0,
    totalPersonel: 0,
    internalBPJS: 0,
    eksternalTamu: 0,
    realisasiAnggaran: 0,
  })

  const transportCompositions = ref<TransportCompositionItem[]>([])
  const transportTopCorridors = ref<TopCorridorItem[]>([])
  const transportTransactions = ref<TransportTransactionItem[]>([])
  const transportTotalData = ref<number>(0)
  const transportTotalPages = ref<number>(1)
  const isTransportLoading = ref<boolean>(false)

  // ====================================================================
  // 3. ACTIONS
  // ====================================================================

  /**
   * Fetch Data Laporan Hotel
   */
  async function fetchHotelReport(): Promise<void> {
    isHotelLoading.value = true
    try {
      const response = await reportService.getHotelReport(hotelFilters.value)
      if (response && response.data) {
        hotelStats.value = response.data.stats
        hotelTransactions.value = response.data.transactions
        hotelTotalData.value = response.data.pagination.totalData
        hotelTotalPages.value = response.data.pagination.totalPages
      }
    } catch (error) {
      console.error('Gagal memuat laporan hotel:', error)
      throw error
    } finally {
      isHotelLoading.value = false
    }
  }

  /**
   * Fetch Data Laporan Transportasi
   */
  async function fetchTransportReport(): Promise<void> {
    isTransportLoading.value = true
    try {
      const response = await reportService.getTransportReport(transportFilters.value)
      if (response && response.data) {
        transportStats.value = response.data.stats
        transportCompositions.value = response.data.analytics.compositions
        transportTopCorridors.value = response.data.analytics.topCorridors
        transportTransactions.value = response.data.transactions
        transportTotalData.value = response.data.pagination.totalData
        transportTotalPages.value = response.data.pagination.totalPages
      }
    } catch (error) {
      console.error('Gagal memuat laporan transportasi:', error)
      throw error
    } finally {
      isTransportLoading.value = false
    }
  }

  /**
   * Reset Filter Hotel
   */
  async function resetHotelFilters(): Promise<void> {
    hotelFilters.value = {
      unitKerjaKode: '',
      cityId: null,
      searchCategory: 'hotelName',
      keyword: '',
      period: '2026-05',
      status: undefined,
      page: 1,
      limit: 10,
    }
    await fetchHotelReport()
  }

  /**
   * Reset Filter Transportasi
   */
  async function resetTransportFilters(): Promise<void> {
    transportFilters.value = {
      unitKerjaKode: '',
      budgetId: undefined,
      searchCategory: 'guestName',
      keyword: '',
      startDate: '',
      endDate: '',
      status: undefined,
      category: undefined,
      transportType: undefined,
      page: 1,
      limit: 10,
    }
    await fetchTransportReport()
  }

  return {
    // Hotel State & Actions
    hotelFilters,
    hotelStats,
    hotelTransactions,
    hotelTotalData,
    hotelTotalPages,
    isHotelLoading,
    fetchHotelReport,
    resetHotelFilters,

    // Transport State & Actions
    transportFilters,
    transportStats,
    transportCompositions,
    transportTopCorridors,
    transportTransactions,
    transportTotalData,
    transportTotalPages,
    isTransportLoading,
    fetchTransportReport,
    resetTransportFilters,
  }
})
