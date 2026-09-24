<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

const router = useRouter()
const editStore = useTravelOrderEditStore()

function formatRupiah(amount: number | string) {
  const num = Number(amount) || 0
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num)
}

function cancelEdit() {
  if (confirm('Apakah Anda yakin ingin membatalkan perubahan draf koreksi ini?')) {
    router.back()
  }
}

async function handleResubmit() {
  try {
    const res = await editStore.submitRevision()
    alert(res.message || 'Pengajuan Berhasil Dikirimkan Ulang!')
    router.push('/history')
  } catch (error: any) {
    alert(error.message || 'Gagal mengirim ulang perbaikan Travel Order')
  }
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl py-3 px-6 lg:px-8 z-40 font-body"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <!-- Left side: Summary totals -->
      <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span class="text-xs text-gray-500">
            <strong class="text-gray-800 font-medium"
              >{{ editStore.transports.length || 3 }} Traveller</strong
            >
            • {{ (editStore.transports.length || 3) * 2 }} Segmen Penerbangan
          </span>
        </div>
        <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 uppercase">Estimasi Total:</span>
          <span class="font-mono text-base font-bold text-emerald-700">{{
            formatRupiah(editStore.grandTotalCost || 8450000)
          }}</span>
        </div>
      </div>

      <!-- Right side: Actions -->
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          type="button"
          @click="cancelEdit"
          :disabled="editStore.isSubmitting"
          class="px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
        >
          Batal Perubahan
        </button>
        <button
          type="button"
          @click="handleResubmit"
          :disabled="editStore.isSubmitting"
          class="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span
            v-if="editStore.isSubmitting"
            class="material-symbols-outlined text-[20px] animate-spin"
            >progress_activity</span
          >
          <span v-else class="material-symbols-outlined text-[20px]">send</span>
          <span>Kirim Ulang Pengajuan (Resubmit)</span>
        </button>
      </div>
    </div>
  </div>
</template>
