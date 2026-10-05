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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-body">
    <!-- Card 1: Total Pagu DIPA 2026 -->
    <div
      class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider truncate">
          TOTAL PAGU DIPA 2026
        </span>
        <div
          class="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-[18px]">account_balance</span>
        </div>
      </div>
      <div>
        <div
          class="text-base sm:text-lg lg:text-base xl:text-lg font-extrabold text-textPrimary font-headline truncate"
          :title="formatCurrency(store.stats.totalPaguDipa)"
        >
          {{ formatCurrency(store.stats.totalPaguDipa) }}
        </div>
        <div
          class="flex items-center justify-between text-[10px] text-textMuted mt-2 pt-1.5 border-t border-gray-100 gap-1"
        >
          <span class="truncate">{{ store.stats.totalAkunCoa }} Akun COA</span>
          <span class="truncate shrink-0"
            >Terdaftar di {{ store.stats.totalUnitKerja }} Unit Kerja</span
          >
        </div>
      </div>
    </div>

    <!-- Card 2: Telah Terealisasi (Issued) -->
    <div
      class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider truncate">
          TELAH TEREALISASI (ISSUED)
        </span>
        <div
          class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-[18px]">verified</span>
        </div>
      </div>
      <div>
        <div
          class="text-base sm:text-lg lg:text-base xl:text-lg font-extrabold text-textPrimary font-headline truncate"
          :title="formatCurrency(store.stats.totalRealisasiIssued)"
        >
          {{ formatCurrency(store.stats.totalRealisasiIssued) }}
        </div>
        <div
          class="flex items-center justify-between text-[10px] mt-2 pt-1.5 border-t border-gray-100 gap-1"
        >
          <span class="text-textMuted truncate">Serapan Anggaran</span>
          <strong class="text-blue-600 font-bold shrink-0"
            >{{ store.stats.realisasiPercentage }}%</strong
          >
        </div>
      </div>
    </div>

    <!-- Card 3: Dalam Proses Persetujuan -->
    <div
      class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider truncate">
          PROSES PERSETUJUAN
        </span>
        <div
          class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
        </div>
      </div>
      <div>
        <div
          class="text-base sm:text-lg lg:text-base xl:text-lg font-extrabold text-textPrimary font-headline truncate"
          :title="formatCurrency(store.stats.dalamProsesPersetujuan)"
        >
          {{ formatCurrency(store.stats.dalamProsesPersetujuan) }}
        </div>
        <div
          class="flex items-center justify-between text-[10px] mt-2 pt-1.5 border-t border-gray-100 gap-1"
        >
          <span class="text-amber-800 font-bold truncate"
            >{{ store.stats.totalPengajuanCount }} Pengajuan</span
          >
          <span class="text-textMuted truncate shrink-0"
            >Komitmen ({{ store.stats.persetujuanPercentage }}%)</span
          >
        </div>
      </div>
    </div>

    <!-- Card 4: Sisa Saldo Pagu Tersedia -->
    <div
      class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider truncate">
          SISA SALDO TERSEDIA
        </span>
        <div
          class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
        </div>
      </div>
      <div>
        <div
          class="text-base sm:text-lg lg:text-base xl:text-lg font-extrabold text-emerald-700 font-headline truncate"
          :title="formatCurrency(store.stats.sisaSaldoPaguTersedia)"
        >
          {{ formatCurrency(store.stats.sisaSaldoPaguTersedia) }}
        </div>
        <div
          class="flex items-center justify-between text-[10px] mt-2 pt-1.5 border-t border-gray-100 gap-1"
        >
          <span class="text-emerald-700 font-bold flex items-center gap-1 truncate">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span> Status Aman
          </span>
          <strong class="text-emerald-700 font-bold shrink-0"
            >{{ store.stats.sisaPercentage }}%</strong
          >
        </div>
      </div>
    </div>
  </div>
</template>
