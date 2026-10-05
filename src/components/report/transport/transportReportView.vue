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
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
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
