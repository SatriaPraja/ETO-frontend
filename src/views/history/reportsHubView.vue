<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportStore } from '@/stores/reportStore'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import ReportsHeaderBanner from '@/components/report/reportsHeaderBanner.vue'
import ReportsHubCards from '@/components/report/reportsHubCards.vue'

const reportStore = useReportStore()

onMounted(async () => {
  // Panggil API secara paralel untuk mengisi angka rekapitulasi di kartu
  await Promise.allSettled([reportStore.fetchHotelReport(), reportStore.fetchTransportReport()])
})
</script>

<template>
  <div class="space-y-4 sm:space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Breadcrumb Reusable -->
    <AppBreadcrumb />

    <!-- Header Banner -->
    <ReportsHeaderBanner />

    <!-- 2 Pilihan Utama Kartu Laporan -->
    <ReportsHubCards />
  </div>
</template>
