<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- 1. Total Terdaftar -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL TERDAFTAR</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">24</span>
          <span class="text-xs text-textMuted font-medium">Berkas</span>
        </div>
      </div>
      <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100">
        <span class="material-symbols-outlined text-[22px]">folder_open</span>
      </div>
    </div>

    <!-- 2. Menunggu Verifikasi -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">MENUNGGU VERIFIKASI</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-blue-600 font-headline">5</span>
          <span class="text-xs text-textMuted font-medium">Berkas</span>
        </div>
      </div>
      <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
        <span class="material-symbols-outlined text-[22px]">hourglass_top</span>
      </div>
    </div>

    <!-- 3. Siap Berangkat (Approved) -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">SIAP BERANGKAT (APPROVED)</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-emerald-600 font-headline">12</span>
          <span class="text-xs text-textMuted font-medium">e-TO</span>
        </div>
      </div>
      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
        <span class="material-symbols-outlined text-[22px]">verified</span>
      </div>
    </div>

    <!-- 4. Perlu Tindakan (Koreksi) -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">PERLU TINDAKAN (KOREKSI)</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-amber-600 font-headline">2</span>
          <span class="text-xs text-textMuted font-medium">Revisi</span>
        </div>
      </div>
      <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
        <span class="material-symbols-outlined text-[22px]">edit_note</span>
      </div>
    </div>
  </div>
</template>