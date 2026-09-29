import { defineStore } from 'pinia'
import { ref } from 'vue'
import { budgetService } from '@/services/budgetService'
import type {
  BudgetItem,
  BudgetQueryParams,
  BudgetKpiStats,
  CreateBudgetPayload,
  UpdateBudgetPayload,
} from '@/models/budget'

export const useBudgetStore = defineStore('budget', () => {
  // ====================================================================
  // STATE
  // ====================================================================
  const filters = ref<BudgetQueryParams>({
    search: '',
    officeName: undefined,
    status: 'all',
    page: 1,
    limit: 10,
  })

  const stats = ref<BudgetKpiStats>({
    totalPaguDipa: 0,
    totalRealisasiIssued: 0,
    realisasiPercentage: '0.0',
    dalamProsesPersetujuan: 0,
    totalPengajuanCount: 0,
    persetujuanPercentage: '0.0',
    sisaSaldoPaguTersedia: 0,
    sisaPercentage: '0.0',
    totalAkunCoa: 0,
    totalUnitKerja: 0,
  })

  const budgets = ref<BudgetItem[]>([])
  const totalData = ref<number>(0)
  const totalPages = ref<number>(1)

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // ====================================================================
  // ACTIONS
  // ====================================================================

  /**
   * Memuat statistik KPI Header Pagu Anggaran
   */
  async function fetchStats(): Promise<void> {
    try {
      stats.value = await budgetService.getKpiStats()
    } catch (error) {
      console.error('Gagal memuat KPI stats anggaran:', error)
    }
  }

  /**
   * Memuat data tabel Mata Anggaran (MAK)
   */
  async function fetchBudgets(): Promise<void> {
    isLoading.value = true
    try {
      await fetchStats()
      const response = await budgetService.getBudgets(filters.value)
      budgets.value = response.data || []
      totalData.value = response.totalData || 0
      totalPages.value = response.totalPages || 1
    } catch (error) {
      console.error('Gagal memuat daftar Mata Anggaran:', error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Reset filter pencarian
   */
  async function resetFilters(): Promise<void> {
    filters.value = {
      search: '',
      officeName: undefined,
      status: 'all',
      page: 1,
      limit: 10,
    }
    await fetchBudgets()
  }

  /**
   * Tambah Mata Anggaran Baru
   */
  async function addBudget(payload: CreateBudgetPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await budgetService.createBudget(payload)
      await fetchBudgets()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Edit Mata Anggaran
   */
  async function editBudget(id: string, payload: UpdateBudgetPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await budgetService.updateBudget(id, payload)
      await fetchBudgets()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Hapus Mata Anggaran
   */
  async function removeBudget(id: string): Promise<void> {
    isLoading.value = true
    try {
      await budgetService.deleteBudget(id)
      await fetchBudgets()
    } finally {
      isLoading.value = false
    }
  }

  return {
    filters,
    stats,
    budgets,
    totalData,
    totalPages,
    isLoading,
    isSubmitting,
    fetchStats,
    fetchBudgets,
    resetFilters,
    addBudget,
    editBudget,
    removeBudget,
  }
})