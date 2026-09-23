import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ExistingTOItem } from '@/models/travelOrder'
import { TravelOrderService } from '@/services/travelOrderService'

export type TransportType = 'flight' | 'train' | 'sea' | 'bus' | 'car' | 'hotel'

// 1. Form Header State
export interface OrderFormState {
  existingToOption: string
  toCode: string
  orderDate: string
  activityName: string
  unitKerjaKode: string
  unitKerjaNama: string
  programKerja: string
  approverNama: string
  approverId: string
  budgetAccount: string
  budgetId: string
  sprinNumber: string
  sprinDetail: string
  notes: string
  remainingBudget: number
}

// 2. Transport Traveller Item
export interface TravellerItem {
  id: string
  transportType?: TransportType
  category: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  name: string
  npkOrKtp: string
  jabatanOrInstansi: string
  phone: string
  route: string
  originCityId?: number | null
  destinationCityId?: number | null
  departureDate: string
  departureTime: string
  departureInfo: string
  maskapai: string
  kelas?: string | null
  transportId?: number | null
  transportClassId?: number | null
  isRoundTrip: boolean
  returnDate?: string | null
  returnTime?: string | null
  returnInfo?: string | null
  returnMaskapai?: string | null
  returnKelas?: string | null
  returnTransportId?: number | null
  returnTransportClassId?: number | null
  price: number
}

// 3. Hotel & Guests Item
export interface HotelGuestItem {
  id?: string
  roomNumber: string
  bedSlot: string
  category: 'INTERNAL' | 'EKSTERNAL'
  userId?: string | null
  guestName: string
  npkOrKtp: string
  jabatanOrInstansi: string
  phone: string
  isFilled?: boolean
}

export interface HotelItem {
  id: string
  hotelId?: number | null
  hotelNameCustom: string
  cityId?: number | null
  cityName: string
  roomCount: number
  checkInDate: string
  checkOutDate: string
  durationNights: number
  pricePerNight: number
  subtotalPrice: number
  guests: HotelGuestItem[]
}

