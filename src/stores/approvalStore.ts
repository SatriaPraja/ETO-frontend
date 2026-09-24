import { defineStore } from 'pinia'
import { ref } from 'vue'

import { approvalService } from '@/services/approvalService'
import type { ApprovalCounts, ApprovalItem, UpdateStatusPayload } from '@/models/approval'
import axios from 'axios'

export const useApprovalStore = defineStore('approval', () => {
  const items = ref<ApprovalItem[]>([])
  const counts = ref<ApprovalCounts>({ pending: 0, history: 0 })
  const activeTab = ref<'pending' | 'history'>('pending')
  const searchQuery = ref<string>('')
  const selectedItem = ref<ApprovalItem | null>(null)

  // State untuk Detail Order
  const selectedDetail = ref<any | null>(null)
  const isDetailLoading = ref<boolean>(false)

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Fetch data list inbox dari API
  async function fetchInbox() {
    isLoading.value = true
    try {
      const res = await approvalService.getInbox(activeTab.value, searchQuery.value)
      items.value = res.data.items
      counts.value = res.data.counts

      // Auto-select item pertama jika ada
      const firstItem = items.value[0]
      selectedItem.value = firstItem ?? null

      // Ambil detail item pertama jika ada
      if (firstItem?.id) {
        await fetchOrderDetail(firstItem.id)
      } else {
        selectedDetail.value = null
      }
    } catch (error) {
      console.error('Gagal mengambil data inbox approval:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Fetch detail lengkap berdasarkan Nomor TO (misal: TO/2026/05/00187)
  async function fetchOrderDetail(toCodeStr: string) {
    if (!toCodeStr) return

    isDetailLoading.value = true
    try {
      const formattedCode = toCodeStr.replace(/\//g, '-')
      const res = await axios.get(`/api/history/${formattedCode}`)
      if (res.data?.success) {
        selectedDetail.value = res.data.data
      }
    } catch (error) {
      console.error('Gagal mengambil detail travel order:', error)
      selectedDetail.value = null
    } finally {
      isDetailLoading.value = false
    }
  }

  // Pilih kartu dari daftar & otomatis ambil detailnya
  async function selectItem(item: ApprovalItem) {
    selectedItem.value = item
    if (item.id) {
      await fetchOrderDetail(item.id)
    }
  }

  // Eksekusi perubahan status (Approve, Reject, Return)
  async function processApproval(payload: UpdateStatusPayload) {
    isSubmitting.value = true
    try {
      const res = await approvalService.updateStatus(payload)
      // Refresh data inbox setelah aksi sukses
      await fetchInbox()
      return res
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Gagal memperbarui status pengajuan')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    items,
    counts,
    activeTab,
    searchQuery,
    selectedItem,
    selectedDetail,
    isLoading,
    isDetailLoading,
    isSubmitting,
    fetchInbox,
    fetchOrderDetail,
    selectItem,
    processApproval,
  }
})
