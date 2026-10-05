import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ExistingTOItem, TransportType } from '@/models/travelOrder'
import { TravelOrderService } from '@/services/travelOrderService'
export type { TransportType }

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

  // Draf Info State
  const lastSavedTime = ref<string>('Diperbarui baru saja')

  const draftCode = computed(() => {
    if (formInfo.value.existingToOption || formInfo.value.toCode) {
      return formInfo.value.existingToOption || formInfo.value.toCode
    }
    return activeTransport.value === 'hotel' ? 'Draft-HTL-089' : 'Draft-ORD-052'
  })

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
      const data = await TravelOrderService.fetchExistingOrders({
        search: searchQuery.value,
        status: selectedStatusFilter.value,
      })
      existingOrders.value = data
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
  function selectExistingTO(toItem: ExistingTOItem) {
    formInfo.value.existingToOption = toItem.toCode
    formInfo.value.toCode = toItem.toCode
    formInfo.value.activityName = toItem.title
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

  function updateHotelGuests(hotelId: string, guestsList: HotelGuestItem[]) {
    const targetHotel = hotels.value.find((h) => h.id === hotelId)
    if (targetHotel) {
      targetHotel.guests = guestsList
    }
  }

  // 🟢 ACTION 1: BUAT HEADER TRAVEL ORDER STANDALONE
  async function submitTravelOrderHeader() {
    if (
      !formInfo.value.activityName ||
      !formInfo.value.sprinNumber ||
      !formInfo.value.sprinDetail
    ) {
      throw new Error('Mohon lengkapi Informasi Kegiatan dan Surat Perintah terlebih dahulu.')
    }
    if (!formInfo.value.approverId || !formInfo.value.budgetId) {
      throw new Error('Pejabat Penyetuju dan Mata Anggaran wajib dipilih.')
    }

    isSubmitting.value = true
    try {
      const payload = {
        toCode: formInfo.value.toCode || null,
        activityName: formInfo.value.activityName,
        unitKerjaKode: formInfo.value.unitKerjaKode || null,
        unitKerjaNama: formInfo.value.unitKerjaNama || null,
        programKerja: formInfo.value.programKerja || null,
        approverId: formInfo.value.approverId,
        budgetId: formInfo.value.budgetId,
        sprinNumber: formInfo.value.sprinNumber,
        sprinDetail: formInfo.value.sprinDetail,
        notes: formInfo.value.notes || null,
      }

      const res = await TravelOrderService.createTravelOrderHeader(payload)

      if (res.data?.to_code) {
        formInfo.value.existingToOption = res.data.to_code
        formInfo.value.toCode = res.data.to_code
      }

      isTransportAdded.value = true
      return res
    } finally {
      isSubmitting.value = false
    }
  }

  // 🟢 ACTION 2: TAMBAH TRANSPORTASI KE TRAVEL ORDER EXISTING
  async function submitTransportOrder() {
    const targetToCode = formInfo.value.existingToOption || formInfo.value.toCode

    if (!targetToCode) {
      throw new Error(
        'Mohon pilih/buat Travel Order Existing terlebih dahulu sebelum menambahkan transportasi.',
      )
    }

    if (travellers.value.length === 0) {
      throw new Error(
        'Mohon tambahkan minimal 1 personel / traveller transportasi terlebih dahulu.',
      )
    }

    isSubmitting.value = true
    try {
      const payload = {
        travelOrderId: targetToCode,
        travellers: travellers.value.map((t) => ({
          category: t.category,
          transportType: t.transportType || activeTransport.value,
          userId: t.userId || null,
          name: t.name,
          npkOrKtp: t.npkOrKtp || null,
          jabatanOrInstansi: t.jabatanOrInstansi || null,
          phone: t.phone,
          route: t.route || null,
          originCityId: t.originCityId || null,
          destinationCityId: t.destinationCityId || null,
          departureDate: t.departureDate,
          departureTime: t.departureTime,
          departureInfo: t.departureInfo || null,
          maskapai: t.maskapai || null,
          kelas: t.kelas || null,
          transportId: t.transportId || null,
          transportClassId: t.transportClassId || null,
          isRoundTrip: t.isRoundTrip,
          returnDate: t.returnDate || null,
          returnTime: t.returnTime || null,
          returnInfo: t.returnInfo || null,
          returnMaskapai: t.returnMaskapai || null,
          returnKelas: t.returnKelas || null,
          returnTransportId: t.returnTransportId || null,
          returnTransportClassId: t.returnTransportClassId || null,
          price: t.price || 0,
        })),
      }

      const res = await TravelOrderService.addTransportOrder(payload)
      activeTransport.value = 'hotel'
      return res
    } finally {
      isSubmitting.value = false
    }
  }
  // 🟢 ACTION 3: TAMBAH HOTEL KE TRAVEL ORDER EXISTING
  async function submitHotelOrder() {
    const targetToCode = formInfo.value.existingToOption || formInfo.value.toCode

    if (!targetToCode) {
      throw new Error('Kode Travel Order Existing wajib dipilih untuk memesan hotel.')
    }

    if (hotels.value.length === 0) {
      throw new Error('Mohon tambahkan minimal 1 reservasi hotel terlebih dahulu.')
    }

    // 🟢 VALIDASI BARU: Cek apakah ada hotel yang data penginapnya masih kosong
    for (const [index, hotel] of hotels.value.entries()) {
      const validGuests = (hotel.guests || []).filter((g) => g.isFilled || g.guestName)
      if (validGuests.length === 0) {
        throw new Error(
          `Hotel ke-${index + 1} (${hotel.hotelNameCustom}) belum memiliki data penginap/tamu. Silakan klik "Isi Data Penginap" terlebih dahulu.`,
        )
      }
    }

    isSubmitting.value = true
    try {
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
          .filter((g) => g.isFilled || g.guestName)
          .map((g) => ({
            roomNumber: g.roomNumber,
            bedSlot: g.bedSlot,
            category: g.category || 'INTERNAL',
            userId: g.userId || null,
            guestName: g.guestName,
            npkOrKtp: g.npkOrKtp ? g.npkOrKtp.replace('NPK: ', '') : '',
            jabatanOrInstansi: g.jabatanOrInstansi,
            phone: g.phone || '',
          })),
      }))

      const res = await TravelOrderService.addHotelOrder({
        travelOrderId: targetToCode,
        hotels: cleanHotelsPayload,
      })

      return res
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
    draftCode,
    lastSavedTime,
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
    submitTravelOrderHeader,
    submitTransportOrder,
    submitHotelOrder,
    resetForm,
  }
})
