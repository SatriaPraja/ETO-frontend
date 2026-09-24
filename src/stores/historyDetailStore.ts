import { defineStore } from 'pinia'
import { ref } from 'vue'
import { HistoryDetailService } from '@/services/historyDetailService'
import type { TravelOrderDetail } from '@/models/historyDetail'

export const useHistoryDetailStore = defineStore('historyDetail', () => {
  const detail = ref<TravelOrderDetail | null>(null)
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')

  async function loadOrderDetail(toCode: string) {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const res = await HistoryDetailService.fetchOrderDetail(toCode)
      detail.value = res.data
    } catch (err: any) {
      errorMessage.value = err.message || 'Terjadi kesalahan saat memuat detail order.'
    } finally {
      isLoading.value = false
    }
  }

  function clearDetail() {
    detail.value = null
    errorMessage.value = ''
  }

  return {
    detail,
    isLoading,
    errorMessage,
    loadOrderDetail,
    clearDetail,
  }
})