import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { HistoryService } from '@/services/historyService'
import type { HistoryOrderItem, HistoryPaginationMeta, HistoryFilterState } from '@/models/history'

export const useHistoryStore = defineStore('history', () => {
  // State Utama
  const items = ref<HistoryOrderItem[]>([])
  const meta = ref<HistoryPaginationMeta>({
    totalData: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  })
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')

  // State Filter Form & Pill Status Active
  const filters = ref<HistoryFilterState>({
    search: '',
    status: 'ALL',
    unitKerjaKode: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  })

  // Computed Counters untuk Kartu Info Atas
  const countTotal = computed(() => meta.value.totalData)
  const countWaiting = computed(() => items.value.filter((i) => i.status === 'WAITING_PEJABAT').length)
  const countApproved = computed(() => items.value.filter((i) => i.status === 'APPROVED').length)
  const countReturned = computed(() => items.value.filter((i) => i.status === 'RETURNED').length)

  // Actions
  async function loadHistory() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const res = await HistoryService.fetchHistory(filters.value)
      items.value = res.data
      meta.value = res.pagination
    } catch (err: any) {
      errorMessage.value = err.message || 'Terjadi kesalahan sistem saat memuat riwayat.'
    } finally {
      isLoading.value = false
    }
  }

  function setStatusFilter(status: string) {
    filters.value.status = status
    filters.value.page = 1
    loadHistory()
  }

  function setPage(page: number) {
    if (page < 1 || page > meta.value.totalPages) return
    filters.value.page = page
    loadHistory()
  }

  function resetFilters() {
    filters.value = {
      search: '',
      status: 'ALL',
      unitKerjaKode: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 10,
    }
    loadHistory()
  }

  return {
    items,
    meta,
    isLoading,
    errorMessage,
    filters,
    countTotal,
    countWaiting,
    countApproved,
    countReturned,
    loadHistory,
    setStatusFilter,
    setPage,
    resetFilters,
  }
})