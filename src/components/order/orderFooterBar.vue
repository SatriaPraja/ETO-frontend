<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { TravelOrderService } from '@/services/travelOrderService'
import type { CreateFlightOrderPayload } from '@/models/travelOrder'

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
    } else {
      res = await orderStore.submitFlightOrder()
      alert('Pengajuan Transportasi berhasil! Mengalihkan ke pemesanan hotel...')
    }

    emit('order-submitted', res?.data || res)
  } catch (error: any) {
    alert(`Gagal menyimpan: ${error.message}`)
  }
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-4 px-6 lg:px-8 flex items-center justify-between z-30 shadow-lg font-body"
  >
    <!-- Left Section: Metadata Biaya & Saldo -->
    <div class="flex items-center gap-6 text-xs">
      <div v-if="orderStore.activeTransport === 'hotel'">
        <span class="text-[10px] text-textMuted uppercase block font-semibold"
          >TOTAL BIAYA PEMESANAN:</span
        >
        <span class="text-xl font-extrabold text-textPrimary font-headline">
          Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
        </span>
      </div>

      <div v-else class="flex items-center gap-3">
        <span class="font-bold text-textPrimary text-sm">
          {{ orderStore.travellers.length }} Traveller
        </span>
        <span class="text-textMuted">|</span>
        <span class="text-textMuted">
          Estimasi Total Biaya:
          <strong class="text-primary text-base font-extrabold font-headline ml-1">
            Rp {{ totalEstimateCost.toLocaleString('id-ID') }}
          </strong>
        </span>
      </div>

      <div class="border-l border-gray-200 pl-6 hidden sm:block">
        <span class="text-[10px] text-textMuted uppercase block font-semibold"
          >SISA SALDO PAGU MAK:</span
        >
        <span
          :class="[
            'text-sm font-bold',
            calculatedRemainingBudget > 0 ? 'text-emerald-700' : 'text-rose-600',
          ]"
        >
          Rp {{ calculatedRemainingBudget.toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Right Section: Action Buttons -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        @click="handleSaveDraft"
        class="px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[16px]">save</span>
        <span>{{
          orderStore.activeTransport === 'hotel' ? 'Simpan sebagai Draf' : 'Batal / Simpan Draf'
        }}</span>
      </button>

      <button
        type="button"
        @click="handleSubmit"
        :disabled="orderStore.isSubmitting"
        class="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
      >
        <span
          v-if="orderStore.isSubmitting"
          class="material-symbols-outlined text-[18px] animate-spin"
          >progress_activity</span
        >
        <span v-else class="material-symbols-outlined text-[18px]">send</span>
        <span>
          {{
            orderStore.isSubmitting
              ? 'Memproses...'
              : orderStore.activeTransport === 'hotel'
                ? 'Kirim Pengajuan Hotel'
                : 'Kirim Pengajuan Transport'
          }}
        </span>
      </button>
    </div>
  </div>
</template>
