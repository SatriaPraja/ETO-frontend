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
  const approvalLogs = ref<any[]>([])

  const transports = ref<EditTransportItem[]>([])
  const hotels = ref<EditHotelItem[]>([])

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  const orderDateFormatted = computed(() => {
    if (!orderDate.value) return '-'
    return new Date(orderDate.value).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  })

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

  function setFormData(data: any) {
    travelOrderId.value = data.id || data.travelOrderId || ''
    existingToOption.value = data.existingToOption || data.toCode || data.to_code || ''
    toCode.value = data.toCode || data.to_code || ''
    orderDate.value = formatDateForInput(data.orderDate || data.created_at || data.createdAt)
    sprinNumber.value = data.sprinNumber || data.sprin_number || ''
    activityName.value = data.activityName || data.activity_name || data.title || ''
    unitKerjaKode.value = data.unitKerjaKode || data.unit_kerja_kode || ''
    unitKerjaNama.value = data.unitKerjaNama || data.unit_kerja_nama || data.unitKerja || ''
    programKerja.value = data.programKerja || data.program_kerja || data.programName || ''
    budgetId.value = data.budgetId || data.budget_id || ''
    budgetAccountNumber.value = data.budgetAccountNumber || data.account_number || ''
    budgetAccountName.value = data.budgetAccountName || data.account_name || ''
    remainingBudget.value = Number(data.remainingBudget || data.pagu_budget || 0)
    sprinDetail.value = data.sprinDetail || data.sprin_detail || ''
    notes.value = '' // Booker notes diisi baru
    approverId.value = data.approverId || data.approver_id || ''
    approverNama.value = data.approverNama || data.approver_nama || data.approverName || ''
    approvalLogs.value = data.approvalLogs || data.approval_logs || []

    transports.value = data.transports ? [...data.transports] : []
    hotels.value = data.hotels ? [...data.hotels] : []
  }

  async function submitRevision() {
    if (!travelOrderId.value) throw new Error('ID Travel Order tidak ditemukan.')
    if (!notes.value.trim())
      throw new Error('Catatan penjelasan perbaikan (Booker Notes) wajib diisi.')

    isSubmitting.value = true
    try {
      const payload: UpdateTravelOrderPayload = {
        travelOrderId: travelOrderId.value,
        sprinNumber: sprinNumber.value,
        activityName: activityName.value,
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
    approvalLogs,
    transports,
    hotels,
    isLoading,
    isSubmitting,
    orderDateFormatted,
    totalTransportCost,
    totalHotelCost,
    grandTotalCost,
    setFormData,
    submitRevision,
  }
})
