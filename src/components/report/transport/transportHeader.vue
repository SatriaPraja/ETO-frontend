<script setup lang="ts">
import { ref } from 'vue'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import { reportService } from '@/services/reportService'
import { generateTransportReportPdf } from '@/services/reportPdfService'
import type {
  ReportTransportQueryParams,
  TransportReportStats,
  TransportTransactionItem,
} from '@/models/reports'

const props = defineProps<{
  filters?: ReportTransportQueryParams
  statsData?: TransportReportStats | null
  listData?: TransportTransactionItem[]
}>()

const isExporting = ref(false)
const isPrinting = ref(false)

async function handlePrint() {
  try {
    isPrinting.value = true
    const fullListData = await reportService.getAllTransportReportForPrint(props.filters)
    generateTransportReportPdf(
      props.statsData || null,
      fullListData.length ? fullListData : props.listData || [],
    )
  } catch (error) {
    console.error('Gagal mencetak laporan transportasi:', error)
    generateTransportReportPdf(props.statsData || null, props.listData || [])
  } finally {
    isPrinting.value = false
  }
}

async function handleExportExcel() {
  try {
    isExporting.value = true
    await reportService.downloadTransportExport(props.filters)
  } catch (error: any) {
    console.error('Gagal mengunduh Laporan Transportasi:', error)
    alert('Gagal mengunduh laporan transportasi. Silakan coba beberapa saat lagi.')
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="space-y-4 font-body">
    <AppBreadcrumb />
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-6 rounded bg-emerald-800"></span>
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Laporan History Perjalanan Dinas – Transportasi
          </h1>
        </div>
        <p class="text-xs text-textMuted mt-1 pl-4">
          Rekapitulasi logistik tiket transportasi dinas, penyerapan anggaran perjalanan, serta
          audit manifest personel.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0 print:hidden">
        <button
          type="button"
          @click="handlePrint"
          :disabled="isPrinting"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <span
            class="material-symbols-outlined text-[16px]"
            :class="{ 'animate-spin': isPrinting }"
          >
            {{ isPrinting ? 'progress_activity' : 'print' }}
          </span>
          <span>{{ isPrinting ? 'Mencetak...' : 'Cetak Laporan' }}</span>
        </button>

        <button
          type="button"
          @click="handleExportExcel"
          :disabled="isExporting"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <span
            class="material-symbols-outlined text-[18px]"
            :class="{ 'animate-spin': isExporting }"
          >
            {{ isExporting ? 'progress_activity' : 'download' }}
          </span>
          <span>{{ isExporting ? 'Mengunduh...' : 'Ekspor ke Excel (.xlsx)' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
