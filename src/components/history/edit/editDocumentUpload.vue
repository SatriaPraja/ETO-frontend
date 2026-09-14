<template>
  <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-surfaceCanvas border border-gray-200 flex items-center justify-center text-primary shrink-0">
        <span class="material-symbols-outlined text-[20px]">description</span>
      </div>
      <div>
        <h4 class="font-bold text-textPrimary font-headline">Dokumen Lampiran Revisi Sprin & Undangan</h4>
        <p class="text-[11px] text-textMuted">Undangan_Sosialisasi_JKP_Jatim_20Mei2026.pdf (1.8 MB)</p>
      </div>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-center">
      <button type="button" class="px-3 py-1.5 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold inline-flex items-center gap-1 transition-colors">
        <span class="material-symbols-outlined text-[15px]">visibility</span>
        <span>Lihat File</span>
      </button>
      <button type="button" class="px-3 py-1.5 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold inline-flex items-center gap-1 transition-colors">
        <span class="material-symbols-outlined text-[15px]">upload</span>
        <span>Unggah Ulang</span>
      </button>
    </div>
  </div>
</template>