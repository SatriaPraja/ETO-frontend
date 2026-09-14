<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToNewOrder() {
  router.push('/create-order')
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <span>Beranda</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Riwayat Pengajuan</strong>
    </div>

    <!-- Header Content & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Riwayat Pengajuan Travel Order
          </h1>
          <span class="px-2.5 py-0.5 rounded-full bg-surfaceContainerLow text-primary text-xs font-semibold">
            • Tahun Anggaran 2026
          </span>
        </div>
        <p class="text-xs text-textMuted mt-1">
          Pantau status persetujuan, cetak tiket/formulir e-TO, dan lakukan koreksi pengajuan.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
        >
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Ekspor Excel</span>
        </button>
        <button
          type="button"
          @click="navigateToNewOrder"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Buat Order Baru</span>
        </button>
      </div>
    </div>
  </div>
</template>