<script setup lang="ts">
import TransportHeader from './transportHeader.vue'
import TransportKpiCards from './transportKpiCards.vue'
import TransportFilterSection from './transportFilterSection.vue'
import TransportTable from './transportTable.vue'
import TransportAnalyticsGrid from './transportAnalyticsGrid.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Breadcrumb & Main Header -->
    <TransportHeader />

    <!-- 4 Summary KPI Cards -->
    <TransportKpiCards />

    <!-- Filter Parameter Form -->
    <TransportFilterSection />

    <!-- Transport Log Data Table -->
    <TransportTable />

    <!-- Bottom Analytics: Modality Composition, Top Corridors & BPK Compliance -->
    <TransportAnalyticsGrid />
  </div>
</template>