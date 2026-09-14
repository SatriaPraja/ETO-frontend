<script setup lang="ts">
import { useOrderStore, type TransportType } from '@/stores/orderStore'

defineProps<{
  currentTab: { type: TransportType; label: string; icon: string; color: string }
}>()

const orderStore = useOrderStore()
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-surfaceContainerLow flex items-center justify-center font-bold shrink-0">
        <span :class="['material-symbols-outlined text-[28px]', currentTab.color]">{{ currentTab.icon }}</span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-bold text-textPrimary font-headline">
            Buat Order – {{ orderStore.activeTransport === 'hotel' ? 'Hotel & Akomodasi' : currentTab.label }}
          </h1>
          <span v-if="orderStore.activeTransport !== 'hotel'" class="px-2 py-0.5 rounded bg-surfaceContainerHigh text-textMuted text-[10px] font-semibold uppercase">
            MODUL RESMI
          </span>
        </div>
        <p class="text-xs text-textMuted mt-0.5">
          {{
            orderStore.activeTransport === 'hotel'
              ? 'Portal Korporat BPJS TK • Layanan Pemesanan Hotel & Akomodasi Perjalanan Dinas'
              : `Layanan Pemesanan Tiket Dinas Angkutan Udara Seluruh Unit Kerja BPJS Ketenagakerjaan`
          }}
        </p>
      </div>
    </div>

    <!-- Stepper Progress -->
    <div class="flex items-center gap-3 bg-surfaceCanvas p-2.5 rounded-xl text-xs shrink-0">
      <div class="flex items-center gap-1.5 text-emerald-700 font-bold">
        <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</span>
        <span>LANGKAH 01<br /><strong class="text-[10px] font-normal text-textMuted">Informasi Kegiatan</strong></span>
      </div>
      <span class="text-textMuted">➔</span>
      <div class="flex items-center gap-1.5 text-primary font-bold">
        <span class="w-5 h-5 rounded-full bg-primary text-onPrimary flex items-center justify-center text-[10px]">2</span>
        <span>LANGKAH 02 (AKTIF)<br /><strong class="text-[10px] font-normal text-textPrimary">{{ orderStore.activeTransport === 'hotel' ? 'Pemesanan Hotel' : 'Data Traveller' }}</strong></span>
      </div>
      <span class="text-textMuted">➔</span>
      <div class="flex items-center gap-1.5 text-textMuted font-semibold">
        <span class="w-5 h-5 rounded-full bg-gray-200 text-textMuted flex items-center justify-center text-[10px]">3</span>
        <span>LANGKAH 03<br /><strong class="text-[10px] font-normal text-textMuted">Konfirmasi & Pengajuan</strong></span>
      </div>
    </div>
  </div>
</template>