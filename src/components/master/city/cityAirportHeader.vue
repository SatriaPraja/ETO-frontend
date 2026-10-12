<script setup lang="ts">
import { ref } from 'vue'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import { cityAirportService } from '@/services/cityAirportService'

const props = defineProps<{
  activeTab?: 'cities' | 'airports'
  filters?: {
    search?: string
    status?: string
  }
}>()

const emit = defineEmits(['open-modal'])
const isExporting = ref(false)

async function handleExportData() {
  try {
    isExporting.value = true
    const targetType = props.activeTab || 'all'
    await cityAirportService.downloadExportExcel(targetType, props.filters)
  } catch (error: any) {
    console.error('Gagal mengunduh data Master Kota & Bandara:', error)
    alert('Gagal mengunduh data. Silakan coba beberapa saat lagi.')
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <AppBreadcrumb />
    </div>

    <!-- Header Title & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
          Master Kota & Bandara (IATA)
        </h1>
        <p class="text-xs text-textMuted mt-1">
          Kelola lokasi tujuan dinas, kode unik bandara IATA, serta pemetaan provinsi wilayah
          operasional.
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
          @click="emit('open-modal')"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Data Baru</span>
        </button>
      </div>
    </div>
  </div>
</template>
