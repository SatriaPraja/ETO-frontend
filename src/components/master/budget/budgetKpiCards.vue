<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- Card 1: Total Pagu DIPA 2026 -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TOTAL PAGU DIPA 2026</span>
        <div class="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">account_balance</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          Rp 4.500.000.000
        </div>
        <div class="flex items-center justify-between text-[10px] text-textMuted mt-1 pt-1 border-t border-gray-100">
          <span>84 Akun COA</span>
          <span>Terdaftar di 11 Unit Kerja</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Telah Terealisasi (Issued) -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">TELAH TEREALISASI (ISSUED)</span>
        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">verified</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          Rp 1.845.200.000
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-textMuted">Serapan Anggaran</span>
          <strong class="text-blue-600 font-bold">41.0%</strong>
        </div>
      </div>
    </div>

    <!-- Card 3: Dalam Proses Persetujuan -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">DALAM PROSES PERSETUJUAN</span>
        <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-textPrimary font-headline">
          Rp 215.000.000
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-amber-800 font-bold">12 Pengajuan</span>
          <span class="text-textMuted">Komitmen tertahan (4.8%)</span>
        </div>
      </div>
    </div>

    <!-- Card 4: Sisa Saldo Pagu Tersedia -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider">SISA SALDO PAGU TERSEDIA</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-emerald-700 font-headline">
          Rp 2.439.800.000
        </div>
        <div class="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-100">
          <span class="text-emerald-700 font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Status Aman
          </span>
          <strong class="text-emerald-700 font-bold">54.2%</strong>
        </div>
      </div>
    </div>
  </div>
</template>