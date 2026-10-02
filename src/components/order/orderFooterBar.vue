<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const orderStore = useOrderStore()

const emit = defineEmits<{
  (e: 'save-draft'): void
  (e: 'submit-click'): void
}>()

const totalEstimateCost = computed(() => {
  if (orderStore.activeTransport === 'hotel') {
    return orderStore.totalHotelCost
  }
  return orderStore.totalTransportCost
})

const calculatedRemainingBudget = computed(() => {
  const currentBudget = orderStore.formInfo.remainingBudget || 0
  const remaining = currentBudget - orderStore.totalCost
  return remaining < 0 ? 0 : remaining
})

function handleSaveDraft() {
  emit('save-draft')
}

function handleSubmitClick() {
  emit('submit-click')
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-3 sm:p-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 z-30 shadow-lg font-body"
  >
    <!-- Left Section -->
    <div class="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs">
      <div v-if="orderStore.activeTransport === 'hotel'" class="flex flex-col">
        <span class="text-[10px] text-textMuted uppercase font-semibold">TOTAL BIAYA HOTEL:</span>
        <span class="text-base sm:text-xl font-extrabold text-textPrimary font-headline">
          Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
        </span>
      </div>

      <div v-else class="flex items-center gap-2 sm:gap-3">
        <span class="font-bold text-textPrimary text-xs sm:text-sm whitespace-nowrap">
          {{ orderStore.travellers.length }} Traveller
        </span>
        <span class="text-textMuted">|</span>
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
          <span class="text-textMuted text-[10px] sm:text-xs hidden sm:inline">
            Estimasi Total Transportasi:
          </span>
          <strong
            class="text-primary text-sm sm:text-base font-extrabold font-headline whitespace-nowrap"
          >
            Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
          </strong>
        </div>
      </div>

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

    <!-- Right Section -->
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <button
        type="button"
        @click="handleSaveDraft"
        class="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[16px]">save</span>
        <span>{{ orderStore.activeTransport === 'hotel' ? 'Simpan Draf' : 'Batal / Draf' }}</span>
      </button>

      <button
        type="button"
        @click="handleSubmitClick"
        :disabled="orderStore.isSubmitting"
        class="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
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
                ? 'Kirim Pemesanan Hotel'
                : 'Kirim Pemesanan Transport'
          }}
        </span>
      </button>
    </div>
  </div>
</template>
