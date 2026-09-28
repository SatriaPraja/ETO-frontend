// ====================================================================
// A. LAPORAN HOTEL / AKOMODASI
// ====================================================================

export interface ReportHotelQueryParams {
  unitKerjaKode?: string
  cityId?: number | null
  searchCategory?: 'hotelName' | 'guestName' | 'toCode'
  keyword?: string
  period?: string // Format: YYYY-MM (e.g. "2026-05")
  status?: 'WAITING_PEJABAT' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'CANCELLED'
  page?: number
  limit?: number
}

export interface HotelReportStats {
  totalReservasi: number
  totalKamar: number
  totalRoomNights: number
  totalBebanHotel: number
  rataRataTarifMalam: number
  rataRataMalam: number
  rasioKamarPerReservasi: number
}

export interface HotelTransactionItem {
  id: string
  toCode: string
  hotelName: string
  starRating?: number | null
  cityName: string
  checkInDate: string
  checkOutDate: string
  durationNights: number
  roomCount: number
  pricePerNight: number
  subtotalPrice: number
}

export interface GetHotelReportResponse {
  success: boolean
  message: string
  data: {
    stats: HotelReportStats
    pagination: {
      totalData: number
      page: number
      limit: number
      totalPages: number
    }
    transactions: HotelTransactionItem[]
  }
}

// ====================================================================
// B. LAPORAN TRANSPORTASI
// ====================================================================

export interface ReportTransportQueryParams {
  unitKerjaKode?: string
  budgetId?: string
  searchCategory?: 'guestName' | 'npk' | 'toCode'
  keyword?: string
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
  status?: 'WAITING_PEJABAT' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'CANCELLED'
  category?: 'INTERNAL' | 'EKSTERNAL'
  transportType?: 'flight' | 'train' | 'sea' | 'bus' | 'car'
  page?: number
  limit?: number
}

export interface TransportReportStats {
  totalPengajuan: number
  disetujuiResmi: number
  menunggu: number
  ditolak: number
  totalPersonel: number
  internalBPJS: number
  eksternalTamu: number
  realisasiAnggaran: number
}

export interface TransportCompositionItem {
  transportType: 'flight' | 'train' | 'sea' | 'bus' | 'car'
  count: number
  percentage: number
}

export interface TopCorridorItem {
  route: string
  volumePersonel: number
}

export interface TransportTransactionItem {
  id: string
  tglRekam: string
  toCode: string
  guestName: string
  npkOrKtp?: string | null
  jabatan?: string | null
  category: 'INTERNAL' | 'EKSTERNAL'
  routeInfo: string
  departureDate: string
  returnDate?: string | null
  isRoundTrip: boolean
  transportType: 'flight' | 'train' | 'sea' | 'bus' | 'car'
  maskapai?: string | null
  estimatedPrice: number
}

export interface GetTransportReportResponse {
  success: boolean
  message: string
  data: {
    stats: TransportReportStats
    analytics: {
      compositions: TransportCompositionItem[]
      topCorridors: TopCorridorItem[]
    }
    pagination: {
      totalData: number
      page: number
      limit: number
      totalPages: number
    }
    transactions: TransportTransactionItem[]
  }
}