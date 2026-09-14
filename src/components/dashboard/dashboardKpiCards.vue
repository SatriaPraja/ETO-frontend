<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <div
      class="p-5 rounded-xl bg-surfaceCard shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider"
          >Menunggu Persetujuan</span
        >
        <p class="text-2xl font-extrabold text-textPrimary mt-1 font-headline">
          3 <span class="text-xs font-normal text-textMuted">pengajuan</span>
        </p>
      </div>
      <div
        class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-tertiary"
      >
        <span class="material-symbols-outlined">hourglass_top</span>
      </div>
    </div>

    <div
      class="p-5 rounded-xl bg-surfaceCard shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider"
          >Disetujui Bulan Ini</span
        >
        <p class="text-2xl font-extrabold text-textPrimary mt-1 font-headline">
          12 <span class="text-xs font-normal text-textMuted">pengajuan</span>
        </p>
      </div>
      <div
        class="w-10 h-10 rounded-lg bg-surfaceContainerLow flex items-center justify-center text-secondary"
      >
        <span class="material-symbols-outlined">check_circle</span>
      </div>
    </div>

    <div
      class="p-5 rounded-xl bg-surfaceCard shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider"
          >Dikembalikan</span
        >
        <p class="text-2xl font-extrabold text-textPrimary mt-1 font-headline">
          2 <span class="text-xs font-normal text-textMuted">pengajuan</span>
        </p>
      </div>
      <div
        class="w-10 h-10 rounded-lg bg-tertiaryFixed flex items-center justify-center text-onTertiaryFixed"
      >
        <span class="material-symbols-outlined">assignment_return</span>
      </div>
    </div>

    <div
      class="p-5 rounded-xl bg-surfaceCard shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider">Ditolak</span>
        <p class="text-2xl font-extrabold text-textPrimary mt-1 font-headline">
          1 <span class="text-xs font-normal text-textMuted">pengajuan</span>
        </p>
      </div>
      <div
        class="w-10 h-10 rounded-lg bg-errorContainer flex items-center justify-center text-error"
      >
        <span class="material-symbols-outlined">cancel</span>
      </div>
    </div>
  </section>
</template>