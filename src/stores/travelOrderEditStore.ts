import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { travelOrderEditService } from '@/services/travelOrderEditService'
import type {
  UpdateTravelOrderPayload,
  EditTransportItem,
  EditHotelItem,
  EditHotelGuestItem,
} from '@/models/travelOrderEdit'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function sanitizeId(id?: string | null): string | undefined {
  if (id && UUID_REGEX.test(id.trim())) {
    return id.trim()
  }
  return undefined // Hapus ID UI sementara seperti "R1-BA"
}

export const useTravelOrderEditStore = defineStore('travelOrderEdit', () => {
  // State Utama Header
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

  // State Array Transports & Hotels
  const transports = ref<EditTransportItem[]>([])
  const hotels = ref<EditHotelItem[]>([])

  // State Status Loading
  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Computed Totals
  const totalTransportCost = computed(() => {
    return transports.value.reduce(
      (sum, item) => sum + Number(item.estimatedPrice || item.estimated_price || 0),
      0,
    )
  })

  const totalHotelCost = computed(() => {
    return hotels.value.reduce(
      (sum, item) => sum + Number(item.subtotalPrice || item.subtotal_price || 0),
      0,
    )
  })

  const grandTotalCost = computed(() => totalTransportCost.value + totalHotelCost.value)

  function formatDateForInput(dateStr?: string) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toISOString().split('T')[0] || ''
  }

  // 🟢 Memetakan Data Response API Backend secara presisi (CamelCase + Snake_Case Normalization)
  function setFormData(data: any) {
    if (!data) return

    travelOrderId.value = data.id || ''
    existingToOption.value = data.toCode || data.to_code || ''
    toCode.value = data.toCode || data.to_code || ''
    orderDate.value = formatDateForInput(data.orderDate || data.order_date || data.createdAt)
    sprinNumber.value = data.sprinNumber || data.sprin_number || ''
    activityName.value = data.activityName || data.activity_name || ''
    unitKerjaKode.value = data.unitKerjaKode || data.unit_kerja_kode || ''
    unitKerjaNama.value = data.unitKerjaNama || data.unit_kerja_nama || ''
    programKerja.value = data.programKerja || data.program_name || ''
    budgetId.value = data.budgetId || data.budget_id || ''
    budgetAccountNumber.value = data.budgetAccountNumber || data.account_number || ''
    budgetAccountName.value = data.budgetAccountName || data.account_name || ''
    remainingBudget.value = Number(data.remainingBudget || data.remaining_budget || 0)
    sprinDetail.value = data.sprinDetail || data.sprin_detail || ''
    notes.value = data.notes || ''
    approverId.value = data.approverId || data.approver_id || ''
    approverNama.value = data.approverNama || data.approver_nama || ''

    // Normalisasi Array Transports
    transports.value = Array.isArray(data.transports)
      ? data.transports.map((t: any) => ({
          id: t.id,
          transportType: t.transportType || t.transport_type || 'flight',
          category: t.category || 'INTERNAL',
          userId: t.userId || t.user_id || null,
          guestName: t.guestName || t.guest_name || '',
          npkOrKtp: t.npkOrKtp || t.npk_or_ktp || null,
          jabatan: t.jabatan || null,
          instansi: t.instansi || null,
          phone: t.phone || '',
          routeInfo: t.routeInfo || t.route_info || null,
          originCityId: t.originCityId || t.origin_city_id || null,
          destinationCityId: t.destinationCityId || t.destination_city_id || null,
          departureDate: formatDateForInput(t.departureDate || t.departure_date),
          departureTime: t.departureTime || t.departure_time || '08:00:00',
          maskapai: t.maskapai || null,
          kelas: t.kelas || null,
          isRoundTrip: Boolean(t.isRoundTrip ?? t.is_round_trip),
          returnDate: formatDateForInput(t.returnDate || t.return_date),
          returnTime: t.returnTime || t.return_time || null,
          returnMaskapai: t.returnMaskapai || t.return_maskapai || null,
          returnKelas: t.returnKelas || t.return_kelas || null,
          estimatedPrice: Number(t.estimatedPrice || t.estimated_price || 0),
        }))
      : []

    // Normalisasi Array Hotels & Guests
    hotels.value = Array.isArray(data.hotels)
      ? data.hotels.map((h: any) => ({
          id: h.id,
          hotelId: h.hotelId || h.hotel_id || null,
          hotelNameCustom: h.hotelNameCustom || h.hotel_name_custom || null,
          cityId: h.cityId || h.city_id || null,
          cityName: h.cityName || h.city_name || null,
          roomCount: Number(h.roomCount || h.room_count || 1),
          checkInDate: formatDateForInput(h.checkInDate || h.check_in_date),
          checkOutDate: formatDateForInput(h.checkOutDate || h.check_out_date),
          durationNights: Number(h.durationNights || h.duration_nights || 1),
          pricePerNight: Number(h.pricePerNight || h.price_per_night || 0),
          subtotalPrice: Number(h.subtotalPrice || h.subtotal_price || 0),
          guests: Array.isArray(h.guests)
            ? h.guests.map((g: any) => ({
                id: g.id,
                roomNumber: g.roomNumber || g.room_number || 'Kamar 01',
                bedSlot: g.bedSlot || g.bed_slot || 'Bed A',
                category: g.category || 'INTERNAL',
                userId: g.userId || g.user_id || null,
                guestName: g.guestName || g.guest_name || '',
                npkOrKtp: g.npkOrKtp || g.npk_or_ktp || null,
                jabatanOrInstansi: g.jabatanOrInstansi || g.jabatan_or_instansi || null,
                phone: g.phone || null,
                isFilled: Boolean(g.isFilled ?? g.is_filled ?? true),
              }))
            : [],
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
      // Sanitize ID pada Transports dan Hotels sebelum submit
      const sanitizedTransports = transports.value.map((t) => ({
        ...t,
        id: sanitizeId(t.id),
        userId: sanitizeId(t.userId),
      }))

      const sanitizedHotels = hotels.value.map((h) => ({
        ...h,
        id: sanitizeId(h.id),
        guests: (h.guests || []).map((g) => ({
          ...g,
          id: sanitizeId(g.id),
          userId: sanitizeId(g.userId),
        })),
      }))

      const payload: UpdateTravelOrderPayload = {
        travelOrderId: travelOrderId.value,
        sprinNumber: sprinNumber.value,
        activityName: activityName.value,
        unitKerjaNama: unitKerjaNama.value,
        budgetId: budgetId.value,
        sprinDetail: sprinDetail.value,
        notes: notes.value,
        transports: sanitizedTransports,
        hotels: sanitizedHotels,
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
