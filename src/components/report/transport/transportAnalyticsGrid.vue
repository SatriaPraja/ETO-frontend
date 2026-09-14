<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 font-body">
    <!-- Card 1: Komposisi Moda Transportasi -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Komposisi Moda Transportasi</h3>
        <span class="text-[10px] text-textMuted">Bulan Mei 2026</span>
      </div>

      <div class="space-y-3 text-xs">
        <!-- Pesawat -->
        <div>
          <div class="flex justify-between font-semibold mb-1">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span>Pesawat Udara</span>
            </span>
            <strong class="font-headline">218 Order (63.7%)</strong>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full bg-sky-500 rounded-full" style="width: 63.7%"></div>
          </div>
        </div>

        <!-- Kereta -->
        <div>
          <div class="flex justify-between font-semibold mb-1">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>Kereta Api (KAI)</span>
            </span>
            <strong class="font-headline">98 Order (28.6%)</strong>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full bg-orange-500 rounded-full" style="width: 28.6%"></div>
          </div>
        </div>

        <!-- Kendaraan Dinas / Sewa -->
        <div>
          <div class="flex justify-between font-semibold mb-1">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Kendaraan Dinas / Sewa</span>
            </span>
            <strong class="font-headline">26 Order (7.7%)</strong>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div class="h-full bg-emerald-600 rounded-full" style="width: 7.7%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Rute Terpadat (Top Corridors) -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between pb-1 border-b border-gray-100">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Rute Terpadat (Top Corridors)</h3>
        <span class="text-[10px] text-textMuted uppercase font-bold">Volume Personel</span>
      </div>

      <div class="space-y-2 text-xs">
        <!-- Rank 1 -->
        <div class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">1</span>
            <span class="font-bold text-textPrimary">Jakarta (CGK) ⇄ Surabaya (SUB)</span>
          </div>
          <strong class="font-headline font-extrabold text-textPrimary">94 Pax</strong>
        </div>

        <!-- Rank 2 -->
        <div class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded bg-gray-200 text-textMuted text-[10px] font-bold flex items-center justify-center">2</span>
            <span class="font-bold text-textPrimary">Jakarta (GMR) ➔ Bandung (BD)</span>
          </div>
          <strong class="font-headline font-extrabold text-textPrimary">62 Pax</strong>
        </div>

        <!-- Rank 3 -->
        <div class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded bg-gray-200 text-textMuted text-[10px] font-bold flex items-center justify-center">3</span>
            <span class="font-bold text-textPrimary">Surabaya (SUB) ⇄ Denpasar (DPS)</span>
          </div>
          <strong class="font-headline font-extrabold text-textPrimary">48 Pax</strong>
        </div>
      </div>
    </div>

    <!-- Card 3: Kepatuhan SBM Perjalanan Dinas -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
          <h3 class="font-bold text-textPrimary text-xs font-headline">Kepatuhan SBM Perjalanan Dinas</h3>
        </div>
        <p class="text-[11px] text-textMuted leading-relaxed">
          Standar Biaya Masukan (SBM) transportasi dinas berada pada indeks kepatuhan <strong>99.4%</strong>. Tidak ada deviasi tarif kelas bisnis yang tidak terotorisasi Dewan Direksi.
        </p>
      </div>

      <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <div>
          <span class="text-[9px] text-textMuted uppercase block font-bold">STATUS AUDIT TERAKHIR</span>
          <strong class="text-emerald-800 font-bold">Clean & Verified</strong>
        </div>
        <span class="px-2.5 py-1 rounded bg-emerald-800 text-white font-bold text-[10px]">
          BPK Certified
        </span>
      </div>
    </div>
  </div>
</template>