<template>
  <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-body">
    <!-- Left Search & Select -->
    <div class="flex items-center gap-3 flex-1 flex-wrap">
      <div class="relative flex-1 min-w-[240px]">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
        <input
          type="text"
          placeholder="Cari nomor akun (COA), nama kegiatan, program kerja..."
          class="w-full h-9 pl-9 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
        />
      </div>

      <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
        <option>Semua Kantor / Unit Kerja</option>
        <option>Kanwil Jawa Timur</option>
        <option>Cabang Surabaya Rungkut</option>
        <option>Kantor Pusat Jakarta</option>
      </select>
    </div>

    <!-- Right Filter Badges & Counter -->
    <div class="flex items-center gap-3 shrink-0">
      <div class="flex items-center gap-2">
        <button type="button" class="px-2.5 py-1 rounded bg-surfaceCanvas text-textPrimary font-semibold text-[11px]">
          Semua Status
        </button>
        <button type="button" class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px] flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Pagu Aman (>50%)</span>
        </button>
        <button type="button" class="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-semibold text-[11px] flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Sisa Pagu &lt;20%</span>
        </button>
      </div>

      <div class="flex items-center gap-2 border-l border-gray-200 pl-3">
        <span class="text-[11px] text-textMuted">Menampilkan <strong>6</strong> dari 84 Rekening MAK</span>
        <button type="button" class="p-1 hover:bg-surfaceCanvas rounded text-textMuted" title="Refresh">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
        </button>
      </div>
    </div>
  </div>
</template>