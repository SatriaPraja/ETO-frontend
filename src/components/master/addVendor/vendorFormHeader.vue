<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <span>Data Master</span>
      <span>›</span>
      <router-link to="/master/vendors" class="hover:underline">Maskapai</router-link>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Tambah Data Baru</strong>
    </div>

    <!-- Title Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline">
          Formulir Konfigurasi Data Master Maskapai
        </h1>
        <p class="text-xs text-textMuted mt-0.5">
          Kelola kredensial penyedia moda, sub-kelas tarif SBU dinas, serta mapping hak akses booker & persetujuan unit kerja.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[10px] text-textMuted font-bold uppercase">STATUS FORM:</span>
        <span class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold font-mono">
          Draft Baru #ADM-2026-VND
        </span>
      </div>
    </div>
  </div>
</template>