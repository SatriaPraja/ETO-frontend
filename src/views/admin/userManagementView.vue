<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { UserItem, UserDTO } from '@/models/userModel'

// Import Components
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import UserManagementHeader from '@/components/admin/UserManagementHeader.vue'
import UserMetricsHeader from '@/components/admin/UserMetricsHeader.vue'
import UserFilterBar from '@/components/admin/UserFilterBar.vue'
import UserTable from '@/components/admin/UserTable.vue'
import UserFormModal from '@/components/admin/UserFormModal.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

// Metrics Computation
const totalUsersCount = computed(() => userStore.meta?.total || userStore.users.length)
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

function handlePageChange(newPage: number) {
  if (typeof userStore.setPage === 'function') {
    userStore.setPage(newPage)
  } else {
    userStore.currentPage = newPage
    userStore.fetchUsers()
  }
}
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Breadcrumb Reusable -->
    <AppBreadcrumb />

    <!-- Top Header Title & Action Buttons -->
    <UserManagementHeader @refresh="userStore.fetchUsers()" @open-create="openCreateModal" />

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
      :meta="userStore.meta"
      @edit="openEditModal"
      @toggle-status="userStore.toggleStatus"
      @change-page="handlePageChange"
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
