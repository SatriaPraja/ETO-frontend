<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()

const budget = computed(() => dashboardStore.budgetSummary)

function formatRupiahSingkat(val: number): string {
  if (!val) return '0'
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} Miliar`
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)} Juta`
  return val.toLocaleString('id-ID')
}

// Perhitungan perimeter lingkaran SVG (r = 38 => 2 * π * 38 ≈ 238.76)
const circumference = 238.7
const dashOffset = computed(() => {
  const percent = Math.min(Math.max(budget.value.percentageTerpakai || 0, 0), 100)
  return circumference - (circumference * percent) / 100
})
</script>

<template>
  <div class="rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-textPrimary text-base font-headline">Realisasi Anggaran</h3>
      <span class="text-[11px] font-bold text-textMuted">Tahun Berjalan</span>
    </div>

    <div class="my-4 flex items-center justify-center gap-6">
      <!-- Donut SVG Dynamic -->
      <div class="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg class="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            class="text-blue-50" 
            cx="50" 
            cy="50" 
            fill="transparent" 
            r="38" 
            stroke="currentColor" 
            stroke-width="12" 
          />
          <circle 
            class="text-primary transition-all duration-500" 
            cx="50" 
            cy="50" 
            fill="transparent" 
            r="38" 
            stroke="currentColor" 
            stroke-width="12" 
            :stroke-dasharray="circumference" 
            :stroke-dashoffset="dashOffset" 
            stroke-linecap="round" 
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="font-bold text-lg text-textPrimary leading-none">
            {{ budget.percentageTerpakai }}%
          </span>
          <span class="text-[10px] text-textMuted mt-0.5">Terpakai</span>
        </div>
      </div>

      <!-- Legend -->
      <div class="space-y-1.5 text-xs">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
          <span class="text-textMuted">Realisasi:</span>
          <span class="font-bold text-textPrimary">{{ formatRupiahSingkat(budget.realisasi) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
          <span class="text-textMuted">Pending:</span>
          <span class="font-bold text-textPrimary">{{ formatRupiahSingkat(budget.pending) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-blue-50"></span>
          <span class="text-textMuted">Sisa:</span>
          <span class="font-bold text-textPrimary">{{ formatRupiahSingkat(budget.sisa) }}</span>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="w-full py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-semibold transition-colors"
    >
      Rincian Pos Anggaran Unit
    </button>
  </div>
</template>