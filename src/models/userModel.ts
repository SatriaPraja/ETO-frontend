export type UserRole =
  | 'SUPER_ADMIN'
  | 'OFFICIAL_BOOKER'
  | 'APPROVER_KAKANWIL'
  | 'ADMIN_TRAVEL_KP'
  | 'ASDEP_KEUANGAN'

export interface UserItem {
  id: string
  npk: string
  namaLengkap: string
  email: string
  jabatan: string
  golongan: string
  unitKerjaKode: string
  unitKerjaNama: string
  avatarInitials: string
  role: UserRole
  status: 'active' | 'inactive'
  createdAt: string
}

export interface UserDTO {
  npk: string
  namaLengkap: string
  email: string
  password?: string
  jabatan: string
  golongan: string
  unitKerjaKode: string
  unitKerjaNama: string
  role: UserRole
}