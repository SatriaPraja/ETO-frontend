<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <span>Data Master</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Mata Anggaran (COA)</strong>
    </div>

    <!-- Title & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Pengelolaan Mata Anggaran & Alokasi Pagu (COA)
          </h1>
          <span class="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>TA 2026 Aktif</span>
          </span>
        </div>
        <p class="text-xs text-textMuted mt-1">
          Monitoring saldo pagu anggaran perjalanan dinas per unit kerja dan mata anggaran kegiatan operasional BPJS Ketenagakerjaan TA 2026.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Unduh Rekap MAK</span>
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Mata Anggaran</span>
        </button>
      </div>
    </div>
  </div>
</template>