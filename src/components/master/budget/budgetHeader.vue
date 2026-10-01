<script setup lang="ts">
const emit = defineEmits(['open-modal'])

function handleDownloadRekap() {
  alert('Mengunduh Rekap Mata Anggaran & Alokasi Pagu (.xlsx)...')
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted flex-wrap">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <span>Data Master</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Mata Anggaran (COA)</strong>
    </div>

    <!-- Title & Action Buttons -->
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div class="space-y-1.5">
        <!-- Wrap Flex & Items Center/Start agar badge sejajar rapi dan tidak terpotong -->
        <div class="flex items-start sm:items-center gap-2.5 flex-wrap">
          <h1 class="text-xl lg:text-2xl font-bold text-textPrimary font-headline leading-tight">
            Pengelolaan Mata Anggaran & Alokasi Pagu (COA)
          </h1>
          <span
            class="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap mt-0.5 sm:mt-0"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>TA 2026 Aktif</span>
          </span>
        </div>

        <p class="text-xs text-textMuted leading-relaxed max-w-3xl">
          Monitoring saldo pagu anggaran perjalanan dinas per unit kerja dan mata anggaran kegiatan
          operasional BPJS Ketenagakerjaan TA 2026.
        </p>
      </div>

      <!-- Action Buttons (Responsive Grid/Flex untuk Mobile) -->
      <div class="flex items-center gap-2 shrink-0 w-full sm:w-auto">
        <button
          type="button"
          @click="handleDownloadRekap"
          class="flex-1 sm:flex-none justify-center px-3.5 py-2.5 sm:py-2 rounded-xl sm:rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[18px] sm:text-[16px]">download</span>
          <span>Unduh Rekap MAK</span>
        </button>

        <button
          type="button"
          @click="emit('open-modal')"
          class="flex-1 sm:flex-none justify-center px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Mata Anggaran</span>
        </button>
      </div>
    </div>
  </div>
</template>
