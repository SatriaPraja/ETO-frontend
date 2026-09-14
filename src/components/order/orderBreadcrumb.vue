<script setup lang="ts">
import { useOrderStore, type TransportType } from '@/stores/orderStore'

defineProps<{
  currentTab: { type: TransportType; label: string; icon: string; color: string }
}>()

const orderStore = useOrderStore()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-textMuted gap-2">
    <div class="flex items-center gap-1.5">
      <span class="material-symbols-outlined text-[16px]">home</span>
      <span>Beranda</span>
      <span>➔</span>
      <span>Buat Order</span>
      <span>➔</span>
      <strong class="text-textPrimary font-semibold">
        {{ orderStore.activeTransport === 'hotel' ? 'Hotel & Akomodasi' : currentTab.label }}
      </strong>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="text-[11px]">
        Status: <strong class="text-textPrimary">Sesi Draf Aktif: {{ orderStore.activeTransport === 'hotel' ? 'Draft-HTL-089' : 'Draft-ORD-052' }}</strong>
      </span>
      <span class="text-[10px] text-textMuted">(Diperbarui 4 mnt lalu)</span>
    </div>
  </div>
</template>