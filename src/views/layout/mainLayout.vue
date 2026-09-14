<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/appSidebar.vue'
import AppHeader from '@/components/layout/appHeader.vue'
import RoleSelectionModal from '@/components/dashboard/roleSelectionModal.vue'

// State Sidebar HP
const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

// State Modal Pilih Peran
const isRoleModalOpen = ref(true)

function onRoleConfirmed() {
  isRoleModalOpen.value = false
}

function openRoleModal() {
  isRoleModalOpen.value = true
}
</script>

<template>
  <div class="min-h-screen bg-background flex font-body relative">
    <!-- Overlay Transparan HP saat Sidebar Terbuka -->
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
      <!-- App Header Fixed -->
      <AppHeader @toggle-sidebar="toggleSidebar" />

      <!-- Area Konten Utama: mt-16 memberi ruang pasti 64px di bawah Header -->
      <main class="w-full mt-16 bg-surfaceCanvas flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <router-view />
      </main>
    </div>

    <!-- Modal Pilih Peran -->
    <RoleSelectionModal
      v-if="isRoleModalOpen"
      @roleConfirmed="onRoleConfirmed"
    />
  </div>
</template>