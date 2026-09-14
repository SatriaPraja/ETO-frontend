<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrderStore, type TransportType } from '@/stores/orderStore'

import DashboardGreetingBanner from '@/components/dashboard/dashboardGreetingBanner.vue'
import DashboardKpiCards from '@/components/dashboard/dashboardKpiCards.vue'
import QuickOrderHub from '@/components/dashboard/quickOrderHub.vue'
import ActiveTravelersCard from '@/components/dashboard/activeTravelersCard.vue'
import BudgetRealizationCard from '@/components/dashboard/budgetRealizationCard.vue'
import TravelLedgerTable from '@/components/dashboard/travelLedgerTable.vue'

const router = useRouter()
const orderStore = useOrderStore()

function navigateToOrder(type: TransportType) {
  orderStore.setTransport(type)
  router.push('/create-order')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Top Banner Greeting -->
    <DashboardGreetingBanner />

    <!-- KPI Cards Grid -->
    <DashboardKpiCards />

    <!-- Quick Order Hub -->
    <QuickOrderHub @select-order="navigateToOrder" />

    <!-- SECTION TAMBAHAN: Sedang Berlangsung & Realisasi Anggaran -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- 1. Sedang Berlangsung Hari Ini -->
      <ActiveTravelersCard class="lg:col-span-2" />

      <!-- 2. Realisasi Anggaran (Donut Chart) -->
      <BudgetRealizationCard />
    </section>

    <!-- Master Ledger Table -->
    <TravelLedgerTable />
  </div>
</template>