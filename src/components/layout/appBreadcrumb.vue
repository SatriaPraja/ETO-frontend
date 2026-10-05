<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

export interface BreadcrumbItem {
  label: string
  path?: string
}

const props = defineProps<{
  items?: BreadcrumbItem[]
  showDraftStatus?: boolean
}>()

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

// Label dinamis berdasarkan jenis order/transportasi yang sedang dipilih
const dynamicTransportLabel = computed(() => {
  if (route.name === 'create-travel-order') return 'Header Travel Order'
  if (route.name === 'create-hotel-order') return 'Pemesanan Hotel'

  switch (orderStore.activeTransport) {
    case 'flight':
      return 'Pemesanan Pesawat Udara'
    case 'train':
      return 'Pemesanan Kereta Api'
    case 'sea':
      return 'Pemesanan Kapal Laut'
    case 'bus':
      return 'Pemesanan Bus / Travel'
    case 'car':
      return 'Pemesanan Mobil Dinas'
    default:
      return 'Pemesanan Transportasi'
  }
})

// Generator Breadcrumb
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }

  const list: BreadcrumbItem[] = [{ label: 'Beranda', path: '/dashboard' }]

  if (route.path.startsWith('/create-travel-order')) {
    list.push({ label: 'Header Travel Order' })
  } else if (route.path.startsWith('/create-transport-order')) {
    list.push({ label: dynamicTransportLabel.value })
  } else if (route.path.startsWith('/create-hotel-order')) {
    list.push({ label: 'Pemesanan Hotel' })
  } else if (route.path.startsWith('/history')) {
    list.push({ label: 'Riwayat Pengajuan', path: '/history' })
    if (route.params.toCode) {
      list.push({ label: `Detail (${route.params.toCode})` })
    }
  } else if (route.path.startsWith('/approvals')) {
    list.push({ label: 'Inbox Persetujuan' })
  }
  // 🟢 LAPORAN EKSEKUTIF
  else if (route.path.startsWith('/reports')) {
    if (route.path === '/reports') {
      list.push({ label: 'Laporan Eksekutif' })
    } else {
      list.push({ label: 'Laporan Eksekutif', path: '/reports' })
      if (route.path.startsWith('/reports/hotel')) {
        list.push({ label: 'Hotel & Akomodasi' })
      } else if (route.path.startsWith('/reports/transport')) {
        list.push({ label: 'Transportasi' })
      }
    }
  }
  // 🟢 ADMINISTRASI MASTER (LANGSUNG KE SUB-HALAMAN)
  else if (route.path.startsWith('/master')) {
    if (route.path.startsWith('/master/vendors')) {
      list.push({ label: 'Maskapai & Vendor' })
    } else if (route.path.startsWith('/master/cities-airports')) {
      list.push({ label: 'Kota & Bandara' })
    } else if (route.path.startsWith('/master/budget')) {
      list.push({ label: 'Mata Anggaran (MAK)' })
    } else {
      list.push({ label: 'Administrasi Master' })
    }
  } else if (route.path.startsWith('/users')) {
    list.push({ label: 'Kelola User & Role' })
  }
  return list
})

function navigateTo(path?: string) {
  if (path) {
    router.push(path)
  }
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-textMuted font-body"
  >
    <!-- Breadcrumb sejajar 1 baris -->
    <div class="flex items-center gap-1.5 whitespace-nowrap overflow-x-auto no-scrollbar py-0.5">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <button
          type="button"
          @click="navigateTo(item.path)"
          :disabled="!item.path || index === breadcrumbItems.length - 1"
          :class="[
            'transition-colors inline-flex items-center',
            item.path && index !== breadcrumbItems.length - 1
              ? 'hover:text-primary cursor-pointer text-textMuted'
              : 'text-textPrimary font-semibold cursor-default',
          ]"
        >
          <span>{{ item.label }}</span>
        </button>

        <!-- Pemisah '›' -->
        <span
          v-if="index < breadcrumbItems.length - 1"
          class="text-textMuted/60 select-none px-0.5"
        >
          ›
        </span>
      </template>
    </div>

    <!-- Status Draf Aktif (Rapi di Kanan) -->
    <div
      v-if="showDraftStatus || route.path.includes('create-')"
      class="flex items-center gap-1.5 shrink-0 text-xs whitespace-nowrap"
    >
      <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
      <span class="text-[11px]">
        Status:
        <strong class="text-textPrimary font-semibold"
          >Sesi Draf Aktif: {{ orderStore.draftCode }}</strong
        >
      </span>
      <span class="text-[10px] text-textMuted hidden md:inline"
        >({{ orderStore.lastSavedTime }})</span
      >
    </div>
  </div>
</template>
