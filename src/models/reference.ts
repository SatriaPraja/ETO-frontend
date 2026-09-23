export interface ApproverItem {
  id: string
  npk: string
  namaLengkap: string
  jabatan: string
  unitKerjaKode?: string
  unitKerjaNama: string
  avatarInitials?: string
}

export interface BudgetItem {
  id: string
  officeName: string
  accountNumber: string
  accountName: string
  programName: string
  activityName: string
  paguBudget: number
  usedBudget: number
  remainingBudget: number
}