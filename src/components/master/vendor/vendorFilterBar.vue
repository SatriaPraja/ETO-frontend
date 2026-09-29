<script setup lang="ts">
import { useVendorStore } from '@/stores/vendorStore'

const vendorStore = useVendorStore()

function handleSearch() {
  vendorStore.filters.page = 1
  vendorStore.fetchVendors()
}

function handleModaChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  vendorStore.filters.type = val === 'ALL' ? undefined : (val as any)
  handleSearch()
}

function handleStatusChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  vendorStore.filters.status = val as any
  handleSearch()
}
</script>

<template>
  <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body">
    <!-- Search Input Left -->
    <div class="relative flex-1 max-w-md">
      <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
      <input
        type="text"
        v-model="vendorStore.filters.search"
        @keyup.enter="handleSearch"
        placeholder="Cari kode, nama maskapai, atau kontak vendor..."
        class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
      />
    </div>

    <!-- Dropdown Filters Right -->
    <div class="flex items-center gap-2 flex-wrap">
      <select
        :value="vendorStore.filters.type || 'ALL'"
        @change="handleModaChange"
        class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
      >
        <option value="ALL">Semua Moda Transportasi</option>
        <option value="flight">Pesawat Udara</option>
        <option value="train">Kereta Api</option>
        <option value="sea">Kapal Laut</option>
        <option value="bus">Bus / Shuttle</option>
        <option value="car">Mobil Dinas</option>
      </select>

      <select
        :value="vendorStore.filters.status || 'all'"
        @change="handleStatusChange"
        class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
      >
        <option value="all">Semua Status</option>
        <option value="active">Aktif</option>
        <option value="inactive">Nonaktif</option>
      </select>

      <span class="text-[11px] text-textMuted font-medium pl-2">
        Total: <strong>{{ vendorStore.stats.totalVendor }} Mitra</strong> ({{ vendorStore.stats.activeVendor }} Aktif, {{ vendorStore.stats.inactiveVendor }} Nonaktif)
      </span>
    </div>
  </div>
</template>