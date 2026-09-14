<template>
  <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body">
    <!-- Search Input Left -->
    <div class="relative flex-1 max-w-md">
      <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
      <input
        type="text"
        placeholder="Cari kode, nama maskapai, atau kontak vendor..."
        class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
      />
    </div>

    <!-- Dropdown Filters Right -->
    <div class="flex items-center gap-2 flex-wrap">
      <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
        <option>Semua Moda Transportasi</option>
        <option>Pesawat Udara</option>
        <option>Kereta Api</option>
        <option>Kapal Laut</option>
      </select>

      <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
        <option>Semua Status</option>
        <option>Aktif</option>
        <option>Nonaktif</option>
      </select>

      <span class="text-[11px] text-textMuted font-medium pl-2">
        Total: <strong>24 Mitra</strong> (21 Aktif, 3 Nonaktif)
      </span>
    </div>
  </div>
</template>