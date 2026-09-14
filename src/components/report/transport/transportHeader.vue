<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <router-link to="/dashboard" class="hover:underline">BERANDA</router-link>
      <span>›</span>
      <router-link to="/reports" class="hover:underline">LAPORAN</router-link>
      <span>›</span>
      <strong class="text-textPrimary font-semibold uppercase">TRANSPORTASI</strong>
    </div>

    <!-- Header Content & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-6 rounded bg-emerald-800"></span>
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Laporan History Perjalanan Dinas – Transportasi
          </h1>
        </div>
        <p class="text-xs text-textMuted mt-1 pl-4">
          Rekapitulasi logistik tiket transportasi dinas, penyerapan anggaran perjalanan, serta audit manifest personel.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Cetak Laporan</span>
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Ekspor ke Excel (.xlsx)</span>
        </button>
      </div>
    </div>
  </div>
</template>