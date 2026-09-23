<script setup lang="ts">
import { useHistoryStore } from '@/stores/historyStore'

const historyStore = useHistoryStore()

const statusPills = [
  { id: 'ALL', label: 'Semua', activeClass: 'bg-emerald-800 text-white' },
  { id: 'WAITING_PEJABAT', label: 'Menunggu Pejabat', dotColor: 'bg-blue-400' },
  { id: 'APPROVED', label: 'Disetujui', dotColor: 'bg-emerald-500' },
  { id: 'RETURNED', label: 'Dikembalikan', dotColor: 'bg-amber-500' },
  { id: 'REJECTED', label: 'Ditolak', dotColor: 'bg-red-500' },
  { id: 'CANCELLED', label: 'Batal', dotColor: 'bg-gray-400' },
]

function handleApplyFilter() {
  historyStore.loadHistory()
}

function handleResetFilter() {
  historyStore.resetFilters()
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Status Filter Pills Bar -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="pill in statusPills"
        :key="pill.id"
        type="button"
        @click="historyStore.setStatusFilter(pill.id)"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer',
          historyStore.filters.status === pill.id
            ? (pill.activeClass || 'bg-slate-800 text-white')
            : 'bg-surfaceCard text-textMuted border border-gray-100 hover:bg-surfaceCanvas'
        ]"
      >
        <span v-if="pill.dotColor && historyStore.filters.status !== pill.id" :class="['w-2 h-2 rounded-full', pill.dotColor]"></span>
        <span>{{ pill.label }}</span>
      </button>
    </div>

    <!-- Form Input Filters -->
    <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
      <!-- Kata Kunci -->
      <div class="lg:col-span-4 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
          <input
            v-model="historyStore.filters.search"
            @keyup.enter="handleApplyFilter"
            type="text"
            placeholder="No. Travel Order / Kegiatan / Sprin..."
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <!-- Unit Kerja -->
      <div class="lg:col-span-3 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja</label>
        <select
          v-model="historyStore.filters.unitKerjaKode"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
        >
          <option value="">Semua Unit Kerja</option>
          <option value="UK-001">Kantor Pusat - Divisi Umum & SDM</option>
          <option value="UK-002">Kantor Wilayah Jawa Timur</option>
        </select>
      </div>

      <!-- Tanggal Pengajuan -->
      <div class="lg:col-span-3 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Tanggal Pengajuan</label>
        <div class="relative">
          <input
            v-model="historyStore.filters.startDate"
            type="date"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="lg:col-span-2 flex items-center gap-1.5">
        <button
          type="button"
          @click="handleApplyFilter"
          class="flex-1 h-9 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[16px]">tune</span>
          <span>Terapkan</span>
        </button>
        <button
          type="button"
          @click="handleResetFilter"
          class="w-9 h-9 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textMuted flex items-center justify-center transition-colors shrink-0 cursor-pointer active:scale-[0.98]"
          title="Reset Filter"
        >
          <span class="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>
    </div>
  </div>
</template>