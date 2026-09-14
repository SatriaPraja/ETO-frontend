<script setup lang="ts">
import { ref } from 'vue'

const activeStatus = ref('all')

const statusPills = [
  { id: 'all', label: 'Semua', count: 24, activeClass: 'bg-emerald-800 text-white' },
  { id: 'pejabat', label: 'Menunggu Pejabat', count: 3, dotColor: 'bg-blue-400' },
  { id: 'admin', label: 'Menunggu Admin', count: 2, dotColor: 'bg-blue-300' },
  { id: 'approved', label: 'Disetujui', count: 12, dotColor: 'bg-emerald-500' },
  { id: 'returned', label: 'Dikembalikan', count: 2, dotColor: 'bg-amber-500' },
  { id: 'rejected', label: 'Ditolak', count: 1, dotColor: 'bg-red-500' },
  { id: 'canceled', label: 'Batal', count: 4, dotColor: 'bg-gray-400' },
]
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Status Filter Pills Bar -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="pill in statusPills"
        :key="pill.id"
        type="button"
        @click="activeStatus = pill.id"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap shrink-0',
          activeStatus === pill.id
            ? (pill.activeClass || 'bg-slate-800 text-white')
            : 'bg-surfaceCard text-textMuted border border-gray-100 hover:bg-surfaceCanvas'
        ]"
      >
        <span v-if="pill.dotColor && activeStatus !== pill.id" :class="['w-2 h-2 rounded-full', pill.dotColor]"></span>
        <span>{{ pill.label }}</span>
        <span
          :class="[
            'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
            activeStatus === pill.id ? 'bg-white/20 text-white' : 'bg-surfaceCanvas text-textMuted'
          ]"
        >
          {{ pill.count }}
        </span>
      </button>
    </div>

    <!-- Form Input Filters -->
    <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
      <!-- Kategori Cari -->
      <div class="lg:col-span-2 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kategori Cari</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>No. Travel Order</option>
          <option>Nama Kegiatan</option>
          <option>Nama Traveller</option>
        </select>
      </div>

      <!-- Kata Kunci -->
      <div class="lg:col-span-3 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
          <input
            type="text"
            placeholder="Masukkan kata kunci penca"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Rentang Tanggal -->
      <div class="lg:col-span-3 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Rentang Tanggal</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">calendar_today</span>
          <input
            type="text"
            value="01/05/2026 - 31"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Unit Kerja -->
      <div class="lg:col-span-2 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>Semua Unit Kerja</option>
          <option>Deputi Direktur Jatim</option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="lg:col-span-2 flex items-center gap-1.5">
        <button
          type="button"
          class="flex-1 h-9 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px]">tune</span>
          <span>Terapkan</span>
        </button>
        <button
          type="button"
          class="w-9 h-9 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textMuted flex items-center justify-center transition-colors shrink-0"
          title="Reset Filter"
        >
          <span class="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>
    </div>
  </div>
</template>