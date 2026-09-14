<template>
  <div class="space-y-3 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <span>Beranda</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Inbox Persetujuan</strong>
    </div>

    <!-- Title & Status Badges -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
            Inbox Persetujuan
          </h1>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            5 Pengajuan Menunggu
          </span>
        </div>
        <p class="text-xs text-textMuted mt-0.5">
          Verifikasi kelayakan dinas, keabsahan Sprin, kesesuaian anggaran, dan rute perjalanan.
        </p>
      </div>

      <!-- Right Indicators -->
      <div class="flex items-center gap-3 shrink-0 text-xs">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surfaceCard border border-gray-100 shadow-2xs">
          <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
          <div>
            <span class="text-[9px] text-textMuted uppercase block font-bold">KEWENANGAN ANDA</span>
            <strong class="text-textPrimary text-[11px]">Kakacab / Kakanwil</strong>
          </div>
        </div>

        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surfaceCard border border-gray-100 shadow-2xs">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">schedule</span>
          <div>
            <span class="text-[9px] text-textMuted uppercase block font-bold">BATAS SLA</span>
            <strong class="text-textPrimary text-[11px]">≤ 24 Jam Kerja</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>