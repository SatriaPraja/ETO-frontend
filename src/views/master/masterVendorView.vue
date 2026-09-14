<script setup lang="ts">
import VendorHeader from '@/components/master/vendor/vendorHeader.vue'
import VendorKpiCards from '@/components/master/vendor/vendorKpiCards.vue'
import VendorFilterBar from '@/components/master/vendor/vendorFilterBar.vue'
import VendorTable from '@/components/master/vendor/vendorTable.vue'
import VendorFooterAnalytics from '@/components/master/vendor/vendorFooterAnalytics.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Title & Action Buttons -->
    <VendorHeader />

    <!-- 4 KPI Summary Cards -->
    <VendorKpiCards />

    <!-- Filter & Search Bar -->
    <VendorFilterBar />

    <!-- Table Master Maskapai & Vendor -->
    <VendorTable />

    <!-- Bottom Analytics: Distribusi, Keamanan API & Panduan -->
    <VendorFooterAnalytics />
  </div>
</template>