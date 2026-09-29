<script setup lang="ts">
import { useBudgetStore } from '@/stores/budgetStore'

const store = useBudgetStore()

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val || 0)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- Card 1: Total Pagu DIPA 2026 -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TOTAL PAGU DIPA 2026</span>
        <div class="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">account_balance</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          {{ formatCurrency(store.stats.totalPaguDipa) }}
        </div>
        <div class="flex items-center justify-between text-[10px] text-textMuted mt-1 pt-1 border-t border-gray-100">
          <span>{{ store.stats.totalAkunCoa }} Akun COA</span>
          <span>Terdaftar di {{ store.stats.totalUnitKerja }} Unit Kerja</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Telah Terealisasi (Issued) -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TELAH TEREALISASI (ISSUED)</span>
        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">verified</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          {{ formatCurrency(store.stats.totalRealisasiIssued) }}
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-textMuted">Serapan Anggaran</span>
          <strong class="text-blue-600 font-bold">{{ store.stats.realisasiPercentage }}%</strong>
        </div>
      </div>
    </div>

    <!-- Card 3: Dalam Proses Persetujuan -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">DALAM PROSES PERSETUJUAN</span>
        <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          {{ formatCurrency(store.stats.dalamProsesPersetujuan) }}
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-amber-800 font-bold">{{ store.stats.totalPengajuanCount }} Pengajuan</span>
          <span class="text-textMuted">Komitmen tertahan ({{ store.stats.persetujuanPercentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Sisa Saldo Pagu Tersedia -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">SISA SALDO PAGU TERSEDIA</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-emerald-700 font-headline">
          {{ formatCurrency(store.stats.sisaSaldoPaguTersedia) }}
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-emerald-700 font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Status Aman
          </span>
          <strong class="text-emerald-700 font-bold">{{ store.stats.sisaPercentage }}%</strong>
        </div>
      </div>
    </div>
  </div>
</template>