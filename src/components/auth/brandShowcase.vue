<template>
  <div class="w-full lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0F7B3E] via-primary to-[#033a1b] text-onPrimary flex flex-col justify-between p-8 sm:p-12 lg:p-16">
    <!-- Geometric Background Pattern -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <svg class="w-full h-full" fill="none" viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
        <circle cx="680" cy="200" opacity="0.4" r="320" stroke="#79fca5" stroke-dasharray="8 8" stroke-width="1.5"></circle>
        <path d="M-100 850 C 250 820, 450 620, 600 320 C 720 80, 880 -20, 920 -40" stroke="#ffffff" stroke-linecap="round" stroke-width="2.5"></path>
      </svg>
    </div>

    <!-- Top Section -->
    <div class="relative z-10">
      <div class="flex items-center space-x-4 mb-10">
        <div class="bg-surfaceCard p-2.5 rounded-xl shadow-md flex items-center justify-center">
          <img alt="Logo e-TO BPJS Ketenagakerjaan" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VoSKNN2BMt2t4l58UXPFOVjvvpPFdHgqSdtZ-d0S586lRdh0aUsBiebOzNT-C2WXlkwiar3JfOAwchfxZ7GfWUuvx6wZ5J6Vv0hxNvclEdyGue6cUAvC5LkKpSiGjCtt2uSmfStCMnMeQZzKGz03xB8dCm-xq8QoY3XfNnwET_6oHkxSDHYAeNykH5mZ6BehiKFgglz2qEYcuoNvXhU5tyOqrXz-EqtikZbobhk8gyvVB-kiMuVoCZiTw" />
        </div>
        <div class="flex flex-col">
          <span class="text-xs tracking-widest text-[#79fca5] uppercase font-semibold">Aplikasi Kedinasan</span>
          <span class="text-lg text-onPrimary font-bold tracking-tight font-headline">BPJS Ketenagakerjaan</span>
        </div>
      </div>
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
        <span class="material-symbols-outlined text-[#96f7ac] text-[18px]">verified_user</span>
        <span class="text-xs text-[#96f7ac] font-semibold tracking-wider uppercase">Portal Resmi e-TO v3.4 Enterprise</span>
      </div>
      <h1 class="text-3xl lg:text-[36px] lg:leading-[44px] text-white font-extrabold tracking-tight max-w-lg mb-4 font-headline">
        Sistem Manajemen Perjalanan Dinas Digital
      </h1>
      <p class="text-base text-white/80 max-w-md font-normal leading-relaxed font-body">
        Tertib Administrasi, Akurat, dan Terintegrasi untuk seluruh pegawai dan pemangku kepentingan nasional.
      </p>
    </div>

    <!-- Center Imagery Feature -->
    <div class="relative z-10 my-8">
      <div class="relative rounded-2xl overflow-hidden shadow-xl bg-black/20 p-4 backdrop-blur-md border border-white/10">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white">
          <div class="flex items-center space-x-2">
            <span class="material-symbols-outlined text-tertiaryFixed text-[20px]">flight_takeoff</span>
            <span class="text-sm font-medium text-white">Integrasi Tiket & SPPD Real-time</span>
          </div>
          <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-[#96f7ac] text-[#00210b] uppercase tracking-wider">Aktif</span>
        </div>
        <div class="w-full h-36 rounded-xl overflow-hidden relative shadow-inner">
          <div class="w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXoWn7YB8TrxbpCkktaI5dE_Clz_Vj4FDpAJAApASPFLgsmBsUeE4ggElcjStiz37KPeLIkV8YAxvDgrGLCsNiPQSmtHfhTvm9x5vfbrYe0CUPNU6D2ymsu0yoNNCmTOxZ7tRSnEEMz97T3aSI_vcJr4VV8MmrK5r-b2UBXLm7qs5Bu-X--wjE2DmFEyupueU-AJWlmj1ZmgAAx3OoVHjkkAFTR5lCJ73A6Joz6CpsCI0XWfmr6v3m')"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3.5">
            <p class="text-xs text-white font-semibold">Otomatisasi Penerbitan Surat Tugas & e-Voucher Hotel</p>
            <p class="text-xs text-white/80">Terhubung langsung ke core finance & sistem verifikasi kepatuhan internal.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Trust Metrics -->
    <div class="relative z-10 pt-4">
      <div class="grid grid-cols-3 gap-3">
        <div class="p-3 rounded-xl bg-white/10 backdrop-blur-md flex flex-col justify-between">
          <span class="material-symbols-outlined text-[#79fca5] mb-2">lock</span>
          <div>
            <p class="text-[11px] text-[#79fca5] uppercase tracking-wider font-semibold">Enkripsi Data</p>
            <p class="text-sm text-white font-bold">256-bit AES</p>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-white/10 backdrop-blur-md flex flex-col justify-between">
          <span class="material-symbols-outlined text-[#96f7ac] mb-2">hub</span>
          <div>
            <p class="text-[11px] text-[#96f7ac] uppercase tracking-wider font-semibold">Arsitektur</p>
            <p class="text-sm text-white font-bold">SSO Terintegrasi</p>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-white/10 backdrop-blur-md flex flex-col justify-between">
          <span class="material-symbols-outlined text-tertiaryFixed mb-2">sync_saved_locally</span>
          <div>
            <p class="text-[11px] text-tertiaryFixed uppercase tracking-wider font-semibold">Sinkronisasi</p>
            <p class="text-sm text-white font-bold">SIPP Online</p>
          </div>
        </div>
      </div>
      <div class="mt-8 flex items-center justify-between text-white/60 text-xs font-body">
        <span>© 2026 BPJS Ketenagakerjaan</span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-[#96f7ac] inline-block animate-pulse"></span>
          Server Utama Aman
        </span>
      </div>
    </div>
  </div>
</template>