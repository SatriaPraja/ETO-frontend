<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrderStore, type TransportType } from '@/stores/orderStore'

const router = useRouter()
const orderStore = useOrderStore()

const hubs = [
  {
    type: 'flight',
    title: 'Pesawat Udara',
    desc: 'Tiket Penerbangan Domestik & Internasional',
    icon: 'flight',
    color: 'bg-[#30C5F7]',
  },
  {
    type: 'train',
    title: 'Kereta Api',
    desc: 'Pemesanan KAI Eksekutif & Bisnis',
    icon: 'train',
    color: 'bg-[#FF8927]',
  },
  {
    type: 'sea',
    title: 'Kapal Laut',
    desc: 'Tiket Kapal Pelni & Ferry Resmi',
    icon: 'directions_boat',
    color: 'bg-[#0099FF]',
  },
  {
    type: 'bus',
    title: 'Bus / Travel',
    desc: 'Armada Bus Antarkota & Travel Shuttle',
    icon: 'directions_bus',
    color: 'bg-[#6A0000]',
  },
  {
    type: 'car',
    title: 'Mobil Dinas / Sewa',
    desc: 'Operasional Roda Empat Kantor',
    icon: 'directions_car',
    color: 'bg-[#00BE5F]',
  },
  {
    type: 'hotel',
    title: 'Hotel & Akomodasi',
    desc: 'Voucher Kamar Hotel Berbintang',
    icon: 'hotel',
    color: 'bg-[#930049]',
  },
]

function handleSelectOrder(type: string) {
  if (type === 'hotel') {
    orderStore.setTransport('hotel')
    router.push('/create-hotel-order')
  } else {
    orderStore.setTransport(type as TransportType)
    router.push('/create-transport-order')
  }
}
</script>

<template>
  <section class="space-y-4 font-body">
    <h2 class="text-lg font-bold text-textPrimary font-headline">Buat Order Baru</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="hub in hubs"
        :key="hub.title"
        @click="handleSelectOrder(hub.type)"
        class="group p-5 rounded-xl bg-surfaceCard shadow-xs border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer active:scale-[0.99]"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            :class="[
              'w-11 h-11 rounded-lg flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform',
              hub.color,
            ]"
          >
            <span class="material-symbols-outlined text-[24px]">{{ hub.icon }}</span>
          </div>
          <span
            class="material-symbols-outlined text-textMuted group-hover:text-primary transition-colors text-[20px]"
            >arrow_forward</span
          >
        </div>
        <div>
          <h3
            class="text-base font-bold text-textPrimary font-headline group-hover:text-primary transition-colors"
          >
            {{ hub.title }}
          </h3>
          <p class="text-xs text-textMuted mt-0.5 leading-relaxed">{{ hub.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
