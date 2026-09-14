<template>
  <div class="rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-textPrimary text-base font-headline">Realisasi Anggaran</h3>
      <span class="text-[11px] font-bold text-textMuted">TW-II 2026</span>
    </div>

    <div class="my-4 flex items-center justify-center gap-6">
      <!-- Donut SVG -->
      <div class="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg class="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          <circle class="text-blue-50" cx="50" cy="50" fill="transparent" r="38" stroke="currentColor" stroke-width="12"></circle>
          <circle class="text-primary" cx="50" cy="50" fill="transparent" r="38" stroke="currentColor" stroke-dasharray="238.7" stroke-dashoffset="80" stroke-width="12"></circle>
          <circle class="text-amber-500" cx="50" cy="50" fill="transparent" r="38" stroke="currentColor" stroke-dasharray="238.7" stroke-dashoffset="200" stroke-width="12"></circle>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="font-bold text-lg text-textPrimary leading-none">66%</span>
          <span class="text-[10px] text-textMuted mt-0.5">Terpakai</span>
        </div>
      </div>

      <!-- Legend -->
      <div class="space-y-1.5 text-xs">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-primary"></span>
          <span class="text-textMuted">Realisasi:</span>
          <span class="font-bold text-textPrimary">297 Juta</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
          <span class="text-textMuted">Pending:</span>
          <span class="font-bold text-textPrimary">45 Juta</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-sm bg-blue-50"></span>
          <span class="text-textMuted">Sisa:</span>
          <span class="font-bold text-textPrimary">108 Juta</span>
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