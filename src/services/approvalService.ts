import type { InboxResponse, UpdateStatusPayload } from "@/models/approval"
import axios from "axios"


export const approvalService = {
  // Ambil daftar Inbox (Pending & History)
  async getInbox(tab: string = 'pending', search: string = ''): Promise<InboxResponse> {
    const response = await axios.get<InboxResponse>('/api/approval/inbox', {
      params: { tab, search }
    })
    return response.data
  },

  // Update Status Approval (Approve / Return / Reject / Cancel)
  async updateStatus(payload: UpdateStatusPayload) {
    const response = await axios.post('/api/approval/status', payload)
    return response.data
  }
}