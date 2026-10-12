<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ReportHeader from './reportHeader.vue'
import ReportKpiCards from './reportKpiCards.vue'
import ReportFilterSection from './reportFilterSection.vue'
import ReportTable from './reportTable.vue'
import ReportPolicyBanner from './reportPolicyBanner.vue'
import { reportService } from '@/services/reportService'
import type {
  ReportHotelQueryParams,
  HotelReportStats,
  HotelTransactionItem,
} from '@/models/reports'

// 1. State Filter sesuai model ReportHotelQueryParams
const filters = ref<ReportHotelQueryParams>({
  unitKerjaKode: '',
  cityId: null,
  searchCategory: 'hotelName',
  keyword: '',
  period: '',
  page: 1,
  limit: 10,
})

const statsData = ref<HotelReportStats | null>(null)
const listData = ref<HotelTransactionItem[]>([])
const isLoading = ref(false)

// 2. Fungsi Fetch Data Laporan Hotel
async function fetchHotelReport() {
  try {
    isLoading.value = true
    const res = await reportService.getHotelReport(filters.value)

    // 🟢 Membaca struktur response: res.data.stats & res.data.transactions
    if (res && res.success && res.data) {
      statsData.value = res.data.stats
      listData.value = res.data.transactions || []
    }
  } catch (error) {
    console.error('Gagal mengambil data laporan hotel:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHotelReport()
})
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header: Meneruskan statsData & listData ke ReportHeader -->
    <ReportHeader :filters="filters" :statsData="statsData" :listData="listData" />

    <!-- 4 Summary KPI Cards -->
    <ReportKpiCards :statsData="statsData" />

    <!-- Parameter Filter Section -->
    <ReportFilterSection v-model:filters="filters" @apply-filter="fetchHotelReport" />

    <!-- Main Table -->
    <ReportTable :listData="listData" :isLoading="isLoading" />

    <!-- Bottom SBU Policy Banner -->
    <ReportPolicyBanner />
  </div>
</template>
