<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

const router = useRouter()
const authStore = useAuthStore()

// Helper Format Tanggal & Waktu
function formatDateTime(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 🟢 PERIKSA HAK AKSES USER (BOOKER PEMBUAT ATAU SUPER ADMIN)
const canAccessAction = computed(() => {
  if (!authStore.user || !props.detail) return false

  // Cek apakah user id sama dengan bookerId
  const currentUserId = String(authStore.user.id || authStore.user.id || '')
  const orderBookerId = String(props.detail.bookerId || props.detail.bookerId || '')
  const isOwnerBooker = Boolean(currentUserId && orderBookerId && currentUserId === orderBookerId)

  // Cek role SUPER ADMIN / OFFICIAL BOOKER
  const userRole = String(authStore.activeRole || authStore.activeRole || '').toUpperCase()
  const isSuperAdmin = userRole.includes('SUPER_ADMIN') || userRole.includes('SUPER ADMIN')

  return isOwnerBooker || isSuperAdmin
})

// 🟢 AKSES TOMBOL KOREKSI ORDER (Status: RETURNED & Punya Hak Akses)
const canEdit = computed(() => {
  return props.detail?.status === 'RETURNED' && canAccessAction.value
})

// 🟢 AKSES TOMBOL BATALKAN ORDER (Status Belum Selesai & Punya Hak Akses)
const canCancel = computed(() => {
  const cancellableStatuses = ['WAITING_PEJABAT', 'RETURNED', 'DRAFT']
  return cancellableStatuses.includes(props.detail?.status || '') && canAccessAction.value
})

// 🟢 NAVIGASI KE HALAMAN KOREKSI E-TO
function goToEdit() {
  if (!props.detail?.toCode) return
  const cleanCode = props.detail.toCode.replace(/\//g, '-')
  // Sesuaikan URL ini dengan path route vue-router kamu
  router.push(`/history/edit-order/${cleanCode}`)
}

// 🟢 NAVIGASI KE HALAMAN CETAK PDF
function goToPrint() {
  if (!props.detail?.toCode) return
  const cleanCode = props.detail.toCode.replace(/\//g, '-')
  router.push(`/history/print-pdf/${cleanCode}`)
}

function handleCancelOrder() {
  if (
    confirm(`Apakah Anda yakin ingin membatalkan pengajuan Travel Order ${props.detail?.toCode}?`)
  ) {
    alert('Pengajuan berhasil dibatalkan.')
  }
}
</script>

<template>
  <div
    class="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-body"
  >
    <!-- Informasional Kiri -->
    <div class="space-y-1.5">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-emerald-700 text-[22px]">assignment</span>
        <h1 class="text-xl font-bold text-gray-800 font-headline">
          {{ detail?.toCode || '—' }}
        </h1>
      </div>

      <div class="flex items-center gap-2 flex-wrap text-xs">
        <!-- Status: WAITING_PEJABAT -->
        <span
          v-if="detail?.status === 'WAITING_PEJABAT'"
          class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center gap-1 border border-blue-100"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Menunggu Persetujuan Pejabat</span>
        </span>

        <!-- Status: RETURNED (Perlu Koreksi) -->
        <span
          v-else-if="detail?.status === 'RETURNED'"
          class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] flex items-center gap-1 border border-amber-200"
        >
          <span class="material-symbols-outlined text-[13px]">assignment_return</span>
          <span>Dikembalikan (Perlu Koreksi)</span>
        </span>

        <!-- Status: APPROVED -->
        <span
          v-else-if="detail?.status === 'APPROVED'"
          class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center gap-1 border border-emerald-100"
        >
          <span class="material-symbols-outlined text-[13px]">check_circle</span>
          <span>Disetujui Penuh</span>
        </span>

        <!-- Status Default -->
        <span
          v-else
          class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200 uppercase"
        >
          {{ detail?.status || 'DRAFT' }}
        </span>

        <span
          class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase"
        >
          Level 1/2
        </span>
      </div>

      <p class="text-xs text-gray-500 flex items-center gap-1 pt-1">
        <span class="material-symbols-outlined text-[16px]">schedule</span>
        <span>
          Diajukan pada <strong>{{ formatDateTime(detail?.createdAt) }} WIB</strong> oleh
          <strong>{{ detail?.bookerNama || '-' }}</strong> ({{
            detail?.bookerRole || 'Official Booker'
          }})
        </span>
      </p>
    </div>

    <!-- Tombol Aksi Kanan -->
    <div class="flex items-center gap-2 flex-wrap shrink-0">
      <!-- Cetak PDF -->
      <button
        type="button"
        @click="goToPrint"
        class="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold inline-flex items-center gap-1.5 border border-gray-200 transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">print</span>
        <span>Cetak Formulir e-TO {{ detail?.status === 'APPROVED' ? '(Resmi)' : '(Draft)' }}</span>
      </button>

      <!-- 🟢 Tombol Koreksi Order -->
      <button
        v-if="canEdit"
        type="button"
        @click="goToEdit"
        class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">edit</span>
        <span>Koreksi Order</span>
      </button>

      <!-- 🟢 Tombol Batalkan Pengajuan -->
      <button
        v-if="canCancel"
        type="button"
        @click="handleCancelOrder"
        class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold inline-flex items-center gap-1.5 border border-red-100 transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">cancel</span>
        <span>Batalkan Pengajuan</span>
      </button>
    </div>
  </div>
</template>
