
import type { UpdateTravelOrderPayload, UpdateTravelOrderResponse } from '@/models/travelOrderEdit'
import axios from 'axios'

export const travelOrderEditService = {
  /**
   * Mengirim perbaikan/koreksi Travel Order (Transport & Hotel) ke backend
   * Endpoint: PUT /api/travel-order/:id
   */
  async updateAndResubmitOrder(
    payload: UpdateTravelOrderPayload
  ): Promise<UpdateTravelOrderResponse> {
    const response = await axios.put<UpdateTravelOrderResponse>(
      `/api/travel-order/${payload.travelOrderId}`,
      payload
    )
    return response.data
  }
}