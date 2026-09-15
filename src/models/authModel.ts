export interface UserPayload {
  id: string
  npk: string
  namaLengkap: string
  email: string
  jabatan: string
  golongan: string
  unitKerjaKode: string
  unitKerjaNama: string
  avatarInitials: string
}

export interface RoleDetail {
  id: string
  name: string
  desc: string
}

export interface LoginResponseData {
  accessToken?: string
  user: UserPayload
  availableRoles: RoleDetail[]
  activeRole: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}