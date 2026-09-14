<script setup lang="ts">
import VendorFormHeader from '@/components/master/addVendor/vendorFormHeader.vue'
import VendorInfoFormCard from '@/components/master/addVendor/vendorInfoFormCard.vue'
import VendorClassConfigCard from '@/components/master/addVendor/vendorClassConfigCard.vue'
import VendorMappingSidebarCard from '@/components/master/addVendor/vendorMappingSidebarCard.vue'
import VendorFormFooterBar from '@/components/master/addVendor/vendorFormFooterBar.vue'
</script>

<template>
  <div class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Title & Breadcrumb -->
    <VendorFormHeader />

    <!-- Split 2-Column Grid Layout (Left Forms + Right Sidebar Mapping) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Main Column (8 Span) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- 1. Informasi Maskapai / Vendor -->
        <VendorInfoFormCard />

        <!-- 2. Konfigurasi Kelas Kursi & Kelayakan SBU -->
        <VendorClassConfigCard />
      </div>

      <!-- Right Column (4 Span): Mapping Hak Akses User & Audit -->
      <div class="lg:col-span-4">
        <VendorMappingSidebarCard />
      </div>
    </div>

    <!-- Sticky Bottom Actions Bar -->
    <VendorFormFooterBar />
  </div>
</template>