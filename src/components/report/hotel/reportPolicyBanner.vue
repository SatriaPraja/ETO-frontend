<template>
  <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body">
    <div class="flex items-start gap-3">
      <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
        @
      </div>
      <div class="space-y-0.5">
        <h4 class="font-bold text-textPrimary font-headline">Kepatuhan Standar Biaya Masukan (SBM/SBU) Wilayah</h4>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Seluruh tarif pemesanan hotel pada bulan Mei 2026 berada dalam batas pagu hotel per kota sesuai Peraturan Direksi BPJS Ketenagakerjaan.
        </p>
      </div>
    </div>

    <button
      type="button"
      class="px-3.5 py-1.5 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary font-bold text-xs shrink-0 flex items-center gap-1.5 border border-gray-200 transition-colors self-end sm:self-center"
    >
      <span class="material-symbols-outlined text-[16px]">tune</span>
      <span>Lihat Plafon Tarif Kota</span>
    </button>
  </div>
</template>