import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { travelOrderEditService } from '@/services/travelOrderEditService'
import type {
  UpdateTravelOrderPayload,
  EditTransportItem,
  EditHotelItem,
} from '@/models/travelOrderEdit'

export const useTravelOrderEditStore = defineStore('travelOrderEdit', () => {
  const travelOrderId = ref<string>('')
  const existingToOption = ref<string>('')
  const toCode = ref<string>('')
  const orderDate = ref<string>('')
  const sprinNumber = ref<string>('')
  const activityName = ref<string>('')
  const unitKerjaKode = ref<string>('')
  const unitKerjaNama = ref<string>('')
  const programKerja = ref<string>('')
  const budgetId = ref<string>('')
  const budgetAccountNumber = ref<string>('')
  const budgetAccountName = ref<string>('')
  const remainingBudget = ref<number>(0)
  const sprinDetail = ref<string>('')
  const notes = ref<string>('')
  const approverId = ref<string>('')
  const approverNama = ref<string>('')

  const transports = ref<EditTransportItem[]>([])
  const hotels = ref<EditHotelItem[]>([])

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  const totalTransportCost = computed(() => {
    return transports.value.reduce((sum, item) => sum + Number(item.estimatedPrice || 0), 0)
  })

  const totalHotelCost = computed(() => {
    return hotels.value.reduce((sum, item) => sum + Number(item.subtotalPrice || 0), 0)
  })

  const grandTotalCost = computed(() => totalTransportCost.value + totalHotelCost.value)

  function formatDateForInput(dateStr?: string) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toISOString().split('T')[0] || ''
  }

  // 🟢 Memetakan Data Response API Backend secara presisi
  function setFormData(data: any) {
    if (!data) return

    travelOrderId.value = data.id || ''
    existingToOption.value = data.toCode || ''
    toCode.value = data.toCode || ''
    orderDate.value = formatDateForInput(data.orderDate || data.createdAt)
    sprinNumber.value = data.sprinNumber || ''
    activityName.value = data.activityName || ''
    unitKerjaKode.value = data.unitKerjaKode || ''
    unitKerjaNama.value = data.unitKerjaNama || ''
    programKerja.value = data.programKerja || ''
    budgetId.value = data.budgetId || ''
    budgetAccountNumber.value = data.budgetAccountNumber || ''
    budgetAccountName.value = data.budgetAccountName || ''
    remainingBudget.value = Number(data.remainingBudget || 0)
    sprinDetail.value = data.sprinDetail || ''
    notes.value = data.notes || ''
    approverId.value = data.approverId || ''
    approverNama.value = data.approverNama || ''

    transports.value = Array.isArray(data.transports)
      ? data.transports.map((t: any) => ({
          ...t,
          estimatedPrice: Number(t.estimatedPrice || 0),
        }))
      : []

    hotels.value = Array.isArray(data.hotels)
      ? data.hotels.map((h: any) => ({
          ...h,
          pricePerNight: Number(h.pricePerNight || 0),
          subtotalPrice: Number(h.subtotalPrice || 0),
          guests: Array.isArray(h.guests) ? h.guests : [],
        }))
      : []
  }
  async function fetchCorrectionData(identifier: string) {
    isLoading.value = true
    try {
      const response = await travelOrderEditService.getOrderForCorrection(identifier)
      if (response && response.data) {
        setFormData(response.data)
      }
    } catch (error) {
      console.error('Gagal mengambil data koreksi:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function submitRevision() {
    if (!travelOrderId.value) throw new Error('ID Travel Order tidak ditemukan.')
    if (!notes.value.trim()) {
      throw new Error('Catatan penjelasan perbaikan (Booker Notes) wajib diisi.')
    }

    isSubmitting.value = true
    try {
      const payload: UpdateTravelOrderPayload = {
        travelOrderId: travelOrderId.value,
        sprinNumber: sprinNumber.value,
        activityName: activityName.value,
        unitKerjaNama: unitKerjaNama.value,
        budgetId: budgetId.value,
        sprinDetail: sprinDetail.value,
        notes: notes.value,
        transports: transports.value,
        hotels: hotels.value,
      }

      return await travelOrderEditService.updateAndResubmitOrder(payload)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    travelOrderId,
    existingToOption,
    toCode,
    orderDate,
    sprinNumber,
    activityName,
    unitKerjaKode,
    unitKerjaNama,
    programKerja,
    budgetId,
    budgetAccountNumber,
    budgetAccountName,
    remainingBudget,
    sprinDetail,
    notes,
    approverId,
    approverNama,
    transports,
    hotels,
    isLoading,
    isSubmitting,
    totalTransportCost,
    totalHotelCost,
    grandTotalCost,
    setFormData,
    fetchCorrectionData,
    submitRevision,
  }
})
