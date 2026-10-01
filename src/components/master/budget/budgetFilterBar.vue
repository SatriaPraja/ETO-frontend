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
    class="bg-surfaceCard p-3.5 sm:p-4 rounded-xl border border-gray-100 shadow-2xs space-y-3 font-body text-xs"
  >
    <!-- Baris Atas: Input Pencarian & Dropdown Unit Kerja -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
      <!-- Input Search -->
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">
          search
        </span>
        <input
          type="text"
          v-model="store.filters.search"
          @keyup.enter="handleSearch"
          placeholder="Cari nomor akun (COA), nama kegiatan..."
          class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary transition-all"
        />
      </div>

      <!-- Dropdown Unit Kerja -->
      <select
        @change="handleOfficeFilter"
        class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium w-full sm:w-auto shrink-0 cursor-pointer"
      >
        <option value="all">Semua Kantor / Unit Kerja</option>
        <option value="Kanwil Jawa Timur">Kanwil Jawa Timur</option>
        <option value="Cabang Surabaya Rungkut">Cabang Surabaya Rungkut</option>
        <option value="Cabang Sidoarjo">Cabang Sidoarjo</option>
        <option value="Cabang Malang">Cabang Malang</option>
        <option value="Kantor Pusat Jakarta">Kantor Pusat Jakarta</option>
      </select>
    </div>

    <!-- Baris Bawah: Tombol Status Filter & Counter -->
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2.5 border-t border-gray-100"
    >
      <!-- Horizontal Scroll Filter Status Badges -->
      <div
        class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar shrink-0"
      >
        <!-- Filter Status: Semua -->
        <button
          type="button"
          @click="handleStatusFilter('all')"
          :class="[
            'px-3 py-1.5 rounded-lg font-semibold text-[11px] whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95',
            store.filters.status === 'all'
              ? 'bg-emerald-800 text-white shadow-2xs'
              : 'bg-surfaceCanvas text-textPrimary hover:bg-gray-200',
          ]"
        >
          Semua Status
        </button>

        <!-- Filter Status: Pagu Aman -->
        <button
          type="button"
          @click="handleStatusFilter('aman')"
          :class="[
            'px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95',
            store.filters.status === 'aman'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60',
          ]"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
          <span>Pagu Aman (&gt;50%)</span>
        </button>

        <!-- Filter Status: Sisa <20% (Warning) -->
        <button
          type="button"
          @click="handleStatusFilter('warning')"
          :class="[
            'px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95',
            store.filters.status === 'warning'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60',
          ]"
        >
          <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
          <span>Sisa Pagu &lt;20%</span>
        </button>

        <!-- Filter Status: Sisa <10% (Critical) -->
        <button
          type="button"
          @click="handleStatusFilter('critical')"
          :class="[
            'px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95',
            store.filters.status === 'critical'
              ? 'bg-rose-700 text-white shadow-2xs'
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60',
          ]"
        >
          <span class="w-2 h-2 rounded-full bg-rose-600 shrink-0 animate-pulse"></span>
          <span>Kritis (&lt;10%)</span>
        </button>
      </div>

      <!-- Informasi Jumlah Data & Tombol Refresh -->
      <div class="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-1 lg:pt-0">
        <span class="text-[11px] text-textMuted whitespace-nowrap">
          Menampilkan <strong class="text-textPrimary">{{ store.budgets.length }}</strong> dari
          <strong class="text-textPrimary">{{ store.totalData }}</strong> Rekening MAK
        </span>

        <button
          type="button"
          @click="store.fetchBudgets"
          class="p-1.5 hover:bg-surfaceCanvas rounded-lg text-textMuted hover:text-textPrimary cursor-pointer transition-colors shrink-0 flex items-center justify-center border border-transparent hover:border-gray-200"
          title="Refresh Data"
        >
          <span
            class="material-symbols-outlined text-[18px]"
            :class="{ 'animate-spin': store.isLoading }"
          >
            refresh
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
