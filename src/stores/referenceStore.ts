import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApproverItem, BudgetItem } from '@/models/reference'
import { ReferenceService } from '@/services/referenceService'

export const useReferenceStore = defineStore('reference', () => {
  // State Approvers
  const approvers = ref<ApproverItem[]>([])
  const isApproversLoading = ref(false)
  const approversError = ref('')

  // State Budgets
  const budgets = ref<BudgetItem[]>([])
  const isBudgetsLoading = ref(false)
  const budgetsError = ref('')

  // Action Fetch Approvers
  // Action Fetch Approvers
  async function loadApprovers(searchQuery?: string) {
    isApproversLoading.value = true
    approversError.value = ''
    try {
      approvers.value = await ReferenceService.fetchApprovers(searchQuery)
    } catch (err: any) {
      approversError.value = err.message || 'Terjadi kesalahan saat memuat data penyetuju.'
    } finally {
      // 👈 Pastikan tidak ada teks 'font-headline' di sini
      isApproversLoading.value = false
    }
  }

  // Action Fetch Budgets
  async function loadBudgets(searchQuery?: string) {
    isBudgetsLoading.value = true
    budgetsError.value = ''
    try {
      budgets.value = await ReferenceService.fetchBudgets(searchQuery)
    } catch (err: any) {
      budgetsError.value = err.message || 'Terjadi kesalahan saat memuat data anggaran.'
    } finally {
      isBudgetsLoading.value = false
    }
  }

  return {
    approvers,
    isApproversLoading,
    approversError,
    budgets,
    isBudgetsLoading,
    budgetsError,
    loadApprovers,
    loadBudgets,
  }
})
