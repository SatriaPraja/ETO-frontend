<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCreate() {
  router.push('/master/vendors/create')
}
</script>
<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <span>Data Master</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Maskapai & Vendor</strong>
    </div>

    <!-- Header Title & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
          Master Maskapai & Rekanan Transportasi
        </h1>
        <p class="text-xs text-textMuted mt-1">
          Kelola daftar mitra penyedia moda transportasi dinas, integrasi API, dan status aktif
          pemesanan.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Ekspor Data</span>
        </button>

        <button
          type="button"
          @click="goToCreate"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Maskapai Baru</span>
        </button>
      </div>
    </div>
  </div>
</template>
