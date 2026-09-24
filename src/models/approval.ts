export interface ApprovalItem {
  id: string
  rawId: string
  title: string
  submitter: string
  unit: string
  timeAgo: string
  typeIcon: string
  typeColor: string
  travelerCount: string
  amount: string
  statusText: string
  status: string
}

export interface ApprovalCounts {
  pending: number
  history: number
}

export interface InboxResponse {
  success: boolean
  message: string
  data: {
    items: ApprovalItem[]
    counts: ApprovalCounts
  }
}

export interface UpdateStatusPayload {
  travelOrderId: string
  status: 'WAITING_PEJABAT' | 'WAITING_ADMINTRAVEL' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'CANCELLED'
  notes?: string
}