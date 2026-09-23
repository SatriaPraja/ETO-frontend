export type TOStatusUI = 'Menunggu Persetujuan Pejabat' | 'Disetujui' | 'Perlu Koreksi'

export interface TransportBadge {
  type: 'flight' | 'train' | 'hotel' | 'bus' | 'car'
  label: string
}

export interface ExistingTOItem {
  id: string
  toCode: string
  status: TOStatusUI
  date: string
  title: string
  unitKerja: string
  bookerName: string
  bookerNpp: string
  totalEstimate: string
  transports: TransportBadge[]
}

export interface FetchExistingTOParams {
  search?: string
  status?: string
}

export type TransportType = 'flight' | 'train' | 'sea' | 'bus' | 'car' | 'hotel'

export interface TravellerItemPayload {
  category: 'INTERNAL' | 'EKSTERNAL'
transportType: TransportType
  userId?: string | null
  name: string
  npkOrKtp?: string | null
  jabatanOrInstansi?: string | null
  phone: string
  route?: string | null
  originCityId?: number | null
  destinationCityId?: number | null
  departureDate: string
  departureTime: string // Format: "08:30"
  departureInfo?: string | null
  maskapai?: string | null
  kelas?: string | null
  transportId?: number | null
  transportClassId?: number | null
  isRoundTrip: boolean
  returnDate?: string | null
  returnTime?: string | null // Format: "17:45"
  returnInfo?: string | null
  returnTransportId?: number | null
  returnTransportClassId?: number | null
  price: number
}

export interface CreateFlightOrderPayload {
  existingToOption?: string | null
  toCode?: string | null
  activityName: string
  unitKerjaKode?: string | null
  unitKerjaNama?: string | null
  programKerja?: string | null
  approverNama?: string | null
  approverId?: string | null
  budgetAccount?: string | null
  budgetId?: string | null
  sprinNumber: string
  sprinDetail: string
  notes?: string | null
  travellers: TravellerItemPayload[]
}

export interface FlightOrderResponse {
  success: boolean
  message: string
  data?: {
    id: string
    toCode: string
  }
}