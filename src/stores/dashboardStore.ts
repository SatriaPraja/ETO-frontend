import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dashboardService } from '@/services/dashboardService'
import type {
  DashboardQueryParams,
  DashboardKpiStats,
  OngoingTraveller,
  DashboardBudgetSummary,
  RecentOrderItem,
  DashboardPaginationMeta,
} from '@/models/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // ====================================================================
  // STATE
  // ====================================================================
  const filters = ref<DashboardQueryParams>({
    search: '',
    status: 'ALL',
    limit: 5,
    page: 1,
    monthYear: undefined,
  })

  const kpiStats = ref<DashboardKpiStats>({
    waitingCount: 0,
    approvedThisMonthCount: 0,
    returnedCount: 0,
    rejectedCount: 0,
  })

  const ongoingTravellers = ref<OngoingTraveller[]>([])

  const budgetSummary = ref<DashboardBudgetSummary>({
    paguTotal: 0,
    realisasi: 0,
    pending: 0,
    sisa: 0,
    percentageTerpakai: 0,
  })

  const recentOrders = ref<RecentOrderItem[]>([])

  const meta = ref<DashboardPaginationMeta>({
    totalData: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 5,
  })

  const isLoading = ref<boolean>(false)

  // ====================================================================
  // ACTIONS
  // ====================================================================

  /**
   * Memuat seluruh data ringkasan dashboard sesuai filter aktif
   */
  async function fetchOverview(): Promise<void> {
    isLoading.value = true
    try {
      const data = await dashboardService.getOverview(filters.value)
      kpiStats.value = data.kpiStats || {
        waitingCount: 0,
        approvedThisMonthCount: 0,
        returnedCount: 0,
        rejectedCount: 0,
      }
      ongoingTravellers.value = data.ongoingTravellers || []
      budgetSummary.value = data.budgetSummary || {
        paguTotal: 0,
        realisasi: 0,
        pending: 0,
        sisa: 0,
        percentageTerpakai: 0,
      }
      recentOrders.value = data.recentOrders || []
      meta.value = data.meta || {
        totalData: 0,
        currentPage: 1,
        totalPages: 1,
        limit: 5,
      }
    } catch (error) {
      console.error('Gagal memuat data overview dashboard:', error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mengubah status filter pengajuan (Semua, Menunggu, Disetujui, Perlu Revisi)
   */
  async function setStatusFilter(status: DashboardQueryParams['status']): Promise<void> {
    filters.value.status = status
    filters.value.page = 1
    await fetchOverview()
  }

  /**
   * Melakukan pencarian berdasarkan kata kunci
   */
  async function setSearchQuery(searchStr: string): Promise<void> {
    filters.value.search = searchStr
    filters.value.page = 1
    await fetchOverview()
  }

  /**
   * Berpindah halaman pagination pada tabel Pengajuan Terakhir
   */
  async function changePage(newPage: number): Promise<void> {
    if (newPage >= 1 && newPage <= meta.value.totalPages) {
      filters.value.page = newPage
      await fetchOverview()
    }
  }

  /**
   * Reset seluruh filter ke kondisi bawaan
   */
  async function resetFilters(): Promise<void> {
    filters.value = {
      search: '',
      status: 'ALL',
      limit: 5,
      page: 1,
      monthYear: undefined,
    }
    await fetchOverview()
  }

  return {
    filters,
    kpiStats,
    ongoingTravellers,
    budgetSummary,
    recentOrders,
    meta,
    isLoading,
    fetchOverview,
    setStatusFilter,
    setSearchQuery,
    changePage,
    resetFilters,
  }
})