<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <router-link to="/reports" class="hover:underline">Laporan</router-link>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Hotel & Akomodasi</strong>
    </div>

    <!-- Header Content & Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg bg-pink-50 text-[#930049] flex items-center justify-center font-bold shrink-0">
            <span class="material-symbols-outlined text-[20px]">hotel</span>
          </span>
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Laporan Reservasi Hotel & Akomodasi Dinas
          </h1>
        </div>
        <p class="text-xs text-textMuted mt-1">
          Audit transaksi pemesanan kamar, kepatuhan Standar Biaya Umum (SBU), dan realisasi beban dinas.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Cetak Ringkasan</span>
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