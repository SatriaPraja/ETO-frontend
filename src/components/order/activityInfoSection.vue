<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
</script>

<template>
  <section class="bg-surfaceCard rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
    <div class="flex items-center justify-between pb-3 border-b border-gray-100 min-h-[42px]">
      <div>
        <h2 class="text-base font-bold text-textPrimary font-headline flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">assignment</span>
          1. Informasi Kegiatan & Pembebanan Anggaran
        </h2>
        <p class="text-xs text-textMuted mt-0.5">Parameter Surat Perintah Resmi dan Pembebanan Anggaran Unit Kerja</p>
      </div>
      <span v-if="orderStore.activeTransport === 'hotel'" class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1 border border-blue-100">
        <span class="material-symbols-outlined text-[15px]">link</span>
        <span>Terhubung Sistem ERP SBU</span>
      </span>
      <span v-else class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
        Saldo Anggaran Tersedia: Rp 145.750.000 (Cukup)
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">Pilih Travel Order Existing (Opsional)</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option v-if="orderStore.activeTransport === 'hotel'">TO/2026/05/00187 - Sosialisasi JKP Wilayah Jatim</option>
          <option v-else>— Buat Baru (Stand-alone TO) —</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">No. Travel Order</label>
        <input
          type="text"
          :value="orderStore.activeTransport === 'hotel' ? 'TO/2026/05/00215' : '# TO/2026/05/00214'"
          readonly
          class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs font-bold text-primary"
        />
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">{{ orderStore.activeTransport === 'hotel' ? 'Tanggal Pengajuan' : 'Tanggal Order' }}</label>
        <input
          type="text"
          value="14 Mei 2026"
          readonly
          class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <label class="text-xs font-semibold text-textPrimary mb-1">Nama Kegiatan *</label>
      <input
        v-model="orderStore.formInfo.activityName"
        type="text"
        class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">Nama Unit Kerja</label>
        <input
          type="text"
          value="Deputi Direktur Wilayah Jawa Timur"
          readonly
          class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
        />
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">{{ orderStore.activeTransport === 'hotel' ? 'Mata Anggaran (MAK) *' : 'Nama Program Kerja' }}</label>
        <input
          type="text"
          :value="orderStore.activeTransport === 'hotel' ? '521211 - Belanja Perjalanan Dinas Biasa' : 'Peningkatan Kepesertaan Aktif Sektor Formal 2026'"
          readonly
          class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
        />
      </div>
    </div>

    <!-- Card Saldo Anggaran MAK khusus tampilan Hotel -->
    <div v-if="orderStore.activeTransport === 'hotel'" class="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary text-onPrimary flex items-center justify-center font-bold shrink-0">
          <span class="material-symbols-outlined text-[22px]">account_balance_wallet</span>
        </div>
        <div>
          <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">PAGU MAK 521211 TERSEDIA</span>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xl font-extrabold text-emerald-800 font-headline">Rp 145.750.000</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold">Mencukupi</span>
          </div>
        </div>
      </div>
      <div class="text-left sm:text-right text-xs text-emerald-800">
        <p>Alokasi Triwulan II 2026</p>
        <strong class="font-semibold">Batas Maks: Rp 200.000.000</strong>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="orderStore.activeTransport !== 'hotel'">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">Nama Kepala Unit Kerja (Penyetuju)</label>
        <input type="text" value="Dr. Ir. Budi Santoso, M.M. (KakANWIL)" readonly class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">Mata Anggaran</label>
        <input type="text" value="521211 - Belanja Perjalanan Dinas Biasa" readonly class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">No. Sprin / SPPD *</label>
        <input v-model="orderStore.formInfo.sprinNumber" type="text" class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-bold focus:outline-none focus:border-primary" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-else>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">No. Sprin / SPPD Surat Tugas *</label>
        <input v-model="orderStore.formInfo.sprinNumber" type="text" class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-bold focus:outline-none focus:border-primary" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1">Catatan Tambahan / Keterangan Penugasan</label>
        <input type="text" value="Kebutuhan akomodasi dekat lokasi kegiatan kantor wilayah." class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textMuted focus:outline-none focus:border-primary" />
      </div>
    </div>
  </section>
</template>