<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
</script>

<template>
  <div class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-4 px-6 lg:px-8 flex items-center justify-between z-30 shadow-lg">
    <div class="flex items-center gap-6 text-xs">
      <div v-if="orderStore.activeTransport === 'hotel'">
        <span class="text-[10px] text-textMuted uppercase block font-semibold">TOTAL BIAYA PEMESANAN:</span>
        <span class="text-xl font-extrabold text-textPrimary font-headline">Rp 5.100.000</span>
      </div>
      <div v-else class="flex items-center gap-3">
        <span class="font-bold text-textPrimary text-sm">3 Traveller</span>
        <span class="text-textMuted">|</span>
        <span class="text-textMuted">
          Estimasi Total Biaya:
          <strong class="text-primary text-base font-extrabold font-headline ml-1">Rp 8.450.000</strong>
        </span>
      </div>

      <div class="border-l border-gray-200 pl-6 hidden sm:block">
        <span class="text-[10px] text-textMuted uppercase block font-semibold">SISA SALDO PAGU MAK:</span>
        <span class="text-sm font-bold text-emerald-700">
          {{ orderStore.activeTransport === 'hotel' ? 'Rp 140.650.000' : 'Rp 137.300.000' }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5"
      >
        <span class="material-symbols-outlined text-[16px]">save</span>
        <span>{{ orderStore.activeTransport === 'hotel' ? 'Simpan sebagai Draf' : 'Batal / Simpan Draf' }}</span>
      </button>
      <button
        type="button"
        class="px-5 py-2.5 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
      >
        <span class="material-symbols-outlined text-[18px]">send</span>
        <span>Simpan & Ajukan Travel Order</span>
      </button>
    </div>
  </div>
</template>