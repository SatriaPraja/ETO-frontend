<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { TravelOrderService } from '@/services/travelOrderService'
import type { CreateFlightOrderPayload } from '@/models/travelOrder'
import router from '@/router'

const orderStore = useOrderStore()

const emit = defineEmits<{
  (e: 'save-draft'): void
  (e: 'order-submitted', data: any): void
}>()

// Calculated Total Biaya
const totalEstimateCost = computed(() => {
  return orderStore.travellers.reduce((sum, item) => sum + (item.price || 0), 0)
})

// Calculated Sisa Saldo
const calculatedRemainingBudget = computed(() => {
  const currentBudget = orderStore.formInfo.remainingBudget || 0
  const remaining = currentBudget - totalEstimateCost.value
  return remaining < 0 ? 0 : remaining
})

// Action Handlers
function handleSaveDraft() {
  emit('save-draft')
}
async function handleSubmit() {
  try {
    let res: any

    // 🟢 Memanggil method store sesuai tab aktif
    if (orderStore.activeTransport === 'hotel') {
      res = await orderStore.submitHotelOrder()
      alert('Pengajuan Hotel berhasil dikirim!') 
      emit('order-submitted', res?.data || res)
      router.push('/history')
    } else {
      res = await orderStore.submitFlightOrder()
      alert('Pengajuan Transportasi berhasil! Mengalihkan ke pemesanan hotel...')
      emit('order-submitted', res?.data || res)
    }
  } catch (error: any) {
    alert(`Gagal menyimpan: ${error.message}`)
  }
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-3 sm:p-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 z-30 shadow-lg font-body"
  >
    <!-- Left Section: Metadata Biaya & Saldo -->
    <div class="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs">
      <!-- Mode Hotel -->
      <div v-if="orderStore.activeTransport === 'hotel'" class="flex flex-col">
        <span class="text-[10px] text-textMuted uppercase font-semibold">TOTAL BIAYA:</span>
        <span class="text-base sm:text-xl font-extrabold text-textPrimary font-headline">
          Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
        </span>
      </div>

      <!-- Mode Transportasi -->
      <div v-else class="flex items-center gap-2 sm:gap-3">
        <span class="font-bold text-textPrimary text-xs sm:text-sm whitespace-nowrap">
          {{ orderStore.travellers.length }} Traveller
        </span>
        <span class="text-textMuted">|</span>
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
          <span class="text-textMuted text-[10px] sm:text-xs hidden sm:inline">
            Estimasi Total Biaya:
          </span>
          <strong
            class="text-primary text-sm sm:text-base font-extrabold font-headline whitespace-nowrap"
          >
            Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
          </strong>
        </div>
      </div>

      <!-- Sisa Saldo -->
      <div class="border-l border-gray-200 pl-3 sm:pl-6 flex flex-col justify-center">
        <span class="text-[9px] sm:text-[10px] text-textMuted uppercase font-semibold">
          SISA PAGU:
        </span>
        <span
          :class="[
            'text-xs sm:text-sm font-bold whitespace-nowrap',
            calculatedRemainingBudget > 0 ? 'text-emerald-700' : 'text-rose-600',
          ]"
        >
          Rp {{ calculatedRemainingBudget.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Right Section: Action Buttons -->
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <button
        type="button"
        @click="handleSaveDraft"
        class="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[16px]">save</span>
        <span>{{ orderStore.activeTransport === 'hotel' ? 'Simpan Draf' : 'Batal / Draf' }}</span>
      </button>

      <button
        type="button"
        @click="handleSubmit"
        :disabled="orderStore.isSubmitting"
        class="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
      >
        <span
          v-if="orderStore.isSubmitting"
          class="material-symbols-outlined text-[18px] animate-spin"
        >
          progress_activity
        </span>
        <span v-else class="material-symbols-outlined text-[18px]">send</span>
        <span>
          {{
            orderStore.isSubmitting
              ? 'Memproses...'
              : orderStore.activeTransport === 'hotel'
                ? 'Kirim Pengajuan'
                : 'Kirim Pengajuan'
          }}
        </span>
      </button>
    </div>
  </div>
</template>
