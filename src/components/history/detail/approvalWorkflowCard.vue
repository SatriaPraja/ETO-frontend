<script setup lang="ts">
import { computed } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

const slaProgressPercentage = computed(() => {
  const baseDateStr = props.detail?.createdAt || props.detail?.orderDate
  if (!baseDateStr) return 0

  const createdAt = new Date(baseDateStr).getTime()
  const now = Date.now()
  const totalSlaMs = 3 * 24 * 60 * 60 * 1000 // 3 Hari dalam Milliseconds (72 Jam)

  const elapsedMs = now - createdAt
  if (elapsedMs <= 0) return 5 // Minimal 5% agar indikator garis tetap terlihat

  const percentage = Math.round((elapsedMs / totalSlaMs) * 100)

  // Batasi nilai persentase di rentang 5% hingga 100%
  return Math.min(Math.max(percentage, 5), 100)
})
// Helper format tanggal dan waktu
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

// 🟢 Logic Status per Tahapan Stepper
const currentStatus = computed(() => props.detail?.status || 'WAITING_PEJABAT')

// Step 2: Pejabat Penyetuju
const isPejabatDone = computed(() =>
  ['WAITING_ADMINTRAVEL', 'APPROVED'].includes(currentStatus.value),
)
const isPejabatPending = computed(() => currentStatus.value === 'WAITING_PEJABAT')

// Step 3: Admin Travel Pusat
const isAdminTravelDone = computed(() => currentStatus.value === 'APPROVED')
const isAdminTravelPending = computed(() => currentStatus.value === 'WAITING_ADMINTRAVEL')

// Cari Log Aksi jika ada
const pejabatLog = computed(() =>
  props.detail?.approvalLogs?.find(
    (l: any) => l.action === 'APPROVED' || l.action === 'RETURNED' || l.action === 'REJECTED',
  ),
)

// SLA H+3 Dinamis
const deadlineDateFormatted = computed(() => {
  const baseDateStr = props.detail?.createdAt || props.detail?.orderDate
  if (!baseDateStr) return '-'
  const baseDate = new Date(baseDateStr)
  baseDate.setDate(baseDate.getDate() + 3)
  return formatDateTime(baseDate.toISOString())
})
</script>

