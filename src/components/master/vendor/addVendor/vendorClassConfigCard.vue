<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[20px]">airline_seat_recline_extra</span>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">2. Konfigurasi Kelas Kursi & Kelayakan SBU</h2>
          <p class="text-[11px] text-textMuted">Tentukan tingkat kabin yang sah dipilih berdasarkan otorisasi jenjang jabatan pegawai.</p>
        </div>
      </div>

      <button
        type="button"
        class="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center gap-1 border border-blue-100 transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">add_circle</span>
        <span>Tambah Kelas Baru</span>
      </button>
    </div>

    <!-- Table Classes -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3">KELAS & KODE BOOKING</th>
            <th class="p-3">HAK JENJANG SBU BPJS</th>
            <th class="p-3">PLAFON TARIF</th>
            <th class="p-3">STATUS</th>
            <th class="p-3 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <!-- Row 1: Ekonomi -->
          <tr class="hover:bg-surfaceCanvas/50">
            <td class="p-3">
              <div class="flex items-start gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                <div>
                  <strong class="font-bold text-textPrimary font-headline text-xs block">Ekonomi (Y / B / M / K)</strong>
                  <span class="text-[10px] text-textMuted">Full Service Standard Luggage 20kg</span>
                </div>
              </div>
            </td>
            <td class="p-3">
              <span class="px-2.5 py-1 rounded bg-surfaceCanvas text-textPrimary text-[11px] font-semibold border border-gray-200">
                Semua Pegawai & Staf Operasional
              </span>
            </td>
            <td class="p-3 font-bold text-textPrimary">Plafon Standar SBU</td>
            <td class="p-3">
              <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Aktif</span>
              </span>
            </td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" class="p-1 hover:text-textPrimary"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" class="p-1 hover:text-red-600"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>

          <!-- Row 2: Bisnis -->
          <tr class="hover:bg-surfaceCanvas/50">
            <td class="p-3">
              <div class="flex items-start gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                <div>
                  <strong class="font-bold text-textPrimary font-headline text-xs block">Bisnis Executive (C / J / D)</strong>
                  <span class="text-[10px] text-textMuted">Priority Baggage + Lounge Access</span>
                </div>
              </div>
            </td>
            <td class="p-3">
              <span class="px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-100">
                Khusus Direksi, Dewan Pengawas & Deputi Direktur
              </span>
            </td>
            <td class="p-3 font-bold text-textPrimary">Plafon Khusus Pimpinan</td>
            <td class="p-3">
              <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Aktif</span>
              </span>
            </td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" class="p-1 hover:text-textPrimary"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" class="p-1 hover:text-red-600"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SOP Banner -->
    <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
      <span class="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">verified_user</span>
      <p class="text-[11px] leading-relaxed">
        <strong>SOP Perjalanan Dinas BPJS Ketenagakerjaan:</strong> Pemesanan kelas bisnis wajib menyertakan lampiran persetujuan nota dinas Sekretariat Dewan Pengawas atau Direktur Utama pada tahap review e-TO.
      </p>
    </div>
  </div>
</template>