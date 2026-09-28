<script setup lang="ts">
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()

function formatRupiah(amount?: number) {
  const num = Number(amount) || 0
  return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num)}`
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- Card 1: Total Pengajuan -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TOTAL PENGAJUAN</span>
        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">description</span>
        </div>
      </div>
      <div>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">
            {{ reportStore.transportStats.totalPengajuan }}
          </span>
          <span class="text-xs font-semibold text-textMuted">Order</span>
        </div>
        <span class="text-[10px] text-emerald-600 font-bold block mt-1">↗ +12.4% dari bulan lalu</span>
      </div>
    </div>

    <!-- Card 2: Disetujui Resmi -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">DISETUJUI RESMI</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">verified</span>
        </div>
      </div>
      <div>
        <div class="flex items-baseline gap-1.5">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">
            {{ reportStore.transportStats.disetujuiResmi }}
          </span>
          <span class="text-xs font-bold text-emerald-600">
            ({{ reportStore.transportStats.totalPengajuan > 0 
                  ? Math.round((reportStore.transportStats.disetujuiResmi / reportStore.transportStats.totalPengajuan) * 100) 
                  : 0 }}%)
          </span>
        </div>
        <div class="flex items-center gap-2 text-[10px] text-textMuted block mt-1">
          <span>✓ {{ reportStore.transportStats.menunggu }} Menunggu</span>
          <span>•</span>
          <span>{{ reportStore.transportStats.ditolak }} Ditolak</span>
        </div>
      </div>
    </div>

    <!-- Card 3: Total Personil -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TOTAL PERSONIL</span>
        <div class="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">group</span>
        </div>
      </div>
      <div>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">
            {{ reportStore.transportStats.totalPersonel }}
          </span>
          <span class="text-xs font-semibold text-textMuted">Traveller</span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">
          {{ reportStore.transportStats.internalBPJS }} Pegawai Tetap • {{ reportStore.transportStats.eksternalTamu }} Non-Organik
        </span>
      </div>
    </div>

    <!-- Card 4: Realisasi Anggaran -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">REALISASI ANGGARAN</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">payments</span>
        </div>
      </div>
      <div>
        <div class="text-lg lg:text-xl font-extrabold text-emerald-800 font-headline leading-tight">
          {{ formatRupiah(reportStore.transportStats.realisasiAnggaran) }}
        </div>
        <span class="text-[10px] text-textMuted block mt-1">
          Sisa Pagu Nasional: <strong>Rp 3.751.500.000</strong>
        </span>
      </div>
    </div>
  </div>
</template>