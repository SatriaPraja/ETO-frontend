<!-- transportReportView.vue -->

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useReportStore } from '@/stores/reportStore'
import transportHeader from './transportHeader.vue'
import transportKpiCards from './transportKpiCards.vue'
import transportFilterSection from './transportFilterSection.vue'
import transportAnalyticsGrid from './transportAnalyticsGrid.vue'
import transportTable from './transportTable.vue'

const reportStore = useReportStore()

// 🟢 Menggunakan nama state yang benar dari reportStore.ts
const filters = computed(() => reportStore.transportFilters)
const statsData = computed(() => reportStore.transportStats)
const listData = computed(() => reportStore.transportTransactions) // 👈 Diubah dari transportList ke transportTransactions

onMounted(async () => {
  await reportStore.fetchTransportReport()
  await reportStore.fetchTransportGlobalStats()
})
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Page dengan Binding Props Lengkap -->
    <transportHeader 
      :filters="filters"
      :statsData="statsData"
      :listData="listData"
    />

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