export const useOrderStore = defineStore('order', () => {
  // Navigation State
  const activeTransport = ref<TransportType>('flight')
  const isTransportAdded = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Existing TO Modal State
  const existingOrders = ref<ExistingTOItem[]>([])
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const searchQuery = ref<string>('')
  const selectedStatusFilter = ref<'ALL' | 'WAITING' | 'APPROVED' | 'CORRECTION'>('ALL')

  // Form Info Header
  const formInfo = ref<OrderFormState>({
    existingToOption: '',
    toCode: '',
    orderDate: '',
    activityName: '',
    unitKerjaKode: '',
    unitKerjaNama: '',
    programKerja: '',
    approverNama: '',
    approverId: '',
    budgetAccount: '',
    budgetId: '',
    sprinNumber: '',
    sprinDetail: '',
    notes: '',
    remainingBudget: 0,
  })

  // Cart Lists
  const travellers = ref<TravellerItem[]>([])
  const hotels = ref<HotelItem[]>([])

  // Computed Totals & Counters
  const countWaiting = computed(
    () => existingOrders.value.filter((i) => i.status === 'Menunggu Persetujuan Pejabat').length,
  )
  const countApproved = computed(
    () => existingOrders.value.filter((i) => i.status === 'Disetujui').length,
  )
  const countCorrection = computed(
    () => existingOrders.value.filter((i) => i.status === 'Perlu Koreksi').length,
  )

  const totalTransportCost = computed(() => {
    return travellers.value.reduce(
      (acc, curr) => acc + (curr.isRoundTrip ? curr.price * 2 : curr.price),
      0,
    )
  })

  const totalHotelCost = computed(() => {
    return hotels.value.reduce((acc, curr) => acc + curr.subtotalPrice, 0)
  })

  const totalCost = computed(() => totalTransportCost.value + totalHotelCost.value)

  const totalSegments = computed(() => {
    return travellers.value.reduce((acc, curr) => acc + (curr.isRoundTrip ? 2 : 1), 0)
  })

  // Actions Navigasi
  function setTransport(type: TransportType) {
    activeTransport.value = type
    return true
  }

  // Fetch Existing Orders dari API
  async function loadExistingOrders() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const params = new URLSearchParams()
      if (searchQuery.value) params.append('search', searchQuery.value)
      if (selectedStatusFilter.value !== 'ALL') params.append('status', selectedStatusFilter.value)

      const response = await fetch(`/api/travel-orders/existing?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      })

      const resData = await response.json()
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Gagal memuat daftar Travel Order Existing.')
      }

      existingOrders.value = resData.data
    } catch (err: any) {
      errorMessage.value = err.message || 'Terjadi kesalahan koneksi.'
    } finally {
      isLoading.value = false
    }
  }

  function setFilterStatus(status: 'ALL' | 'WAITING' | 'APPROVED' | 'CORRECTION') {
    selectedStatusFilter.value = status
    loadExistingOrders()
  }

  // Auto-fill dari Modal Pilih TO Existing
  function selectExistingTO(toItem: any) {
    formInfo.value.existingToOption = toItem.toCode
    formInfo.value.toCode = toItem.toCode
    formInfo.value.activityName = toItem.title || toItem.activityName
    formInfo.value.unitKerjaKode = toItem.unitKerjaKode || ''
    formInfo.value.unitKerjaNama = toItem.unitKerja
    formInfo.value.programKerja = toItem.programKerja || ''
    formInfo.value.approverId = toItem.approverId || ''
    formInfo.value.approverNama = toItem.approverNama || ''
    formInfo.value.budgetId = toItem.budgetId || ''
    formInfo.value.budgetAccount = toItem.budgetAccount || ''
    formInfo.value.remainingBudget = Number(toItem.remainingBudget) || 0
    formInfo.value.sprinNumber = toItem.sprinNumber || ''
    formInfo.value.sprinDetail = toItem.sprinDetail || ''
    formInfo.value.notes = toItem.notes || ''

    isTransportAdded.value = true
  }

  function addTraveller(item: Omit<TravellerItem, 'id'>) {
    const newItem: TravellerItem = {
      ...item,
      transportType: item.transportType || activeTransport.value,
      id: Date.now().toString(),
    }
    travellers.value.push(newItem)
    isTransportAdded.value = true
  }

  function removeTraveller(id: string) {
    travellers.value = travellers.value.filter((item) => item.id !== id)
    if (travellers.value.length === 0 && !formInfo.value.existingToOption) {
      isTransportAdded.value = false
    }
  }

  // Actions Manajemen Hotel
  function addHotel(item: Omit<HotelItem, 'id'>) {
    const newHotel: HotelItem = {
      ...item,
      id: Date.now().toString(),
      guests: item.guests || [],
    }
    hotels.value.push(newHotel)
  }

  function removeHotel(id: string) {
    hotels.value = hotels.value.filter((h) => h.id !== id)
  }

  // Action Update Alokasi Tamu/Penginap per Hotel
  function updateHotelGuests(hotelId: string, guestsList: HotelGuestItem[]) {
    const targetHotel = hotels.value.find((h) => h.id === hotelId)
    if (targetHotel) {
      targetHotel.guests = guestsList
    }
  }

  // Submit Tahap 1: Create Flight Order
  async function submitFlightOrder() {
    if (travellers.value.length === 0) {
      throw new Error('Mohon tambahkan minimal 1 personel / traveller penerbangan terlebih dahulu.')
    }

    isSubmitting.value = true
    try {
      const payload = {
        existingToOption: formInfo.value.existingToOption || null,
        toCode: formInfo.value.toCode || null,
        activityName: formInfo.value.activityName,
        unitKerjaKode: formInfo.value.unitKerjaKode || null,
        unitKerjaNama: formInfo.value.unitKerjaNama || null,
        programKerja: formInfo.value.programKerja || null,
        approverNama: formInfo.value.approverNama || null,
        approverId: formInfo.value.approverId || null,
        budgetAccount: formInfo.value.budgetAccount || null,
        budgetId: formInfo.value.budgetId || null,
        sprinNumber: formInfo.value.sprinNumber,
        sprinDetail: formInfo.value.sprinDetail,
        notes: formInfo.value.notes || null,
        travellers: travellers.value as any[],
      }

      const res = await TravelOrderService.submitFlightOrder(payload)

      if (res.data?.toCode) {
        formInfo.value.existingToOption = res.data.toCode
        formInfo.value.toCode = res.data.toCode
      }

      isTransportAdded.value = true
      activeTransport.value = 'hotel'

      return res
    } finally {
      isSubmitting.value = false
    }
  }

  // Submit Tahap 2: Add Hotel to Existing TO
  async function submitHotelOrder() {
    const targetToCode = formInfo.value.existingToOption || formInfo.value.toCode

    if (!targetToCode) {
      throw new Error('Kode Travel Order Existing wajib dipilih untuk memesan hotel.')
    }

    isSubmitting.value = true
    try {
      // 🟢 Sanitize data hotels & guests agar presisi sesuai contoh JSON
      const cleanHotelsPayload = hotels.value.map((hotel) => ({
        hotelId: hotel.hotelId || null,
        hotelNameCustom: hotel.hotelNameCustom,
        cityId: hotel.cityId || null,
        roomCount: hotel.roomCount,
        checkInDate: hotel.checkInDate,
        checkOutDate: hotel.checkOutDate,
        durationNights: hotel.durationNights,
        pricePerNight: hotel.pricePerNight,
        subtotalPrice: hotel.subtotalPrice,
        guests: (hotel.guests || [])
          .filter((g) => g.isFilled || g.guestName) // Hanya kirim guest yang terisi
          .map((g) => ({
            roomNumber: g.roomNumber,
            // Mengambil nilai "Bed A" / "Bed B" saja (membuang teks tambahan seperti "(Twin Bed)")
            bedSlot: g.bedSlot.split(' ')[0] + ' ' + (g.bedSlot.split(' ')[1] || 'A'),
            category: g.category || 'INTERNAL',
            userId: g.userId || null,
            guestName: g.guestName,
            npkOrKtp: g.npkOrKtp ? g.npkOrKtp.replace('NPK: ', '') : '',
            jabatanOrInstansi: g.jabatanOrInstansi,
            phone: g.phone || '',
          })),
      }))

      const response = await fetch('/api/travel-orders/hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          travelOrderId: targetToCode,
          hotels: cleanHotelsPayload,
        }),
      })

      const resData = await response.json()
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Gagal menambahkan reservasi hotel.')
      }

      return resData
    } finally {
      isSubmitting.value = false
    }
  }

  function resetForm() {
    formInfo.value = {
      existingToOption: '',
      toCode: '',
      orderDate: '',
      activityName: '',
      unitKerjaKode: '',
      unitKerjaNama: '',
      programKerja: '',
      approverNama: '',
      approverId: '',
      budgetAccount: '',
      budgetId: '',
      sprinNumber: '',
      sprinDetail: '',
      notes: '',
      remainingBudget: 0,
    }
    travellers.value = []
    hotels.value = []
    isTransportAdded.value = false
  }

  return {
    activeTransport,
    isTransportAdded,
    isSubmitting,
    existingOrders,
    isLoading,
    errorMessage,
    searchQuery,
    selectedStatusFilter,
    countWaiting,
    countApproved,
    countCorrection,
    formInfo,
    travellers,
    hotels,
    totalTransportCost,
    totalHotelCost,
    totalCost,
    totalSegments,
    setTransport,
    loadExistingOrders,
    setFilterStatus,
    selectExistingTO,
    addTraveller,
    removeTraveller,
    addHotel,
    removeHotel,
    updateHotelGuests,
    submitFlightOrder,
    submitHotelOrder,
    resetForm,
  }
})
