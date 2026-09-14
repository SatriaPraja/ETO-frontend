<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 font-body">
    <!-- Card 1: Validasi Otomatis e-TO -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between">
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2 text-emerald-800 font-bold">
          <span class="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
          <span>Validasi Otomatis e-TO</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Setiap reservasi tiket pesawat, kereta, dan hotel yang diterbitkan melalui portal ini akan memotong pagu MAK yang bersangkutan secara real-time.
        </p>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
        <span class="text-textMuted">Kaidah: Perdir BPJS Ketenagakerjaan No. 14/2024</span>
        <a href="#" class="font-bold text-primary hover:underline">Pelajari</a>
      </div>
    </div>

    <!-- Card 2: Ambang Peringatan Kritis -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between">
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2 text-amber-800 font-bold">
          <span class="material-symbols-outlined text-amber-600 text-[20px]">warning</span>
          <span>Ambang Peringatan Kritis</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Akun mata anggaran dengan sisa &lt;20% secara otomatis mewajibkan persetujuan khusus Kepala Kantor Cabang / Deputi Direktur Wilayah sebelum tiket di-issue.
        </p>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
        <span class="text-textMuted">Notifikasi Email: Aktif ke PIC Anggaran</span>
        <a href="#" class="font-bold text-primary hover:underline">Konfigurasi</a>
      </div>
    </div>

    <!-- Card 3: Sinkronisasi ERP SMILE -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3 flex flex-col justify-between">
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2 text-sky-800 font-bold">
          <span class="material-symbols-outlined text-sky-600 text-[20px]">sync</span>
          <span>Sinkronisasi ERP SMILE</span>
        </div>
        <p class="text-textMuted text-[11px] leading-relaxed">
          Sinkronisasi data jurnal pengeluaran riil terakhir dilakukan hari ini pukul 08:30 WIB. Selisih pagu terdeteksi: <strong>Rp 0</strong>.
        </p>
      </div>

      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
        <span class="text-textMuted">Status Jaringan SMILE: Sinkron Normal</span>
        <a href="#" class="font-bold text-primary hover:underline">Sinkron Ulang</a>
      </div>
    </div>
  </div>
</template>