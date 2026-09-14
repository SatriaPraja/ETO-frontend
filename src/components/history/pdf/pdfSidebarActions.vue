<script setup lang="ts">
function handleDownload() {
  alert('Mengunduh Berkas PDF/A-1b Tersertifikasi...')
}

function handlePrint() {
  window.print()
}

function handleEmail() {
  alert('Formulir e-TO telah dikirimkan ke email personel terdaftar.')
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Card 1: Status Dokumen -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Status Dokumen</h3>
        <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100 flex items-center gap-1">
          <span class="material-symbols-outlined text-[12px]">check_circle</span>
          <span>Disetujui Penuh</span>
        </span>
      </div>

      <div class="space-y-1.5 text-xs text-textMuted border-t border-gray-100 pt-2.5">
        <div class="flex justify-between">
          <span>Format Berkas</span>
          <strong class="text-textPrimary">PDF / PRINTABLE</strong>
        </div>
        <div class="flex justify-between">
          <span>Ukuran Berkas</span>
          <strong class="text-textPrimary">420.8 KB</strong>
        </div>
        <div class="flex justify-between">
          <span>Otorisasi Akhir</span>
          <strong class="text-textPrimary">14 Mei 2026, 16:30 WIB</strong>
        </div>
        <div class="flex justify-between items-center pt-1">
          <span>Keamanan Signature</span>
          <span class="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1">
            <span class="material-symbols-outlined text-[12px]">lock</span>
            <span>BSrE Valid</span>
          </span>
        </div>
      </div>

      <!-- Main Action Buttons -->
      <div class="space-y-2 pt-2">
        <button
          type="button"
          @click="handleDownload"
          class="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Unduh Dokumen PDF</span>
        </button>

        <button
          type="button"
          @click="handlePrint"
          class="w-full py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak Langsung (Print)</span>
        </button>

        <button
          type="button"
          @click="handleEmail"
          class="w-full py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">mail</span>
          <span>Kirim ke Email Personel</span>
        </button>
      </div>
    </div>

    <!-- Card 2: Jejak Audit & Validasi -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
        <span class="material-symbols-outlined text-primary text-[18px]">history</span>
        <h3 class="font-bold text-textPrimary text-xs font-headline">Jejak Audit & Validasi</h3>
      </div>

      <div class="space-y-3 text-xs">
        <!-- Audit 1 -->
        <div class="flex items-start gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
          <div>
            <strong class="font-bold text-textPrimary block text-[11px]">Disetujui: Kakanwil Jawa Timur</strong>
            <span class="text-[10px] text-textMuted block">H. Mochammad Irfan, S.E., M.M.</span>
            <span class="text-[9px] text-textMuted block">14 Mei 2026 • 16:30 WIB</span>
          </div>
        </div>

        <!-- Audit 2 -->
        <div class="flex items-start gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
          <div>
            <strong class="font-bold text-textPrimary block text-[11px]">Verifikasi Anggaran: Asdep Keuangan</strong>
            <span class="text-[10px] text-textMuted block">Siti Nurhaliza, Ak., M.Ak.</span>
            <span class="text-[9px] text-textMuted block">14 Mei 2026 • 14:15 WIB</span>
          </div>
        </div>

        <!-- Audit 3 -->
        <div class="flex items-start gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
          <div>
            <strong class="font-bold text-textPrimary block text-[11px]">Draf Diajukan: Official Booker</strong>
            <span class="text-[10px] text-textMuted block">Andi Pratama • NPP. 982144</span>
            <span class="text-[9px] text-textMuted block">14 Mei 2026 • 09:10 WIB</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 3: Integritas Dokumen Terjamin -->
    <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
      <span class="material-symbols-outlined text-emerald-700 text-[20px] shrink-0 mt-0.5">verified_user</span>
      <div class="space-y-0.5">
        <h4 class="font-bold text-emerald-900 font-headline text-[11px]">Integritas Dokumen Terjamin</h4>
        <p class="text-[10px] text-emerald-800 leading-relaxed">
          Dokumen ini sah secara perundang-undangan dan dilengkapi tanda tangan elektronik tersertifikasi BSrE / BPJS Ketenagakerjaan.
        </p>
      </div>
    </div>
  </div>
</template>