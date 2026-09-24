<template>
  <div class="bg-surfaceCard p-6 rounded-2xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
      <span class="material-symbols-outlined text-primary text-[20px]">gavel</span>
      <h3 class="text-sm font-bold text-textPrimary font-headline">Kebijakan & Ketentuan Tiket</h3>
    </div>

    <div class="space-y-3 text-xs text-textMuted">
      <div class="flex items-start gap-2.5">
        <span class="material-symbols-outlined text-amber-500 text-[18px] shrink-0 mt-0.5"
          >schedule</span
        >
        <div>
          <strong class="text-textPrimary block font-bold text-xs">Auto-Cancellation H-2</strong>
          <span
            >Pemesanan tiket pesawat otomatis dibatalkan jika persetujuan pimpinan belum diterbitkan
            paling lambat 48 jam sebelum keberangkatan.</span
          >
        </div>
      </div>

      <div class="flex items-start gap-2.5">
        <span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5"
          >published_with_changes</span
        >
        <div>
          <strong class="text-textPrimary block font-bold text-xs"
            >Kebijakan Refund & Reschedule</strong
          >
          <span
            >Perubahan tanggal setelah tiket issued dikenakan biaya administrasi maskapai dan harus
            melalui surat nota dinas persetujuan ulang.</span
          >
        </div>
      </div>

      <div class="flex items-start gap-2.5">
        <span class="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5"
          >description</span
        >
        <div>
          <strong class="text-textPrimary block font-bold text-xs">Dokumen SOP Resmi</strong>
          <a
            href="#"
            class="text-primary font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
          >
            <span>Lihat SOP Perjalanan Dinas 2026</span>
            <span class="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
