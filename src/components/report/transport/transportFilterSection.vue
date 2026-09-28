<script setup lang="ts">
import { ref } from 'vue'
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()
const isFilterVisible = ref(true)

function applyFilter() {
  reportStore.transportFilters.page = 1
  reportStore.fetchTransportReport()
}

function handleReset() {
  reportStore.resetTransportFilters()
}

function toggleStatusFilter(statusVal: 'APPROVED' | 'WAITING_PEJABAT' | 'REJECTED' | 'CANCELLED') {
  if (reportStore.transportFilters.status === statusVal) {
    reportStore.transportFilters.status = undefined
  } else {
    reportStore.transportFilters.status = statusVal
  }
  applyFilter()
}
</script>

<template>
  <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <h3 class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">tune</span>
        <span>Filter Parameter Laporan</span>
      </h3>
      <button
        type="button"
        @click="isFilterVisible = !isFilterVisible"
        class="text-[11px] text-textMuted hover:text-textPrimary flex items-center gap-1 font-semibold cursor-pointer"
      >
        <span>{{ isFilterVisible ? 'Sembunyikan Filter' : 'Tampilkan Filter' }}</span>
        <span class="material-symbols-outlined text-[16px]">
          {{ isFilterVisible ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
    </div>

    <div v-show="isFilterVisible" class="space-y-4">
      <!-- Row 1 Filter Dropdowns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Pemohon</label>
          <select
            v-model="reportStore.transportFilters.unitKerjaKode"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          >
            <option value="">Semua Unit Kerja</option>
            <option value="UK001">Kantor Wilayah Jawa Timur</option>
            <option value="UK002">Kantor Wilayah DKI Jakarta</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Kegiatan / Mata Anggaran (MAK)</label>
          <select
            v-model="reportStore.transportFilters.budgetId"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          >
            <option :value="undefined">Semua Mata Anggaran</option>
            <option value="b384606f-70ec-4dfa-8a5d-4a1122334455">521211 - Perjalanan Dinas Biasa</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Kategori Pencarian</label>
          <select
            v-model="reportStore.transportFilters.searchCategory"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          >
            <option value="guestName">Nama Traveller / NPK</option>
            <option value="toCode">No. Travel Order</option>
          </select>
        </div>
      </div>

      <!-- Row 2 Filter Inputs & Status Checkboxes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 text-xs items-end">
        <!-- Kata Kunci -->
        <div class="lg:col-span-4 flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
            <input
              type="text"
              v-model="reportStore.transportFilters.keyword"
              @keyup.enter="applyFilter"
              placeholder="Masukkan nama traveller / NPK..."
              class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <!-- Rentang Tanggal Pengajuan -->
        <div class="lg:col-span-4 flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Tanggal Keberangkatan (Awal - Akhir)</label>
          <div class="grid grid-cols-2 gap-2">
            <input
              type="date"
              v-model="reportStore.transportFilters.startDate"
              class="h-9 px-2 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary"
            />
            <input
              type="date"
              v-model="reportStore.transportFilters.endDate"
              class="h-9 px-2 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary"
            />
          </div>
        </div>

        <!-- Status Order Checkbox Pills -->
        <div class="lg:col-span-4 flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Status Order</label>
          <div class="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
            <label
              @click="toggleStatusFilter('APPROVED')"
              :class="[
                'flex items-center gap-1 cursor-pointer font-semibold px-2 py-1 rounded border transition-colors',
                reportStore.transportFilters.status === 'APPROVED'
                  ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-100'
              ]"
            >
              <input type="checkbox" :checked="reportStore.transportFilters.status === 'APPROVED'" class="accent-emerald-700" />
              <span>✓ Disetujui</span>
            </label>

            <label
              @click="toggleStatusFilter('WAITING_PEJABAT')"
              :class="[
                'flex items-center gap-1 cursor-pointer font-semibold px-2 py-1 rounded border transition-colors',
                reportStore.transportFilters.status === 'WAITING_PEJABAT'
                  ? 'text-blue-800 bg-blue-100 border-blue-300'
                  : 'text-blue-700 bg-blue-50 border-blue-100'
              ]"
            >
              <input type="checkbox" :checked="reportStore.transportFilters.status === 'WAITING_PEJABAT'" class="accent-blue-600" />
              <span>Menunggu</span>
            </label>

            <label
              @click="toggleStatusFilter('REJECTED')"
              class="flex items-center gap-1 cursor-pointer font-semibold text-textMuted"
            >
              <input type="checkbox" :checked="reportStore.transportFilters.status === 'REJECTED'" />
              <span>Ditolak</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Active Filter Footprint -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
        <span class="text-[11px] text-textMuted font-medium">
          Ditemukan <strong>{{ reportStore.transportTransactions.length }}</strong> dari <strong>{{ reportStore.transportTotalData }}</strong> dokumen sesuai filter saat ini.
        </span>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handleReset"
            class="px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary font-semibold text-xs cursor-pointer"
          >
            Reset Filter
          </button>
          <button
            type="button"
            @click="applyFilter"
            class="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">filter_list</span>
            <span>Terapkan Filter</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>