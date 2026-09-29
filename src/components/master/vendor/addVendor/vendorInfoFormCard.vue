<script setup lang="ts">
import { ref } from 'vue'

const isVendorActive = ref(true)
const sbuNote = ref('Penyedia penerbangan full service untuk pejabat tingkat eselon dan delegasi dinas resmi.')
</script>

<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-5 font-body">
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">badge</span>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">1. Informasi Maskapai / Vendor</h2>
          <p class="text-[11px] text-textMuted">Parameter identitas legalitas dan kodefikasi transaksi perjalanan dinas.</p>
        </div>
      </div>
      <span class="px-2 py-0.5 rounded bg-surfaceCanvas text-textMuted text-[10px] font-bold">
        Bagian 1 dari 2
      </span>
    </div>

    <!-- Row 1: Kode & Nama Maskapai -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textPrimary mb-1">Kode Maskapai *</label>
        <div class="relative">
          <input
            type="text"
            value="GA"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 font-bold text-textPrimary focus:outline-none focus:border-primary uppercase"
          />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-emerald-600 text-[18px]">check_circle</span>
        </div>
        <span class="text-[10px] text-textMuted mt-1">Maksimal 5 karakter alfanumerik standar IATA / ICAO resmi</span>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textPrimary mb-1">Nama Maskapai / Operator *</label>
        <input
          type="text"
          value="Garuda Indonesia (Persero) Tbk"
          class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 font-medium text-textPrimary focus:outline-none focus:border-primary"
        />
        <span class="text-[10px] text-textMuted mt-1">Sesuai kontrak perjanjian kerjasama tiket dinas (GSA)</span>
      </div>
    </div>

    <!-- Row 2: Jenis Moda & Kategori Kerjasama -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textPrimary mb-1">Jenis Moda Transportasi *</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-textPrimary font-semibold focus:outline-none focus:border-primary">
          <option>✈ Pesawat Udara (Angkutan Udara)</option>
          <option>🚆 Kereta Api</option>
          <option>🚢 Kapal Laut</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textPrimary mb-1">Kategori Kerjasama *</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-textPrimary font-semibold focus:outline-none focus:border-primary">
          <option>BUMN / Mitra Korporasi Resmi (Contract)</option>
          <option>Vendor Agregator / OTA</option>
        </select>
      </div>
    </div>

    <!-- Row 3: Status Operasional Switch -->
    <div class="p-3.5 rounded-xl bg-surfaceCanvas border border-gray-100 flex items-center justify-between text-xs">
      <div>
        <strong class="font-bold text-textPrimary block">Status Operasional Maskapai</strong>
        <span class="text-[11px] text-textMuted">Jika dinonaktifkan, booker tidak dapat memilih operator ini saat pengajuan e-TO.</span>
      </div>

      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isVendorActive" class="sr-only peer" />
        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        <span class="ml-2 font-bold text-xs" :class="isVendorActive ? 'text-emerald-800' : 'text-textMuted'">
          {{ isVendorActive ? 'Aktif' : 'Nonaktif' }}
        </span>
      </label>
    </div>

    <!-- Row 4: Keterangan Aturan Plafon SBU -->
    <div class="flex flex-col">
      <div class="flex items-center justify-between mb-1">
        <label class="text-[11px] font-semibold text-textPrimary">Keterangan / Aturan Khusus Plafon SBU</label>
        <span class="text-[10px] text-textMuted">{{ sbuNote.length }}/250 Karakter</span>
      </div>
      <textarea
        v-model="sbuNote"
        rows="2"
        maxlength="250"
        class="p-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-medium focus:outline-none focus:border-primary leading-relaxed"
      ></textarea>
    </div>
  </div>
</template>