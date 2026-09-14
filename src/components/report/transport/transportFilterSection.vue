<template>
  <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <h3 class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">tune</span>
        <span>Filter Parameter Laporan</span>
      </h3>
      <button type="button" class="text-[11px] text-textMuted hover:text-textPrimary flex items-center gap-1 font-semibold">
        <span>Sembunyikan Filter</span>
        <span class="material-symbols-outlined text-[16px]">expand_less</span>
      </button>
    </div>

    <!-- Row 1 Filter Dropdowns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Pemohon</label>
        <div class="relative">
          <input
            type="text"
            value="Kantor Wilayah Jawa Timur"
            class="w-full h-9 px-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">expand_more</span>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kegiatan / Mata Anggaran (MAK)</label>
        <div class="relative">
          <input
            type="text"
            value="521211 - Perjalanan Dinas Biasa Pus..."
            class="w-full h-9 px-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">expand_more</span>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kategori Pencarian</label>
        <div class="relative">
          <input
            type="text"
            value="Nama Traveller / NPK"
            class="w-full h-9 px-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
          <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">expand_more</span>
        </div>
      </div>
    </div>

    <!-- Row 2 Filter Inputs & Status Checkboxes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 text-xs items-end">
      <!-- Kata Kunci -->
      <div class="lg:col-span-4 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Kata Kunci</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">search</span>
          <input
            type="text"
            value="Bambang Sugianto"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Rentang Tanggal Pengajuan -->
      <div class="lg:col-span-4 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Rentang Tanggal Pengajuan</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">calendar_today</span>
          <input
            type="text"
            value="01/05/2026 - 31/05/2026"
            class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <!-- Status Order Checkbox Pills -->
      <div class="lg:col-span-4 flex flex-col">
        <label class="text-[11px] font-semibold text-textMuted mb-1">Status Order</label>
        <div class="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
          <label class="flex items-center gap-1 cursor-pointer font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
            <input type="checkbox" checked class="accent-emerald-700" />
            <span>✓ Disetujui</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">
            <input type="checkbox" class="accent-blue-600" />
            <span>Menunggu</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer font-semibold text-textMuted">
            <input type="checkbox" />
            <span>Ditolak</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer font-semibold text-textMuted">
            <input type="checkbox" />
            <span>Dibatalkan</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Active Filter Footprint -->
    <div class="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
      <span class="text-[11px] text-textMuted font-medium">
        Ditemukan <strong>10</strong> dari <strong>342</strong> dokumen sesuai filter saat ini.
      </span>

      <div class="flex items-center gap-2">
        <button type="button" class="px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary font-semibold text-xs">
          Reset Filter
        </button>
        <button type="button" class="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 shadow-2xs">
          <span class="material-symbols-outlined text-[16px]">filter_list</span>
          <span>Terapkan Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>