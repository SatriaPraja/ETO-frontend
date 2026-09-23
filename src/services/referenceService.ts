// src/services/referenceService.ts
import type { ApproverItem, BudgetItem } from '@/models/reference'

export class ReferenceService {
  private static getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  // 🟢 Tambahkan /travel-orders pada path URL
  static async fetchApprovers(search?: string): Promise<ApproverItem[]> {
    const params = new URLSearchParams()
    if (search && search.trim() !== '') params.append('search', search.trim())

    const response = await fetch(`/api/travel-orders/users/approvers?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    })

    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat daftar Pejabat Penyetuju.')
    }

    return result.data || []
  }

  // 🟢 Tambahkan /travel-orders pada path URL
  static async fetchBudgets(search?: string): Promise<BudgetItem[]> {
    const params = new URLSearchParams()
    if (search && search.trim() !== '') params.append('search', search.trim())

    const response = await fetch(`/api/travel-orders/budgets?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    })

    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Gagal memuat data Mata Anggaran.')
    }

    return result.data || []
  }
}
