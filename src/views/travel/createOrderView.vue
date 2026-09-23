<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore, type TransportType } from '@/stores/orderStore'
import OrderBreadcrumb from '@/components/order/orderBreadcrumb.vue'
import OrderHeaderBanner from '@/components/order/orderHeaderBanner.vue'
import ActivityInfoSection from '@/components/order/activityInfoSection.vue'
import DynamicTransportSegment from '@/components/order/dynamicTransportSegment.vue'
import HotelTransportSegment from '@/components/order/hotelTransportSegment.vue'
import TravellerTableList from '@/components/order/travellerTableList.vue'
import OrderFooterBar from '@/components/order/orderFooterBar.vue'

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
  <div class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden min-h-screen bg-surfaceCanvas">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-2 space-y-6">
      <!-- Sub-header Breadcrumb -->
      <OrderBreadcrumb :currentTab="currentTab" />

      <!-- Header Banner & Stepper -->
      <OrderHeaderBanner :currentTab="currentTab" />

      <!-- Section 1: Informasi Kegiatan & Anggaran -->
      <ActivityInfoSection />

      <!-- Section 2 & 3: Moda Transportasi / Hotel & Tabel Traveller -->
      <template v-if="orderStore.activeTransport === 'hotel'">
        <section class="bg-surfaceCard rounded-2xl shadow-2xs border border-gray-100 overflow-hidden">
          <HotelTransportSegment class="p-6" />
        </section>
      </template>

      <template v-else>
        <!-- Form Penambahan Personel & Itinerary -->
        <DynamicTransportSegment />

        <!-- Tabel Keranjang Traveller Ditambahkan -->
        <TravellerTableList />
      </template>
    </div>

    <!-- Sticky Bottom Action Footer Bar -->
    <OrderFooterBar />
  </div>
</template>