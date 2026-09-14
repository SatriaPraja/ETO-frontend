<template>
  <div class="w-full px-6 py-6 select-none pointer-events-none opacity-40 blur-[2px] transition-all">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-surfaceCard p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-textMuted">Total Pengajuan Aktif</span>
            <p class="text-2xl font-bold text-textPrimary font-headline">28</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">assignment</span>
          </div>
        </div>

        <div class="bg-surfaceCard p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-textMuted">Menunggu Verifikasi</span>
            <p class="text-2xl font-bold text-tertiary font-headline">12</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-tertiary">
            <span class="material-symbols-outlined">hourglass_top</span>
          </div>
        </div>

        <div class="bg-surfaceCard p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-textMuted">Persetujuan Terbit</span>
            <p class="text-2xl font-bold text-secondary font-headline">415</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-secondary">
            <span class="material-symbols-outlined">verified</span>
          </div>
        </div>

        <div class="bg-surfaceCard p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-textMuted">Realisasi Anggaran</span>
            <p class="text-2xl font-bold text-primary font-headline">68.4%</p>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">pie_chart</span>
          </div>
        </div>
      </div>

      <!-- Table Card Placeholder -->
      <div class="bg-surfaceCard rounded-xl p-6 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-textMuted">view_list</span>
            <h3 class="text-base font-bold text-textPrimary font-headline">Daftar Reservasi & Order Terkini</h3>
          </div>
          <span class="text-xs text-textMuted">Kantor Cabang Utama Jakarta Gambir</span>
        </div>
        <div class="h-48 rounded-lg bg-surfaceCanvas"></div>
      </div>
    </div>
  </div>
</template>