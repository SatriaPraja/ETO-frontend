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

// Generator Breadcrumb: Hanya menampilkan Beranda & Halaman Tujuan (tanpa label kategori perantara)
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
  } else if (route.path.startsWith('/reports')) {
    list.push({ label: 'Laporan Eksekutif' })
  } else if (route.path.startsWith('/master')) {
    list.push({ label: 'Administrasi Master' })
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
    class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-textMuted gap-2 font-body"
  >
    <!-- Navigasi Breadcrumbs -->
    <div class="flex items-center gap-1.5 flex-wrap">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <button
          type="button"
          @click="navigateTo(item.path)"
          :disabled="!item.path || index === breadcrumbItems.length - 1"
          :class="[
            'transition-colors font-medium',
            item.path && index !== breadcrumbItems.length - 1
              ? 'hover:text-primary cursor-pointer text-textMuted'
              : 'text-textPrimary font-bold cursor-default',
          ]"
        >
          <span>{{ item.label }}</span>
        </button>

        <!-- Pemisah ikon chevron HANYA dirender jika BUKAN item terakhir -->
        <span
          v-if="index < breadcrumbItems.length - 1"
          class="material-symbols-outlined text-[15px] text-textMuted/60 select-none"
        >
          chevron_right
        </span>
      </template>
    </div>

    <!-- Status Draf Aktif -->
    <div
      v-if="showDraftStatus || route.path.includes('create-')"
      class="flex items-center gap-2 shrink-0"
    >
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
