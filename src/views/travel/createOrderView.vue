<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore, type TransportType } from '@/stores/orderStore'
import OrderBreadcrumb from '@/components/order/orderBreadcrumb.vue'
import OrderHeaderBanner from '@/components/order/orderHeaderBanner.vue'
import ActivityInfoSection from '@/components/order/activityInfoSection.vue'
import OrderFooterBar from '@/components/order/orderFooterBar.vue'
import DynamicTransportSegment from '@/components/order/dynamicTransportSegment.vue'
import HotelTransportSegment from '@/components/order/hotelTransportSegment.vue'

const orderStore = useOrderStore()

const transportTabs: { type: TransportType; label: string; icon: string; color: string }[] = [
  { type: 'flight', label: 'Pesawat', icon: 'flight', color: 'text-[#30C5F7]' },
  { type: 'train', label: 'Kereta Api', icon: 'train', color: 'text-[#FF8927]' },
  { type: 'sea', label: 'Kapal Laut', icon: 'directions_boat', color: 'text-[#0099FF]' },
  { type: 'bus', label: 'Bus / Travel', icon: 'directions_bus', color: 'text-[#6A0000]' },
  { type: 'car', label: 'Mobil Dinas', icon: 'directions_car', color: 'text-[#00BE5F]' },
  { type: 'hotel', label: 'Hotel', icon: 'hotel', color: 'text-[#930049]' },
]

const currentTab = computed(() => {
  return transportTabs.find((t) => t.type === orderStore.activeTransport) ?? transportTabs[0]!
})
</script>

<template>
  <div class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden">
    <!-- Sub-header Breadcrumb -->
    <OrderBreadcrumb :currentTab="currentTab" />

    <!-- Header Banner & Stepper -->
    <OrderHeaderBanner :currentTab="currentTab" />

    <!-- Section 1: Informasi Kegiatan -->
    <ActivityInfoSection />

    <!-- Section 2: Segment Dynamic Transport / Hotel -->
    <section class="bg-surfaceCard rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <HotelTransportSegment v-if="orderStore.activeTransport === 'hotel'" class="p-6" />
      <DynamicTransportSegment v-else class="p-6" />
    </section>

    <!-- Sticky Bottom Action Footer Bar -->
    <OrderFooterBar />
  </div>
</template>