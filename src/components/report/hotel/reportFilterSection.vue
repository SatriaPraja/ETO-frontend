<script setup lang="ts">
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()

function applyFilter() {
  reportStore.hotelFilters.page = 1
  reportStore.fetchHotelReport()
}

function handleReset() {
  reportStore.resetHotelFilters()
}

function removeKeyword() {
  reportStore.hotelFilters.keyword = ''
  applyFilter()
}

function removeCity() {
  reportStore.hotelFilters.cityId = null
  applyFilter()
}
</script>

<template>
  <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
        <span>Parameter Filter & Pencarian Laporan</span>
      </h3>
      <span class="text-[11px] text-textMuted">Menampilkan riwayat pemesanan akomodasi aktif & arsip audit</span>
    </div>

    <!-- Grid Filter Dropdowns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
      <!-- Unit Kerja Pemohon -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Pemohon</label>
        <select
          v-model="reportStore.hotelFilters.unitKerjaKode"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        >
          <option value="">Semua Unit Kerja</option>
          <option value="UK001">Divisi Umum & SDM</option>
          <option value="UK002">Deputi Dir. Jawa Timur</option>
        </select>
      </div>

      <!-- Kota Tujuan -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kota Tujuan</label>
        <select
          v-model.number="reportStore.hotelFilters.cityId"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        >
          <option :value="null">Semua Kota</option>
          <option :value="1">Jakarta</option>
          <option :value="2">Surabaya</option>
          <option :value="4">Denpasar</option>
        </select>
      </div>

      <!-- Kategori Pencarian -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kategori Pencarian</label>
        <select
          v-model="reportStore.hotelFilters.searchCategory"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        >
          <option value="hotelName">Nama Hotel</option>
          <option value="guestName">Nama Penginap</option>
          <option value="toCode">No. TO</option>
        </select>
      </div>

      <!-- Kata Kunci -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
          <input
            type="text"
            v-model="reportStore.hotelFilters.keyword"
            @keyup.enter="applyFilter"
            placeholder="Cari kata kunci..."
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <!-- Periode Menginap -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Periode Menginap</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">calendar_today</span>
          <input
            type="month"
            v-model="reportStore.hotelFilters.period"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <!-- Status Reservasi -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Status Reservasi</label>
        <select
          v-model="reportStore.hotelFilters.status"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        >
          <option :value="undefined">Semua Status</option>
          <option value="APPROVED">Selesai / Approved</option>
          <option value="WAITING_PEJABAT">Menunggu</option>
          <option value="CANCELLED">Batal</option>
        </select>
      </div>
    </div>

    <!-- Active Filter Tags & Action Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[11px] text-textMuted font-semibold">Filter Aktif:</span>
        <span
          v-if="reportStore.hotelFilters.keyword"
          class="px-2.5 py-1 rounded-full bg-surfaceCanvas text-textPrimary text-[11px] font-medium flex items-center gap-1 border border-gray-200"
        >
          <span>Keyword: {{ reportStore.hotelFilters.keyword }}</span>
          <button type="button" @click="removeKeyword" class="hover:text-red-500 font-bold">✕</button>
        </span>
        <span
          v-if="reportStore.hotelFilters.period"
          class="px-2.5 py-1 rounded-full bg-surfaceCanvas text-textPrimary text-[11px] font-medium flex items-center gap-1 border border-gray-200"
        >
          <span>Bulan: {{ reportStore.hotelFilters.period }}</span>
        </span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          @click="handleReset"
          class="px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset Filter</span>
        </button>
        <button
          type="button"
          @click="applyFilter"
          class="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">search</span>
          <span>Terapkan Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>