<template>
  <div class="bg-surfaceCard p-6 rounded-2xl border border-gray-100 shadow-2xs space-y-5 font-body">
    <!-- Header Title -->
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">account_tree</span>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">Riwayat Persetujuan</h2>
          <p class="text-[11px] text-textMuted">
            Workflow hierarkis otorisasi tiket dinas elektronik (SOP e-TO 2026)
          </p>
        </div>
      </div>
      <span class="material-symbols-outlined text-textMuted text-[18px]">verified</span>
    </div>

    <!-- Timeline Stepper Vertical -->
    <div
      class="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100"
    >
      <!-- STEP 1: Diajukan oleh Booker (SELESAI) -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <span
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px] font-bold shadow-2xs"
        >
          ✓
        </span>
        <div class="space-y-0.5 flex-1">
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs">Diajukan oleh Booker</strong>
            <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold"
              >Selesai</span
            >
          </div>
          <p class="text-textMuted font-medium text-xs">{{ detail.bookerNama || '-' }}</p>
          <span class="text-[10px] text-textMuted block"
            >{{ formatDateTime(detail.createdAt) }} WIB</span
          >
        </div>
      </div>

      <!-- STEP 2: Persetujuan Pejabat / Kakanwil -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <!-- Icon Dinamis (Centang Hijau jika Selesai, Mutar Biru jika Proses) -->
        <span
          v-if="isPejabatDone"
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px] font-bold shadow-2xs"
        >
          ✓
        </span>
        <div
          v-else-if="isPejabatPending"
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-blue-100 p-0.5 flex items-center justify-center shadow-2xs"
        >
          <div
            class="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-[15px] animate-spin">sync</span>
          </div>
        </div>
        <span
          v-else
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-textMuted flex items-center justify-center text-[11px] font-bold"
        >
          2
        </span>

        <div
          class="space-y-1 flex-1"
          :class="{ 'opacity-50': !isPejabatDone && !isPejabatPending }"
        >
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs leading-snug"
              >Persetujuan Pejabat / Kakanwil</strong
            >
            <span
              v-if="isPejabatDone"
              class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold"
              >Disetujui</span
            >
            <span v-else-if="isPejabatPending" class="text-blue-600 text-[11px] font-bold"
              >Proses</span
            >
            <span v-else class="text-[10px] text-textMuted">Menunggu</span>
          </div>

          <div>
            <p class="text-textPrimary font-bold text-xs">{{ detail.approverNama || '-' }}</p>
            <span class="text-[11px] text-textMuted block leading-tight">{{
              detail.approverJabatan || '-'
            }}</span>
          </div>

          <!-- Card Informasi SLA & Tenggat Dinamis H+3 -->
          <div
            v-if="isPejabatPending"
            class="mt-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2"
          >
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-textMuted font-medium">SLA Persetujuan:</span>
              <strong class="text-blue-700 font-bold">&lt; 3 Hari Kerja (H+3)</strong>
            </div>

            <!-- 🟢 Progres Bar Dinamis Berdasarkan Sisa Waktu SLA -->
            <div class="w-full h-1.5 bg-blue-200/60 rounded-full overflow-hidden">
              <div
                class="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${slaProgressPercentage}%` }"
              ></div>
            </div>

            <div class="flex items-center justify-between text-[11px] text-textMuted pt-0.5">
              <span>Tenggat Otorisasi: </span>
              <strong class="text-textPrimary font-bold">{{ deadlineDateFormatted }} WIB</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: Verifikasi Admin Travel Pusat -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <span
          v-if="isAdminTravelDone"
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px] font-bold shadow-2xs"
        >
          ✓
        </span>
        <div
          v-else-if="isAdminTravelPending"
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-blue-100 p-0.5 flex items-center justify-center shadow-2xs"
        >
          <div
            class="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-[15px] animate-spin">sync</span>
          </div>
        </div>
        <span
          v-else
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-textMuted flex items-center justify-center text-[11px] font-bold"
        >
          3
        </span>

        <div
          class="space-y-0.5 flex-1"
          :class="{ 'opacity-50': !isAdminTravelDone && !isAdminTravelPending }"
        >
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs"
              >Verifikasi Admin Travel Pusat</strong
            >
            <span
              v-if="isAdminTravelDone"
              class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold"
              >Disetujui</span
            >
            <span v-else-if="isAdminTravelPending" class="text-blue-600 text-[11px] font-bold"
              >Proses</span
            >
            <span v-else class="text-[10px] text-textMuted">Menunggu</span>
          </div>
          <p class="text-textMuted text-[11px]">Tim Administrasi Umum Kantor Pusat</p>
        </div>
      </div>

      <!-- STEP 4: Penerbitan e-TO & Tiket/Voucher (Final Status APPROVED) -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <span
          v-if="currentStatus === 'APPROVED'"
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px] font-bold shadow-2xs"
        >
          ✓
        </span>
        <span
          v-else
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-textMuted flex items-center justify-center text-[11px] font-bold"
        >
          4
        </span>

        <div class="space-y-0.5 flex-1" :class="{ 'opacity-50': currentStatus !== 'APPROVED' }">
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs"
              >Penerbitan e-TO & Tiket/Voucher</strong
            >
            <span
              v-if="currentStatus === 'APPROVED'"
              class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold"
              >Selesai</span
            >
            <span v-else class="text-[10px] text-textMuted">Tahap Akhir</span>
          </div>
          <p class="text-textMuted text-[11px]">Sistem Integrasi Garuda & Santika Group</p>
        </div>
      </div>
    </div>
  </div>
</template>
