import { defineStore } from 'pinia'
import { ref } from 'vue'
import { vendorService } from '@/services/vendorService'
import type {
  VendorQueryParams,
  VendorItem,
  VendorKpiStats,
  VendorDistributionItem,
  CreateVendorPayload,
  UpdateVendorPayload,
} from '@/models/vendor'

export const useVendorStore = defineStore('vendor', () => {
  // ====================================================================
  // STATE
  // ====================================================================
  const filters = ref<VendorQueryParams>({
    search: '',
    type: undefined,
    status: 'all',
    page: 1,
    limit: 10,
  })

  const stats = ref<VendorKpiStats>({
    totalVendor: 0,
    activeVendor: 0,
    inactiveVendor: 0,
    apiLive: 0,
    perluPembaharuan: 0,
    topModa: {
      type: 'flight',
      count: 0,
    },
  })

  const distributions = ref<VendorDistributionItem[]>([])
  const vendors = ref<VendorItem[]>([])
  const totalData = ref<number>(0)
  const totalPages = ref<number>(1)

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // ====================================================================
  // ACTIONS
  // ====================================================================

  /**
   * Memuat data dashboard & tabel vendor
   */
  async function fetchVendors(): Promise<void> {
    isLoading.value = true
    try {
      const response = await vendorService.getVendors(filters.value)
      if (response && response.data) {
        stats.value = response.data.stats
        distributions.value = response.data.distribution
        vendors.value = response.data.vendors
        totalData.value = response.data.pagination.totalData
        totalPages.value = response.data.pagination.totalPages
      }
    } catch (error) {
      console.error('Gagal memuat data vendor/maskapai:', error)
      throw error
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
      type: undefined,
      status: 'all',
      page: 1,
      limit: 10,
    }
    await fetchVendors()
  }

  /**
   * Tambah Vendor Baru
   */
  async function addVendor(payload: CreateVendorPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await vendorService.createVendor(payload)
      await fetchVendors()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Edit Vendor
   */
  async function editVendor(id: number, payload: UpdateVendorPayload): Promise<void> {
    isSubmitting.value = true
    try {
      await vendorService.updateVendor(id, payload)
      await fetchVendors()
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Hapus Vendor
   */
  async function removeVendor(id: number): Promise<void> {
    isLoading.value = true
    try {
      await vendorService.deleteVendor(id)
      await fetchVendors()
    } finally {
      isLoading.value = false
    }
  }

  return {
    filters,
    stats,
    distributions,
    vendors,
    totalData,
    totalPages,
    isLoading,
    isSubmitting,
    fetchVendors,
    resetFilters,
    addVendor,
    editVendor,
    removeVendor,
  }
})