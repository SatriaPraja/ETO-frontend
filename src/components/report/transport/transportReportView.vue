<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportStore } from '@/stores/reportStore'
import transportHeader from './transportHeader.vue'
import transportKpiCards from './transportKpiCards.vue'
import transportFilterSection from './transportFilterSection.vue'
import transportAnalyticsGrid from './transportAnalyticsGrid.vue'
import transportTable from './transportTable.vue'

const reportStore = useReportStore()

onMounted(() => {
  reportStore.fetchTransportReport()
})
</script>

<template>
  <div class="p-6 space-y-6 max-w-7xl mx-auto font-body bg-gray-50/30 min-h-screen">
    <!-- Header Page -->
    <transportHeader />

    <!-- KPI Cards Overview -->
    <transportKpiCards />

    <!-- Section Filter Parameter -->
    <transportFilterSection />

    <!-- Table Data Transaksi -->
    <transportTable />

    <!-- Analytics Composition & Corridors Grid -->
    <transportAnalyticsGrid />
  </div>
</template>
