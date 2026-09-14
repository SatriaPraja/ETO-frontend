<template>
  <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">filter_alt</span>
        <span>Parameter Filter & Pencarian Laporan</span>
      </h3>
      <span class="text-[11px] text-textMuted">Menampilkan riwayat pemesanan akomodasi aktif & arsip audit</span>
    </div>

    <!-- Grid Filter Dropdowns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
      <!-- Unit Kerja Pemohon -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Pemohon</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>Divisi Umum & SDM</option>
          <option>Deputi Dir. Jawa Timur</option>
        </select>
      </div>

      <!-- Kota Tujuan -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kota Tujuan</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>Surabaya</option>
          <option>Jakarta</option>
          <option>Bandung</option>
        </select>
      </div>

      <!-- Kategori Pencarian -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kategori Pencarian</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>Nama Hotel</option>
          <option>No. TO</option>
        </select>
      </div>

      <!-- Kata Kunci -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
          <input
            type="text"
            value="Santika Premiere"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <!-- Periode Menginap -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Periode Menginap</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">calendar_today</span>
          <input
            type="text"
            value="Mei 2026"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
          />
        </div>
      </div>

      <!-- Status Reservasi -->
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Status Reservasi</label>
        <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
          <option>Selesai</option>
          <option>Aktif</option>
          <option>Batal</option>
        </select>
      </div>
    </div>

    <!-- Active Filter Tags & Action Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[11px] text-textMuted font-semibold">Filter Aktif:</span>
        <span class="px-2.5 py-1 rounded-full bg-surfaceCanvas text-textPrimary text-[11px] font-medium flex items-center gap-1 border border-gray-200">
          <span>Kota: Surabaya</span>
          <button type="button" class="hover:text-red-500 font-bold">✕</button>
        </span>
        <span class="px-2.5 py-1 rounded-full bg-surfaceCanvas text-textPrimary text-[11px] font-medium flex items-center gap-1 border border-gray-200">
          <span>Keyword: Santika Premiere</span>
          <button type="button" class="hover:text-red-500 font-bold">✕</button>
        </span>
        <span class="px-2.5 py-1 rounded-full bg-surfaceCanvas text-textPrimary text-[11px] font-medium flex items-center gap-1 border border-gray-200">
          <span>Bulan: Mei 2026</span>
          <button type="button" class="hover:text-red-500 font-bold">✕</button>
        </span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button type="button" class="px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary text-xs font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset Filter</span>
        </button>
        <button type="button" class="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 shadow-2xs">
          <span class="material-symbols-outlined text-[16px]">search</span>
          <span>Terapkan Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>