<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function cancelEdit() {
  router.push('/history/order-detail/TO-2026-05-00187')
}

function submitCorrection() {
  alert('Koreksi Travel Order Berhasil Dikirim Ulang!')
  router.push('/history')
}
</script>

<template>
  <div class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-4 px-6 lg:px-8 flex items-center justify-between z-30 shadow-lg font-body">
    <div class="flex items-center gap-6 text-xs">
      <div>
        <span class="text-[10px] text-textMuted font-bold uppercase block">3 Traveller • 6 Segmen Penerbangan</span>
      </div>

      <div class="border-l border-gray-200 pl-6 hidden sm:block">
        <span class="text-[10px] text-textMuted font-bold uppercase block">ESTIMASI TOTAL:</span>
        <strong class="text-base font-extrabold text-primary font-headline">Rp 8.450.000</strong>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        type="button"
        @click="cancelEdit"
        class="px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors"
      >
        Batal Perubahan
      </button>
      <button
        type="button"
        @click="submitCorrection"
        class="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
      >
        <span class="material-symbols-outlined text-[18px]">send</span>
        <span>Kirim Ulang Pengajuan (Resubmit)</span>
      </button>
    </div>
  </div>
</template>