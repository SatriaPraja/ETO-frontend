<template>
  <section
    class="relative overflow-hidden rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100"
  >
    <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div class="space-y-2 max-w-2xl">
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surfaceContainerLow text-primary text-xs font-semibold"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>Sistem Aktif • Terintegrasi SIPP BPJSTK</span>
        </div>
        <h1 class="text-2xl lg:text-3xl font-bold text-textPrimary font-headline tracking-tight">
          Selamat datang, <span class="text-primary">Andi Pratama</span>
        </h1>
        <p class="text-xs text-textMuted leading-relaxed">
          Pastikan pengajuan e-TO terisi lengkap dan sesuai ketentuan perjalanan dinas kantor BPJS
          Ketenagakerjaan.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-semibold transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Pedoman SPO 2026</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-semibold transition-all shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">history_edu</span>
          <span>Draft Disimpan (2)</span>
        </button>
      </div>
    </div>
  </section>
</template>