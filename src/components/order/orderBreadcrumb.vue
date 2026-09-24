<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore, type TransportType } from '@/stores/orderStore'

defineProps<{
  currentTab: { type: TransportType; label: string; icon: string; color: string }
}>()

const router = useRouter()
const orderStore = useOrderStore()

function goToHome() {
  router.push('/dashboard')
}

function goToCreateOrder() {
  router.push('/create-order')
}

// Map label dinamis untuk menu "Buat Order ..."
const activeTransportLabel = computed(() => {
  switch (orderStore.activeTransport) {
    case 'flight':
      return 'Pesawat'
    case 'train':
      return 'Kereta Api'
    case 'sea':
      return 'Kapal Laut'
    case 'bus':
      return 'Bus'
    case 'car':
      return 'Mobil Dinas / Sewa'
    case 'hotel':
      return 'Hotel & Akomodasi'
    default:
      return 'Pesawat'
  }
})
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-textMuted gap-2 font-body"
  >
    <!-- Navigasi Breadcrumbs Dinamis -->
    <div class="flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        @click="goToHome"
        class="hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
      >
        <span>Beranda</span>
      </button>

      <span class="material-symbols-outlined text-[16px] text-textMuted/70 select-none"
        >chevron_right</span
      >

      <button
        type="button"
        @click="goToCreateOrder"
        class="hover:text-primary transition-colors cursor-pointer"
      >
        <span>Buat Order {{ activeTransportLabel }}</span>
      </button>
    </div>

    <!-- Status Draf Dinamis Mengikuti Store -->
    <div class="flex items-center gap-2 shrink-0">
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="text-[11px]">
        Status:
        <strong class="text-textPrimary font-semibold"
          >Sesi Draf Aktif: {{ orderStore.draftCode }}</strong
        >
      </span>
      <span class="text-[10px] text-textMuted">({{ orderStore.lastSavedTime }})</span>
    </div>
  </div>
</template>
