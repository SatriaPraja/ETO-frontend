import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface TravelOrder {
  id: string
  code: string
  type: 'flight' | 'train' | 'sea' | 'bus' | 'car' | 'hotel'
  subType: string
  title: string
  unit: string
  date: string
  time: string
  travellersCount: number
  status: 'pending' | 'approved' | 'returned' | 'rejected'
}

export const useDashboardStore = defineStore('dashboard', () => {
  const searchQuery = ref('')
  const activeFilter = ref<string>('all')

  const orders = ref<TravelOrder[]>([
    {
      id: '1',
      code: 'TO/2026/05/00187',
      type: 'flight',
      subType: 'Tiket PP • Garuda',
      title: 'Rapat Koordinasi Nasional Kepesertaan 2026',
      unit: 'Kantor Cabang Jakarta Menara Jamsostek',
      date: '18 Mei 2026',
      time: '08:45 WIB',
      travellersCount: 3,
      status: 'pending'
    },
    {
      id: '2',
      code: 'TO/2026/05/00185',
      type: 'train',
      subType: 'Taksaka Eksekutif',
      title: 'Sosialisasi Jaminan Kehilangan Pekerjaan (JKP)',
      unit: 'Kantor Wilayah DIY & Jawa Tengah',
      date: '16 Mei 2026',
      time: '14:20 WIB',
      travellersCount: 2,
      status: 'approved'
    },
    {
      id: '3',
      code: 'TO/2026/05/00179',
      type: 'hotel',
      subType: 'Hotel Aryaduta 3 Malam',
      title: 'Pendampingan Audit Eksternal BPK RI',
      unit: 'Divisi Keuangan & Akuntansi Kantor Pusat',
      date: '15 Mei 2026',
      time: '11:05 WIB',
      travellersCount: 1,
      status: 'returned'
    },
    {
      id: '4',
      code: 'TO/2026/05/00171',
      type: 'car',
      subType: 'Avanza Dinas + BBM',
      title: 'Survey Lapangan Verifikasi Klaim JKK Kecelakaan Kerja',
      unit: 'Kantor Cabang Pratama Cikarang',
      date: '12 Mei 2026',
      time: '16:30 WIB',
      travellersCount: 4,
      status: 'rejected'
    },
    {
      id: '5',
      code: 'TO/2026/05/00168',
      type: 'sea',
      subType: 'KM Sinabung Kelas 1',
      title: 'Kunjungan Kerja Wilayah Terluar & Pesisir Maluku',
      unit: 'Kantor Cabang Ambon',
      date: '09 Mei 2026',
      time: '09:12 WIB',
      travellersCount: 5,
      status: 'approved'
    }
  ])

  const filteredOrders = computed(() => {
    return orders.value.filter(order => {
      const matchesSearch =
        order.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        order.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        order.unit.toLowerCase().includes(searchQuery.value.toLowerCase())

      if (activeFilter.value === 'all') return matchesSearch
      return matchesSearch && order.status === activeFilter.value
    })
  })

  function setFilter(filter: string) {
    activeFilter.value = filter
  }

  return {
    searchQuery,
    activeFilter,
    orders,
    filteredOrders,
    setFilter
  }
})