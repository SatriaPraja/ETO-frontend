<script setup lang="ts">
import BudgetHeader from '@/components/master/budget/budgetHeader.vue'
import BudgetKpiCards from '@/components/master/budget/budgetKpiCards.vue'
import BudgetFilterBar from '@/components/master/budget/budgetFilterBar.vue'
import BudgetCoaTable from '@/components/master/budget/budgetCoaTable.vue'
import BudgetAnalyticsBottom from '@/components/master/budget/budgetAnalyticsBottom.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Title & Actions -->
    <BudgetHeader />

    <!-- 4 Summary KPI Cards -->
    <BudgetKpiCards />

    <!-- Search & Filter Bar -->
    <BudgetFilterBar />

    <!-- Main COA/MAK Data Table -->
    <BudgetCoaTable />

    <!-- 3 Bottom Integration & Audit Cards -->
    <BudgetAnalyticsBottom />
  </div>
</template>