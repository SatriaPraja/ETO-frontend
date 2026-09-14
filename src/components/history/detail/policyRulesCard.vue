<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <!-- Title -->
    <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
      <span class="material-symbols-outlined text-primary text-[20px]">policy</span>
      <h3 class="text-sm font-bold text-textPrimary font-headline">Kebijakan & Ketentuan Tiket</h3>
    </div>

    <!-- Items List -->
    <div class="space-y-3 text-xs">
      <!-- 1. Auto Cancellation -->
      <div class="space-y-1">
        <div class="flex items-center gap-1.5 text-textPrimary font-bold">
          <span class="material-symbols-outlined text-amber-600 text-[16px]">schedule</span>
          <span>Auto-Cancellation H-2</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed pl-5">
          Pemesanan tiket pesawat otomatis dibatalkan sistem jika persetujuan pimpinan belum diterbitkan paling lambat 48 jam sebelum keberangkatan.
        </p>
      </div>

      <!-- 2. Refund & Reschedule -->
      <div class="space-y-1">
        <div class="flex items-center gap-1.5 text-textPrimary font-bold">
          <span class="material-symbols-outlined text-primary text-[16px]">published_with_changes</span>
          <span>Kebijakan Refund & Reschedule</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed pl-5">
          Perubahan tanggal setelah tiket issued dikenakan biaya administrasi maskapai dan harus melalui surat nota dinas persetujuan ulang.
        </p>
      </div>

      <!-- 3. Dokumen SOP -->
      <div class="pt-2 border-t border-gray-100 space-y-2">
        <a href="#" class="flex items-center gap-1.5 font-bold text-primary hover:underline text-xs">
          <span class="material-symbols-outlined text-[16px]">description</span>
          <span>Dokumen SOP Resmi</span>
        </a>
        <a href="#" class="text-[11px] text-textMuted hover:underline block pl-5">
          Lihat SOP Perjalanan Dinas 2026 ↗
        </a>
      </div>
    </div>

    <!-- Helpdesk Banner -->
    <div class="pt-2">
      <p class="text-[11px] text-textMuted text-center">
        Butuh bantuan mendesak? <a href="#" class="font-bold text-primary hover:underline">Helpdesk Travel</a>
      </p>
    </div>
  </div>
</template>