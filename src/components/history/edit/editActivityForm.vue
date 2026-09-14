<script setup lang="ts">
import { ref } from 'vue'

const bookerNotes = ref(
  'Jadwal penerbangan 3 personel telah dimundurkan menjadi 20 Mei 2026 pukul 07.10 WIB sesuai rundown pembukaan acara Kanwil.'
)
</script>

<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">assignment</span>
        <h2 class="text-base font-bold text-textPrimary font-headline">Informasi Kegiatan & Anggaran</h2>
      </div>
      <span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
        Mode Koreksi Aktif
      </span>
    </div>

    <!-- Grid Input Readonly & Editable -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Nomor Travel Order</label>
        <div class="relative">
          <input type="text" value="TO/2026/05/00187" readonly class="w-full h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 font-bold text-textPrimary" />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">lock</span>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Tanggal Permohonan Order</label>
        <div class="relative">
          <input type="text" value="14 Mei 2026" readonly class="w-full h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-textMuted" />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">calendar_today</span>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textPrimary mb-1">No. Sprin / SPPD *</label>
        <div class="relative">
          <input type="text" value="SPRIN/0491/052026" class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 font-bold text-textPrimary focus:outline-none focus:border-primary" />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-emerald-600 text-[18px]">check_circle</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Nama Kegiatan Kedinasan *</label>
        <input type="text" value="Sosialisasi Program Jaminan Kehilangan Pekerjaan (JKP) Wilayah Jatim" class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-textPrimary focus:outline-none focus:border-primary font-medium" />
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Pemohon</label>
        <input type="text" value="Kantor Wilayah Jawa Timur - Bidang Kepesertaan" readonly class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-textMuted" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Mata Anggaran Kegiatan (MAK / COA)</label>
        <div class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 flex items-center gap-2">
          <span class="font-mono font-bold text-textPrimary">5.2.1.04.01</span>
          <span class="text-textMuted">• Biaya Perjalanan Dinas Sosialisasi</span>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Pagu & Saldo Anggaran</label>
        <div class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 flex items-center justify-between">
          <span class="font-bold text-emerald-700">Rp 145.750.000</span>
          <span class="px-2 py-0.2 rounded bg-emerald-700 text-white font-bold text-[10px]">MENCUKUPI</span>
        </div>
      </div>
    </div>

    <!-- Catatan Penjelasan Perbaikan Booker -->
    <div class="flex flex-col pt-1">
      <div class="flex items-center justify-between mb-1">
        <label class="text-xs font-bold text-textPrimary font-headline">Catatan Penjelasan Perbaikan (Booker Notes) *</label>
        <span class="text-[10px] text-textMuted">{{ bookerNotes.length }}/250 karakter</span>
      </div>
      <textarea
        v-model="bookerNotes"
        rows="2"
        maxlength="250"
        class="p-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium leading-relaxed"
      ></textarea>
    </div>
  </div>
</template>