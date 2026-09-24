<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore, type TransportType } from '@/stores/orderStore'

defineProps<{
  currentTab: { type: TransportType; label: string; icon: string; color: string }
}>()

const orderStore = useOrderStore()

// 1. Cek Kelengkapan Langkah 01 (Informasi Kegiatan)
const isStep1Complete = computed(() => {
  const info = orderStore.formInfo
  return Boolean(
    info.activityName && 
    info.activityName.trim() !== '' && 
    info.sprinNumber && 
    info.sprinNumber.trim() !== ''
  )
})

// 2. Cek Kelengkapan Langkah 02 (Data Traveller / Hotel)
const isStep2Complete = computed(() => {
  if (orderStore.activeTransport === 'hotel') {
    return orderStore.hotels.length > 0
  }
  return orderStore.travellers.length > 0
})

// 3. Tentukan Langkah Mana yang SEDANG AKTIF secara Otomatis
const activeStep = computed(() => {
  if (!isStep1Complete.value) return 1
  if (!isStep2Complete.value) return 2
  return 3
})
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-surfaceCard p-6 shadow-2xs border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-body">
    <!-- Header Left Info -->
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
              : 'Layanan Pemesanan Tiket Dinas Angkutan Udara Seluruh Unit Kerja BPJS Ketenagakerjaan'
          }}
        </p>
      </div>
    </div>

    <!-- Stepper Progress Bar Dinamis -->
    <div class="flex items-center gap-3 bg-surfaceCanvas p-2.5 rounded-xl text-xs shrink-0 border border-gray-100">
      
      <!-- LANGKAH 01: Informasi Kegiatan -->
      <div 
        :class="[
          'flex items-center gap-1.5 font-bold transition-all',
          activeStep === 1 ? 'text-primary' : isStep1Complete ? 'text-emerald-700' : 'text-textMuted'
        ]"
      >
        <span 
          :class="[
            'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors',
            isStep1Complete 
              ? 'bg-emerald-600 text-white' 
              : activeStep === 1 
                ? 'bg-primary text-onPrimary' 
                : 'bg-gray-200 text-textMuted'
          ]"
        >
          {{ isStep1Complete ? '✓' : '1' }}
        </span>
        <span>
          LANGKAH 01 <template v-if="activeStep === 1">(AKTIF)</template><br />
          <strong class="text-[10px] font-semibold text-textMuted block">Informasi Kegiatan</strong>
        </span>
      </div>

      <span class="text-textMuted/60">➔</span>

      <!-- LANGKAH 02: Data Traveller / Hotel -->
      <div 
        :class="[
          'flex items-center gap-1.5 font-bold transition-all',
          activeStep === 2 ? 'text-primary' : isStep2Complete ? 'text-emerald-700' : 'text-textMuted'
        ]"
      >
        <span 
          :class="[
            'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors',
            isStep2Complete 
              ? 'bg-emerald-600 text-white' 
              : activeStep === 2 
                ? 'bg-primary text-onPrimary' 
                : 'bg-gray-200 text-textMuted'
          ]"
        >
          {{ isStep2Complete ? '✓' : '2' }}
        </span>
        <span>
          LANGKAH 02 <template v-if="activeStep === 2">(AKTIF)</template><br />
          <strong class="text-[10px] font-semibold text-textMuted block">
            {{ orderStore.activeTransport === 'hotel' ? 'Pemesanan Hotel' : 'Data Traveller' }}
          </strong>
        </span>
      </div>

      <span class="text-textMuted/60">➔</span>

      <!-- LANGKAH 03: Konfirmasi & Pengajuan -->
      <div 
        :class="[
          'flex items-center gap-1.5 font-semibold transition-all',
          activeStep === 3 ? 'text-primary font-bold' : 'text-textMuted'
        ]"
      >
        <span 
          :class="[
            'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors',
            activeStep === 3 ? 'bg-primary text-onPrimary' : 'bg-gray-200 text-textMuted'
          ]"
        >
          3
        </span>
        <span>
          LANGKAH 03 <template v-if="activeStep === 3">(AKTIF)</template><br />
          <strong class="text-[10px] font-normal text-textMuted block">Konfirmasi & Pengajuan</strong>
        </span>
      </div>

    </div>
  </div>
</template>