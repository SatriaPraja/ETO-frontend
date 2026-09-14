<template>
  <div class="space-y-4 font-body">
    <!-- Grand Total Highlight Card -->
    <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[22px]">payments</span>
        <h3 class="text-sm font-bold text-textPrimary font-headline">Total Estimasi Beban Perjalanan Dinas (Tiket + Hotel):</h3>
      </div>
      <div class="text-right">
        <strong class="text-xl font-extrabold text-primary font-headline">Rp 13.550.000</strong>
        <span class="text-[10px] text-textMuted font-bold block">(IDR)</span>
      </div>
    </div>

    <!-- Ratio Usage Card -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <h4 class="text-xs font-bold text-textPrimary font-headline">Rasio Penggunaan Pagu COA 5.2.1.04.01</h4>

      <div class="flex items-center gap-4">
        <!-- Circular Progress Badge -->
        <div class="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center font-extrabold text-emerald-800 text-xs font-headline shrink-0">
          9.3%
        </div>

        <div class="space-y-1 flex-1 text-xs">
          <p class="text-textMuted text-[11px] leading-relaxed">
            Order ini mencakup <strong>9,3%</strong> dari sisa pagu sosialisasi Kanwil Jatim bulan Mei 2026. Alokasi masih dalam batas kepatuhan wajar (&lt; 25% per SPPD).
          </p>
        </div>

        <div class="text-right border-l border-gray-100 pl-4 shrink-0">
          <span class="text-[10px] font-bold text-textMuted uppercase block">SISA AKHIR SETELAH APPROVE:</span>
          <strong class="text-sm font-extrabold text-emerald-700 font-headline">Rp 132.200.000</strong>
        </div>
      </div>
    </div>
  </div>
</template>