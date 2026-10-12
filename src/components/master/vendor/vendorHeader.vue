<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import { vendorService } from '@/services/vendorService'
import type { VendorQueryParams } from '@/models/vendor'

const props = defineProps<{
  filters?: VendorQueryParams
}>()

const router = useRouter()
const isExporting = ref(false)

function goToCreate() {
  router.push('/master/vendors/create')
}

async function handleExportData() {
  try {
    isExporting.value = true
    await vendorService.downloadExportExcel(props.filters)
  } catch (error: any) {
    console.error('Gagal mengunduh data vendor:', error)
    alert(error.message || 'Gagal mengunduh data master maskapai & vendor.')
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <AppBreadcrumb />

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
          @click="handleExportData"
          :disabled="isExporting"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            class="material-symbols-outlined text-[16px]"
            :class="{ 'animate-spin': isExporting }"
          >
            {{ isExporting ? 'progress_activity' : 'download' }}
          </span>
          <span>{{ isExporting ? 'Mengunduh...' : 'Ekspor Data' }}</span>
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
