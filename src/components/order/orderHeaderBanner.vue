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
    info.sprinNumber.trim() !== '',
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
  <div
    class="relative overflow-hidden rounded-xl bg-surfaceCard p-4 sm:p-6 shadow-2xs border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5 font-body"
  >
    <!-- Header Left Info -->
    <div class="flex items-start sm:items-center gap-3.5 sm:gap-4">
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surfaceContainerLow flex items-center justify-center font-bold shrink-0"
      >
        <span :class="['material-symbols-outlined text-[24px] sm:text-[28px]', currentTab.color]">{{
          currentTab.icon
        }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-lg sm:text-xl font-bold text-textPrimary font-headline leading-snug">
            Buat Order –
            {{ orderStore.activeTransport === 'hotel' ? 'Hotel & Akomodasi' : currentTab.label }}
          </h1>
          <span
            v-if="orderStore.activeTransport !== 'hotel'"
            class="px-2 py-0.5 rounded bg-surfaceContainerHigh text-textMuted text-[10px] font-semibold uppercase shrink-0"
          >
            MODUL RESMI
          </span>
        </div>
        <p class="text-xs text-textMuted mt-1 leading-relaxed">
          {{
            orderStore.activeTransport === 'hotel'
              ? 'Portal Korporat BPJS TK • Layanan Pemesanan Hotel & Akomodasi Perjalanan Dinas'
              : 'Layanan Pemesanan Tiket Dinas Angkutan Udara Seluruh Unit Kerja BPJS Ketenagakerjaan'
          }}
        </p>
      </div>
    </div>

    <!-- Stepper Progress Bar Dinamis (Responsive Container) -->
    <div class="w-full lg:w-auto overflow-x-auto no-scrollbar pt-1 pb-1">
      <div
        class="flex items-center gap-2.5 sm:gap-3 bg-surfaceCanvas p-2.5 sm:p-3 rounded-xl text-xs border border-gray-100 min-w-max lg:min-w-0"
      >
        <!-- LANGKAH 01: Informasi Kegiatan -->
        <div
          :class="[
            'flex items-center gap-2 font-bold transition-all shrink-0',
            activeStep === 1
              ? 'text-primary'
              : isStep1Complete
                ? 'text-emerald-700'
                : 'text-textMuted',
          ]"
        >
          <span
            :class="[
              'w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[11px] sm:text-[10px] font-bold transition-colors shrink-0',
              isStep1Complete
                ? 'bg-emerald-600 text-white'
                : activeStep === 1
                  ? 'bg-primary text-onPrimary'
                  : 'bg-gray-200 text-textMuted',
            ]"
          >
            {{ isStep1Complete ? '✓' : '1' }}
          </span>
          <span class="leading-tight">
            LANGKAH 01 <template v-if="activeStep === 1">(AKTIF)</template>
            <strong class="text-[10px] font-semibold text-textMuted block"
              >Informasi Kegiatan</strong
            >
          </span>
        </div>

        <span class="text-textMuted/60 text-xs shrink-0">➔</span>

        <!-- LANGKAH 02: Data Traveller / Hotel -->
        <div
          :class="[
            'flex items-center gap-2 font-bold transition-all shrink-0',
            activeStep === 2
              ? 'text-primary'
              : isStep2Complete
                ? 'text-emerald-700'
                : 'text-textMuted',
          ]"
        >
          <span
            :class="[
              'w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[11px] sm:text-[10px] font-bold transition-colors shrink-0',
              isStep2Complete
                ? 'bg-emerald-600 text-white'
                : activeStep === 2
                  ? 'bg-primary text-onPrimary'
                  : 'bg-gray-200 text-textMuted',
            ]"
          >
            {{ isStep2Complete ? '✓' : '2' }}
          </span>
          <span class="leading-tight">
            LANGKAH 02 <template v-if="activeStep === 2">(AKTIF)</template>
            <strong class="text-[10px] font-semibold text-textMuted block">
              {{ orderStore.activeTransport === 'hotel' ? 'Pemesanan Hotel' : 'Data Traveller' }}
            </strong>
          </span>
        </div>

        <span class="text-textMuted/60 text-xs shrink-0">➔</span>

        <!-- LANGKAH 03: Konfirmasi & Pengajuan -->
        <div
          :class="[
            'flex items-center gap-2 font-semibold transition-all shrink-0',
            activeStep === 3 ? 'text-primary font-bold' : 'text-textMuted',
          ]"
        >
          <span
            :class="[
              'w-6 h-6 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[11px] sm:text-[10px] font-bold transition-colors shrink-0',
              activeStep === 3 ? 'bg-primary text-onPrimary' : 'bg-gray-200 text-textMuted',
            ]"
          >
            3
          </span>
          <span class="leading-tight">
            LANGKAH 03 <template v-if="activeStep === 3">(AKTIF)</template>
            <strong class="text-[10px] font-normal text-textMuted block"
              >Konfirmasi & Pengajuan</strong
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
