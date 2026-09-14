<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-5 font-body">
    <!-- Header Title -->
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">account_balance</span>
        <h2 class="text-base font-bold text-textPrimary font-headline">Ringkasan Kegiatan & Pembebanan Anggaran</h2>
      </div>
      <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
        ✓ DIPA 2026 Aktif
      </span>
    </div>

    <!-- Grid Data Key-Value -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-xs">
      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">NAMA KEGIATAN</span>
        <p class="font-bold text-textPrimary leading-snug">Sosialisasi Program Jaminan Kehilangan Pekerjaan (JKP) Wilayah Jatim</p>
      </div>

      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">UNIT KERJA PENGUSUL</span>
        <p class="font-bold text-textPrimary leading-snug">Kantor Wilayah Jawa Timur • Bidang Kepesertaan</p>
      </div>

      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">PEJABAT PENYETUJU (PIMPINAN UNIT)</span>
        <p class="font-bold text-textPrimary flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px] text-textMuted">person</span>
          <span>H. Mochammad Irfan, S.E., M.M.</span>
        </p>
        <span class="text-[11px] text-textMuted block">Kepala Kantor Wilayah Jawa Timur</span>
      </div>

      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">MATA ANGGARAN (COA)</span>
        <p class="font-bold text-textPrimary flex items-center gap-1.5">
          <span class="px-1.5 py-0.5 rounded bg-surfaceCanvas font-mono text-[11px]">5.2.1.04.01</span>
          <span class="text-textMuted font-normal">• Biaya Perjalanan Dinas Sosialisasi</span>
        </p>
      </div>

      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">DASAR PENUGASAN (NO. SPRIN)</span>
        <p class="font-bold text-primary flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">description</span>
          <span>SPRIN/0491/052026</span>
          <span class="text-textMuted font-normal text-[11px]">(12 Mei 2026)</span>
        </p>
      </div>

      <div class="space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">POSISI SISA PAGU ANGGARAN</span>
        <p class="font-extrabold text-emerald-700 text-sm font-headline flex items-center gap-2">
          <span>Rp 145.750.000</span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
            Aman & Tervalidasi
          </span>
        </p>
      </div>
    </div>

    <!-- Quote Block Ringkasan Tugas Sprin -->
    <div class="p-3.5 rounded-xl bg-surfaceCanvas border border-gray-100 flex items-start gap-2 text-xs">
      <span class="material-symbols-outlined text-textMuted text-[18px] shrink-0 mt-0.5">format_quote</span>
      <div class="space-y-0.5 italic text-textMuted">
        <span class="font-bold uppercase text-[10px] tracking-wider not-italic text-textPrimary block">RINGKASAN TUGAS SESUAI SPRIN:</span>
        <p>"Melaksanakan agenda evaluasi dan koordinasi sosialisasi percepatan klaim manfaat JKP bersama asosiasi pekerja dan dinas ketenagakerjaan provinsi di Surabaya, serta verifikasi kesiapan sistem digital kantor cabang terkait."</p>
      </div>
    </div>
  </div>
</template>