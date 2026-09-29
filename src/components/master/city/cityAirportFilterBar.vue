<script setup lang="ts">
import { useCityAirportStore } from '@/stores/cityAirportStore.ts'

const store = useCityAirportStore()

function handleSearch() {
  store.filters.page = 1
  store.fetchData()
}

function handleStatusChange(e: Event) {
  store.filters.status = (e.target as HTMLSelectElement).value as any
  handleSearch()
}
</script>

<template>
  <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs space-y-3 font-body">
    <!-- Tabs Navigasi (Master Bandara vs Master Kota) -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-3">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="store.switchTab('airport')"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            store.activeTab === 'airport'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">connecting_airports</span>
          <span>Master Bandara (IATA)</span>
        </button>

        <button
          type="button"
          @click="store.switchTab('city')"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            store.activeTab === 'city'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">location_city</span>
          <span>Master Kota & Provinsi</span>
        </button>
      </div>

      <span class="text-xs text-textMuted font-medium hidden sm:inline">
        Total: <strong class="text-textPrimary">{{ store.totalData }} Data</strong>
      </span>
    </div>

    <!-- Inputs & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div class="relative flex-1 max-w-md">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
        <input
          type="text"
          v-model="store.filters.search"
          @keyup.enter="handleSearch"
          :placeholder="store.activeTab === 'airport' ? 'Cari kode IATA, nama bandara, atau kota...' : 'Cari nama kota / provinsi...'"
          class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
        />
      </div>

      <div class="flex items-center gap-2">
        <select
          :value="store.filters.status || 'all'"
          @change="handleStatusChange"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>
    </div>
  </div>
</template>