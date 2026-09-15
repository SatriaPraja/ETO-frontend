<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppSidebar from '@/components/layout/appSidebar.vue'
import AppHeader from '@/components/layout/appHeader.vue'
import SwitchRoleModal from '@/components/dashboard/roleSelectionModal.vue'

const authStore = useAuthStore()

// State Responsive Sidebar (Mobile)
const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

// State Kontrol Manual Modal Ganti Peran
const isManualRoleModalOpen = ref(false)

function openRoleModal() {
  isManualRoleModalOpen.value = true
}

function closeRoleModal() {
  isManualRoleModalOpen.value = false
}

function onRoleConfirmed() {
  isManualRoleModalOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-background flex font-body relative">
    <!-- Overlay Mobile saat Sidebar Terbuka -->
    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
    ></div>

    <!-- Sidebar Responsive -->
    <AppSidebar
      :is-open="isSidebarOpen"
      @close-sidebar="closeSidebar"
      @open-role-modal="openRoleModal"
    />

    <!-- Container Utama Layout -->
    <div class="w-full lg:pl-[260px] flex flex-col min-h-screen transition-all duration-300">
      <!-- Header Fixed (Kini menerima event open-role-modal) -->
      <AppHeader 
        @toggle-sidebar="toggleSidebar" 
        @open-role-modal="openRoleModal"
      />

      <!-- Area Konten Utama -->
      <main class="w-full mt-16 bg-surfaceCanvas flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <router-view />
      </main>
    </div>

    <!-- 
      Modal Switch Role:
      Otomatis muncul HANYA jika pengguna memiliki multi-role (> 1) DAN belum dikonfirmasi di sesi ini.
    -->
    <SwitchRoleModal
      v-if="(authStore.availableRoles.length > 1 && !authStore.isRoleConfirmed) || isManualRoleModalOpen"
      @close="closeRoleModal"
      @roleConfirmed="onRoleConfirmed"
    />
  </div>
</template>