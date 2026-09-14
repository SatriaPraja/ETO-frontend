<script setup lang="ts">
import HistoryHeader from '@/components/history/historyHeader.vue'
import HistorySummaryCards from '@/components/history/historySummaryCards.vue'
import HistoryFilterSection from '@/components/history/historyFilterSection.vue'
import HistoryTable from '@/components/history/historyTable.vue'
import PolicyBanner from '@/components/history/policyBanner.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Section -->
    <HistoryHeader />

    <!-- 4 Summary KPI Cards -->
    <HistorySummaryCards />

    <!-- Filters Section -->
    <HistoryFilterSection />

    <!-- Table Section -->
    <HistoryTable />

    <!-- Footer Policy Banner -->
    <PolicyBanner />
  </div>
</template>