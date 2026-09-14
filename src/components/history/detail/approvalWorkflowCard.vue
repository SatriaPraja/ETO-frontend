<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-5 font-body">
    <!-- Header Title -->
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">account_tree</span>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">Riwayat Persetujuan</h2>
          <p class="text-[11px] text-textMuted">Workflow hierarkis otorisasi tiket dinas elektronik (SOP e-TO 2026)</p>
        </div>
      </div>
      <span class="material-symbols-outlined text-textMuted text-[18px]">verified</span>
    </div>

    <!-- Timeline Stepper Vertical -->
    <div class="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
      <!-- Step 1: Diajukan oleh Booker -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <span class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">✓</span>
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <strong class="text-textPrimary font-bold text-xs">Diajukan oleh Booker</strong>
            <span class="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">Selesai</span>
          </div>
          <p class="text-textMuted font-medium">Andi Pratama</p>
          <span class="text-[10px] text-textMuted block">14 Mei 2026 • 09:30 WIB</span>
          <p class="text-[11px] text-textMuted pt-1 italic">
            Pengajuan travel order dan booking jadwal tiket resmi direkam ke sistem e-TO.
          </p>
        </div>
      </div>

      <!-- Step 2: Menunggu Persetujuan Pejabat -->
      <div class="relative flex items-start justify-between gap-3 text-xs">
        <span class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs animate-pulse">2</span>
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <strong class="text-textPrimary font-bold text-xs">Menunggu Persetujuan Pejabat</strong>
            <span class="px-2 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">Proses</span>
          </div>
          <p class="text-textPrimary font-bold">H. Mochammad Irfan, S.E., M.M.</p>
          <span class="text-[10px] text-textMuted block">Kepala Kantor Wilayah Jawa Timur</span>

          <div class="pt-2 flex items-center gap-3">
            <span class="px-2.5 py-1 rounded bg-surfaceCanvas border border-gray-200 text-[10px] font-bold text-textMuted flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">timer</span>
              <span>SLA Persetujuan: &lt; 24 Jam Kerja</span>
            </span>
          </div>
          <span class="text-[10px] text-textMuted block pt-1">Target Otorisasi: <strong>15 Mei 2026, 09:30 WIB</strong></span>
        </div>
      </div>

      <!-- Step 3: Verifikasi Admin Travel Pusat -->
      <div class="relative flex items-start justify-between gap-3 text-xs opacity-60">
        <span class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-gray-200 text-textMuted flex items-center justify-center text-[10px] font-bold">3</span>
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <strong class="text-textPrimary font-bold text-xs">Verifikasi Admin Travel Pusat</strong>
            <span class="text-[10px] text-textMuted">Menunggu</span>
          </div>
          <p class="text-textMuted text-[11px]">Tim Administrasi Umum Kantor Pusat</p>
          <p class="text-[10px] text-textMuted">Validasi kesesuaian plafon biaya BUMN</p>
        </div>
      </div>

      <!-- Step 4: Penerbitan e-TO & Tiket/Voucher -->
      <div class="relative flex items-start justify-between gap-3 text-xs opacity-60">
        <span class="absolute -left-6 top-0 w-5 h-5 rounded-full bg-gray-200 text-textMuted flex items-center justify-center text-[10px] font-bold">4</span>
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <strong class="text-textPrimary font-bold text-xs">Penerbitan e-TO & Tiket/Voucher</strong>
            <span class="text-[10px] text-textMuted">Tahap Akhir</span>
          </div>
          <p class="text-textMuted text-[11px]">Sistem Integrasi Garuda & Santika Group</p>
        </div>
      </div>
    </div>
  </div>
</template>