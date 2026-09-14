import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TransportType = 'flight' | 'train' | 'sea' | 'bus' | 'car' | 'hotel'

export interface OrderFormState {
  toExisting: string
  toCode: string
  orderDate: string
  activityName: string
  workUnit: string
  programName: string
  approver: string
  budgetAccount: string
  sprinNumber: string
  sprinDetail: string
  notes: string
}

export interface TravellerItem {
  id: string
  name: string
  npk: string
  position: string
  phone: string
  route: string
  schedule: string
  vendorClass: string
  isRoundTrip: boolean
}

export const useOrderStore = defineStore('order', () => {
  const activeTransport = ref<TransportType>('flight')
  const isTransportAdded = ref<boolean>(false) // Flag penanda apakah transport sudah ditambahkan

  const formInfo = ref<OrderFormState>({
    toExisting: '',
    toCode: 'TO/2026/05/00214',
    orderDate: '14 Mei 2026',
    activityName: 'Sosialisasi Program Jaminan Kehilangan Pekerjaan (JKP) Wilayah Jawa Timur',
    workUnit: 'Deputi Direktur Wilayah Jawa Timur',
    programName: 'Peningkatan Kepesertaan Aktif Sektor Formal 2026',
    approver: 'Dr. Ir. Budi Santoso, M.M. (Kakanwil)',
    budgetAccount: '521211 - Belanja Perjalanan Dinas Biasa',
    sprinNumber: 'SPRIN/442/DIR-OPS/V/2026',
    sprinDetail: 'Koordinasi teknis penanganan klaim JKP dan verifikasi data peserta bersama dinas tenaga kerja setempat.',
    notes: ''
  })

  const travellers = ref<TravellerItem[]>([
    {
      id: '1',
      name: 'Rian Hidayat',
      npk: '198804122011',
      position: 'Penata Madya Pengendalian Mutu',
      phone: '081234567890',
      route: 'JKT (CGK) ⇄ SUB',
      schedule: "20 Mei '26 (08:30) - 22 Mei '26 (17:45)",
      vendorClass: 'Garuda Indonesia (Ekonomi Y)',
      isRoundTrip: true
    },
    {
      id: '2',
      name: 'Siti Rahma Wulandari',
      npk: '199209152016',
      position: 'Analis Layanan Klaim JKP',
      phone: '081388992211',
      route: 'JKT (HLP) ⇄ SUB',
      schedule: "20 Mei '26 (09:15) - 22 Mei '26 (18:20)",
      vendorClass: 'Batik Air (Ekonomi Fleksibel)',
      isRoundTrip: true
    }
  ])

  function setTransport(type: TransportType) {
    // Validasi: Cegah masuk ke hotel jika transportasi belum ditambahkan
    if (type === 'hotel' && !isTransportAdded.value) {
      alert('Silakan tambahkan pemesanan transportasi terlebih dahulu sebelum memesan hotel!')
      return false
    }
    activeTransport.value = type
    return true
  }

  function markTransportAdded() {
    isTransportAdded.value = true
  }

  function removeTraveller(id: string) {
    travellers.value = travellers.value.filter(item => item.id !== id)
  }

  return {
    activeTransport,
    isTransportAdded,
    formInfo,
    travellers,
    setTransport,
    markTransportAdded,
    removeTraveller
  }
})