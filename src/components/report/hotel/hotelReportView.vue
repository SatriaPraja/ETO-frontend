<script setup lang="ts">
import ReportHeader from './reportHeader.vue'
import ReportKpiCards from './reportKpiCards.vue'
import ReportFilterSection from './reportFilterSection.vue'
import ReportTable from './reportTable.vue'
import ReportPolicyBanner from './reportPolicyBanner.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header -->
    <ReportHeader />

    <!-- 4 Summary KPI Cards -->
    <ReportKpiCards />

    <!-- Parameter Filter Section -->
    <ReportFilterSection />

    <!-- Main Table -->
    <ReportTable />

    <!-- Bottom SBU Policy Banner -->
    <ReportPolicyBanner />
  </div>
</template>