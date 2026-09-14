<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

defineEmits(['toggle-sidebar'])

const dashboardStore = useDashboardStore()
</script>

<template>
  <header class="fixed top-0 left-0 lg:left-[260px] right-0 h-16 bg-surfaceCard/95 backdrop-blur-md z-30 px-4 sm:px-6 flex items-center justify-between shadow-sm border-b border-gray-100 transition-all duration-300">
    <!-- Left Controls -->
    <div class="flex items-center gap-3 sm:gap-6 min-w-0 flex-1 pr-4">
      <!-- Tombol Hamburger (Khusus HP / Tablet) -->
      <button
        type="button"
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-1.5 rounded-lg text-textMuted hover:bg-surfaceCanvas hover:text-textPrimary transition-colors shrink-0"
      >
        <span class="material-symbols-outlined text-[24px]">menu</span>
      </button>

      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-xs text-textMuted font-body shrink-0">
        <span class="hover:text-primary cursor-pointer hidden sm:inline">e-TO</span>
        <span class="material-symbols-outlined text-[16px] hidden sm:inline">chevron_right</span>
        <span class="font-bold text-textPrimary font-headline text-xs sm:text-sm truncate">Sistem Perjalanan Dinas</span>
      </div>

      <!-- Search Input -->
      <div class="relative w-full max-w-xs hidden xl:block shrink min-w-[200px]">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
        <input
          v-model="dashboardStore.searchQuery"
          type="text"
          placeholder="Cari nomor e-TO, kegiatan..."
          class="w-full h-9 pl-9 pr-4 rounded-lg bg-surfaceCanvas text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:bg-surfaceCard transition-all"
        />
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-3 sm:gap-4 shrink-0">
      <!-- Pagu Widget -->
      <div class="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surfaceContainerLow shrink-0">
        <span class="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
        <div class="flex flex-col">
          <span class="text-[10px] text-textMuted leading-none font-body">Pagu Anggaran Aktif</span>
          <span class="text-xs font-bold text-primary leading-none mt-1 font-headline">Rp 450.000.000</span>
        </div>
      </div>

      <!-- Notification Bell -->
      <div class="relative cursor-pointer shrink-0">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surfaceCanvas text-textMuted transition-colors">
          <span class="material-symbols-outlined text-[20px]">notifications</span>
        </div>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
      </div>

      <!-- User Profile Dropdown -->
      <div class="flex items-center gap-2 pl-2 border-l border-gray-100 shrink-0">
        <div class="w-8 h-8 rounded-full bg-primary text-onPrimary font-bold flex items-center justify-center text-xs shrink-0">
          AP
        </div>
        <div class="hidden lg:flex flex-col">
          <span class="text-xs font-bold text-textPrimary leading-none font-headline">Andi Pratama</span>
          <span class="text-[10px] text-textMuted leading-none mt-1 font-body">Kantor Cabang Jakarta</span>
        </div>
        <span class="material-symbols-outlined text-textMuted text-[18px]">arrow_drop_down</span>
      </div>
    </div>
  </header>
</template>