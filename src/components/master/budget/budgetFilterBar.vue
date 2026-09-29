<script setup lang="ts">
import { useBudgetStore } from '@/stores/budgetStore'

const store = useBudgetStore()

function handleSearch() {
  store.filters.page = 1
  store.fetchBudgets()
}

function handleStatusFilter(status: 'all' | 'aman' | 'warning' | 'critical') {
  store.filters.status = status
  handleSearch()
}

function handleOfficeFilter(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  store.filters.officeName = value === 'all' ? undefined : value
  handleSearch()
}
</script>

<template>
  <div
    class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body"
  >
    <!-- Left Search & Select -->
    <div class="flex items-center gap-3 flex-1 flex-wrap">
      <div class="relative flex-1 min-w-[240px]">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
        <input
          type="text"
          v-model="store.filters.search"
          @keyup.enter="handleSearch"
          placeholder="Cari nomor akun (COA), nama kegiatan, program kerja..."
          class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        />
      </div>

      <select
        @change="handleOfficeFilter"
        class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
      >
        <option value="all">Semua Kantor / Unit Kerja</option>
        <option value="Kanwil Jawa Timur">Kanwil Jawa Timur</option>
        <option value="Cabang Surabaya Rungkut">Cabang Surabaya Rungkut</option>
        <option value="Cabang Sidoarjo">Cabang Sidoarjo</option>
        <option value="Cabang Malang">Cabang Malang</option>
        <option value="Kantor Pusat Jakarta">Kantor Pusat Jakarta</option>
      </select>
    </div>

    <!-- Right Filter Badges & Counter -->
    <div class="flex items-center gap-3 shrink-0">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="handleStatusFilter('all')"
          :class="[
            'px-2.5 py-1 rounded font-semibold text-[11px] transition-colors cursor-pointer',
            store.filters.status === 'all' ? 'bg-emerald-800 text-white' : 'bg-surfaceCanvas text-textPrimary hover:bg-gray-200'
          ]"
        >
          Semua Status
        </button>

        <button
          type="button"
          @click="handleStatusFilter('aman')"
          :class="[
            'px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer',
            store.filters.status === 'aman' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          ]"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Pagu Aman (>50%)</span>
        </button>

        <button
          type="button"
          @click="handleStatusFilter('warning')"
          :class="[
            'px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer',
            store.filters.status === 'warning' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          ]"
        >
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Sisa Pagu &lt;20%</span>
        </button>
      </div>

      <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
        <span class="text-[11px] text-textMuted">
          Menampilkan <strong>{{ store.budgets.length }}</strong> dari {{ store.totalData }} Rekening MAK
        </span>
        <button
          type="button"
          @click="store.fetchBudgets"
          class="p-1 hover:bg-surfaceCanvas rounded text-textMuted cursor-pointer"
          title="Refresh Data"
        >
          <span class="material-symbols-outlined text-[16px]" :class="{ 'animate-spin': store.isLoading }">refresh</span>
        </button>
      </div>
    </div>
  </div>
</template>