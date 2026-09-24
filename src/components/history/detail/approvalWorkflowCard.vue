<script setup lang="ts">
import { computed } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

// Helper format tanggal dan waktu (contoh: 15 Mei 2026, 09:30 WIB)
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

// 🟢 Logic Kalkulasi Dinamis: H+3 dari tanggal pengajuan
const deadlineDateFormatted = computed(() => {
  const baseDateStr = props.detail?.createdAt || props.detail?.orderDate
  if (!baseDateStr) return '-'

  const baseDate = new Date(baseDateStr)
  // Tambahkan 3 hari
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
          <p class="text-[11px] text-textMuted pt-1 italic">
            Pengajuan travel order dan booking jadwal tiket resmi direkam ke sistem e-TO.
          </p>
        </div>
      </div>

      <!-- STEP 2: Menunggu Persetujuan Pejabat (PROSES - MUTAR BERPUTAR) -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <div
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-blue-100 p-0.5 flex items-center justify-center shadow-2xs"
        >
          <div
            class="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-[15px] animate-spin">sync</span>
          </div>
        </div>

        <div class="space-y-1.5 flex-1">
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs leading-snug">
              Menunggu Persetujuan<br />Pejabat
            </strong>
            <span class="text-blue-600 text-[11px] font-bold">Proses</span>
          </div>

          <div>
            <p class="text-textPrimary font-bold text-xs">{{ detail.approverNama || '-' }}</p>
            <span class="text-[11px] text-textMuted block leading-tight">{{
              detail.approverJabatan || '-'
            }}</span>
          </div>

          <!-- Card Informasi SLA & Tenggat Dinamis H+3 -->
          <div class="mt-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-textMuted font-medium">SLA Persetujuan:</span>
              <strong class="text-blue-700 font-bold">&lt; 3 Hari Kerja (H+3)</strong>
            </div>

            <!-- Progress Bar Animation -->
            <div class="w-full h-1.5 bg-blue-200/60 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 rounded-full w-2/5 animate-pulse"></div>
            </div>

            <div class="text-[11px] text-textMuted pt-0.5">
              <span>Tenggat Otorisasi: </span>
              <!-- 🟢 Menggunakan Nilai Kalkulasi H+3 Dinamis -->
              <strong class="text-textPrimary font-bold">{{ deadlineDateFormatted }} WIB</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: Verifikasi Admin Travel Pusat -->
      <div class="relative flex items-start justify-between gap-3 text-xs opacity-50">
        <span
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-textMuted flex items-center justify-center text-[11px] font-bold"
        >
          3
        </span>
        <div class="space-y-0.5 flex-1">
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs"
              >Verifikasi Admin Travel Pusat</strong
            >
            <span class="text-[10px] text-textMuted">Menunggu</span>
          </div>
          <p class="text-textMuted text-[11px]">Tim Administrasi Umum Kantor Pusat</p>
          <p class="text-[10px] text-textMuted">Validasi kesesuaian plafon biaya BUMN</p>
        </div>
      </div>

      <!-- STEP 4: Penerbitan e-TO & Tiket/Voucher -->
      <div class="relative flex items-start justify-between gap-3 text-xs opacity-50">
        <span
          class="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-textMuted flex items-center justify-center text-[11px] font-bold"
        >
          4
        </span>
        <div class="space-y-0.5 flex-1">
          <div class="flex items-center justify-between">
            <strong class="text-textPrimary font-bold text-xs"
              >Penerbitan e-TO & Tiket/Voucher</strong
            >
            <span class="text-[10px] text-textMuted">Tahap Akhir</span>
          </div>
          <p class="text-textMuted text-[11px]">Sistem Integrasi Garuda & Santika Group</p>
        </div>
      </div>
    </div>
  </div>
</template>
