<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToEdit() {
  router.push('/history/edit-order/TO-2026-05-00187')
}
function goToPrint() {
  router.push('/history/print-pdf/TO-2026-05-00187')
}
</script>
<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <span class="material-symbols-outlined text-[15px]">home</span>
      <span>Beranda</span>
      <span>›</span>
      <span>Riwayat Pengajuan</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Detail Travel Order</strong>
    </div>

    <!-- Main Header Card -->
    <div
      class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
    >
      <div class="space-y-1.5">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[22px]">assignment</span>
          <h1 class="text-xl font-bold text-textPrimary font-headline">TO/2026/05/00187</h1>
        </div>

        <div class="flex items-center gap-2 flex-wrap text-xs">
          <span
            class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center gap-1 border border-blue-100"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Menunggu Persetujuan Pejabat</span>
          </span>
          <span
            class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase"
          >
            Level 1/2
          </span>
        </div>

        <p class="text-xs text-textMuted flex items-center gap-1 pt-1">
          <span class="material-symbols-outlined text-[16px]">schedule</span>
          <span
            >Diajukan pada <strong>14 Mei 2026, 09:30 WIB</strong> oleh
            <strong>Andi Pratama</strong> (Official Booker)</span
          >
        </p>
      </div>

      <!-- Action Buttons Right -->
      <div class="flex items-center gap-2 flex-wrap shrink-0">
        <button
          type="button"
          @click="goToPrint"
          class="px-3.5 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold inline-flex items-center gap-1.5 border border-gray-200 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Cetak Formulir e-TO (Draft)</span>
        </button>

        <button
          type="button"
          @click="goToEdit"
          class="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">edit</span>
          <span>Koreksi Order</span>
        </button>

        <button
          type="button"
          class="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold inline-flex items-center gap-1.5 border border-red-100 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px]">cancel</span>
          <span>Batalkan Pengajuan</span>
        </button>
      </div>
    </div>
  </div>
</template>
