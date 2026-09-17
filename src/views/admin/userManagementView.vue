<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { UserItem, UserDTO } from '@/models/userModel'

// Import Sub-Components
import UserMetricsHeader from '@/components/admin/UserMetricsHeader.vue'
import UserFilterBar from '@/components/admin/UserFilterBar.vue'
import UserTable from '@/components/admin/UserTable.vue'
import UserFormModal from '@/components/admin/UserFormModal.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

// Metrics Computation
const totalUsersCount = computed(() => userStore.users.length)
const activeUsersCount = computed(() => userStore.users.filter((u) => u.status === 'active').length)
const superAdminCount = computed(
  () => userStore.users.filter((u) => u.role === 'SUPER_ADMIN').length,
)
const inactiveUsersCount = computed(
  () => userStore.users.filter((u) => u.status === 'inactive').length,
)

// Modal State
const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const activeEditId = ref<string>('')
const formError = ref<string>('')

const formData = ref<UserDTO>({
  npk: '',
  namaLengkap: '',
  email: '',
  password: '',
  jabatan: '',
  golongan: 'III/A',
  unitKerjaKode: 'KP-UMUM',
  unitKerjaNama: 'Kantor Pusat - Divisi Umum & SDM',
  role: 'OFFICIAL_BOOKER',
})

function openCreateModal() {
  modalMode.value = 'create'
  formError.value = ''
  formData.value = {
    npk: '',
    namaLengkap: '',
    email: '',
    password: 'Password123!',
    jabatan: '',
    golongan: 'III/A',
    unitKerjaKode: 'KP-UMUM',
    unitKerjaNama: 'Kantor Pusat - Divisi Umum & SDM',
    role: 'OFFICIAL_BOOKER',
  }
  isModalOpen.value = true
}

function openEditModal(user: UserItem) {
  modalMode.value = 'edit'
  activeEditId.value = user.id
  formError.value = ''
  formData.value = {
    npk: user.npk,
    namaLengkap: user.namaLengkap,
    email: user.email,
    password: '',
    jabatan: user.jabatan,
    golongan: user.golongan || 'III/A',
    unitKerjaKode: user.unitKerjaKode || '',
    unitKerjaNama: user.unitKerjaNama || '',
    role: user.role,
  }
  isModalOpen.value = true
}

async function handleSaveUser() {
  formError.value = ''
  try {
    if (modalMode.value === 'create') {
      await userStore.addUser(formData.value)
    } else {
      // 🔴 Bersihkan properti password jika kosong agar tidak memicu error validasi min(6) di Zod backend
      const payload: Partial<UserDTO> = { ...formData.value }
      if (!payload.password) {
        delete payload.password
      }
      await userStore.editUser(activeEditId.value, payload)
    }
    isModalOpen.value = false
  } catch (err: any) {
    formError.value = String(err)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top Bar Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-textMuted font-body mb-1">
          <span>Beranda</span>
          <span class="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Manajemen Pengguna</span>
          <span class="material-symbols-outlined text-[14px]">chevron_right</span>
          <span class="font-bold text-textPrimary">Kelola User & Role</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-textPrimary font-headline tracking-tight">
          Manajemen Pengguna & Otorisasi SSO
        </h1>
        <p class="text-xs sm:text-sm text-textMuted mt-0.5 font-body">
          Kelola registrasi akun pegawai, penetapan wewenang fungsi *role*, dan hak akses modul
          e-TO.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="userStore.fetchUsers()"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-surfaceCard hover:bg-surfaceCanvas text-textPrimary text-xs font-semibold shadow-2xs transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]">refresh</span>
          <span>Refresh Data</span>
        </button>

        <button
          type="button"
          @click="openCreateModal"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm transition-all active:scale-[0.99]"
        >
          <span class="material-symbols-outlined text-[18px]">person_add</span>
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>
    </div>

    <!-- 1. Metrics Header Summary -->
    <UserMetricsHeader
      :total-count="totalUsersCount"
      :active-count="activeUsersCount"
      :super-admin-count="superAdminCount"
      :inactive-count="inactiveUsersCount"
    />

    <!-- 2. Filter Bar & Search -->
    <UserFilterBar
      v-model:search-query="userStore.searchQuery"
      v-model:selected-role="userStore.selectedRoleFilter"
      @filter-change="userStore.fetchUsers()"
    />

    <!-- 3. Data Table -->
    <UserTable
      :users="userStore.users"
      :loading="userStore.loading"
      @edit="openEditModal"
      @toggle-status="userStore.toggleStatus"
    />

    <!-- 4. Form Modal Component -->
    <UserFormModal
      v-model:form-data="formData"
      :is-open="isModalOpen"
      :mode="modalMode"
      :loading="userStore.loading"
      :error-msg="formError"
      @close="isModalOpen = false"
      @submit="handleSaveUser"
    />
  </div>
</template>
