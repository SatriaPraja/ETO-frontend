<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 font-body">
    <!-- Card 1: Distribusi Moda Rekanan -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <h3 class="font-bold text-textPrimary text-xs font-headline flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">pie_chart</span>
        <span>Distribusi Moda Rekanan</span>
      </h3>

      <div class="flex items-center gap-4 text-xs">
        <!-- Donut Ring Mockup -->
        <div class="w-20 h-20 rounded-full border-8 border-sky-500 border-t-orange-500 border-r-blue-500 shrink-0 flex items-center justify-center font-bold text-textPrimary text-xs font-headline">
          24 Total
        </div>

        <div class="space-y-1.5 flex-1">
          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-sky-500"></span> Pesawat Udara
            </span>
            <strong class="font-headline">11 (46%)</strong>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-orange-500"></span> Kereta Api
            </span>
            <strong class="font-headline">6 (25%)</strong>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span> Kapal Laut
            </span>
            <strong class="font-headline">4 (15%)</strong>
          </div>

          <div class="flex items-center justify-between text-[11px]">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span> Bus / Shuttle
            </span>
            <strong class="font-headline">3 (14%)</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Protokol Keamanan API -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between">
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between pb-1 border-b border-gray-100">
          <h3 class="font-bold text-textPrimary font-headline">Protokol Keamanan API</h3>
          <span class="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">Sinkronisasi Aman</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Integrasi pemesanan tiket otomatis e-TO dilindungi oleh enkripsi TLS 1.3 serta autentikasi OAuth 2.0 Mutual Transport. Pembaruan sertifikat token otomatis setiap 30 hari.
        </p>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <div class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
          <span class="font-bold text-textPrimary text-[11px]">e-TO Gateway Service v2.4</span>
        </div>
        <span class="text-[10px] text-textMuted font-medium">Status: 99.98% Up</span>
      </div>
    </div>

    <!-- Card 3: Bantuan & Panduan Integrasi -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between">
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between pb-1 border-b border-gray-100">
          <h3 class="font-bold text-textPrimary font-headline">Bantuan & Panduan Integrasi</h3>
          <span class="material-symbols-outlined text-textMuted text-[18px]">help_outline</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Tambahkan maskapai charter atau vendor transportasi lokal dengan mengunggah template spesifikasi kontrak PKS dan integrasi manual booking desk.
        </p>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <a href="#" class="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]">
          <span class="material-symbols-outlined text-[16px]">menu_book</span>
          <span>Dokumentasi API</span>
        </a>

        <a href="#" class="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]">
          <span class="material-symbols-outlined text-[16px]">support_agent</span>
          <span>Kontak IT Support</span>
        </a>
      </div>
    </div>
  </div>
</template>