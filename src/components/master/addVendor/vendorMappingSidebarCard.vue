<template>
  <div class="space-y-4 font-body">
    <!-- Card 1: Mapping Hak Akses -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
        <span class="material-symbols-outlined text-primary text-[20px]">manage_accounts</span>
        <div>
          <h3 class="font-bold text-textPrimary text-xs font-headline">Mapping Hak Akses</h3>
          <p class="text-[10px] text-textMuted">Konfigurasi otoritas personel pengguna e-TO</p>
        </div>
      </div>

      <div class="space-y-3 text-xs">
        <!-- Cari Karyawan -->
        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Cari Karyawan (NPK / Nama) *</label>
          <div class="relative">
            <input
              type="text"
              value="21040889 - Raden Bagus Irawan"
              class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none focus:border-primary"
            />
            <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[16px]">badge</span>
          </div>
          <span class="text-[10px] text-emerald-600 font-semibold block mt-1">✓ Pegawai Aktif - Penata Madya SDM</span>
        </div>

        <!-- Pilih Peran Sistem -->
        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Pilih Peran Sistem *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none focus:border-primary">
            <option>Official Booker (Pemesanan Mandiri)</option>
            <option>Admin Travel Kantor Pusat</option>
          </select>
        </div>

        <!-- Unit Kerja Otoritas -->
        <div class="flex flex-col">
          <label class="text-[11px] font-semibold text-textMuted mb-1">Unit Kerja Otoritas (Branch / Wilayah) *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none focus:border-primary">
            <option>Kantor Pusat - Divisi Umum & SDM</option>
            <option>Kantor Wilayah Jawa Timur</option>
          </select>
        </div>

        <!-- Kewenangan Akses Terpilih Checklist -->
        <div class="p-3 rounded-lg bg-surfaceCanvas border border-gray-100 space-y-1.5 text-[11px]">
          <span class="text-[10px] font-bold text-textMuted uppercase block">KEWENANGAN AKSES TERPILIH:</span>
          <p class="text-textPrimary flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-emerald-600 text-[14px]">check_circle</span>
            <span>Issued e-Ticket Otomatis via API Maskapai</span>
          </p>
          <p class="text-textPrimary flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-emerald-600 text-[14px]">check_circle</span>
            <span>Validasi Limit Plafon SBU & MAK Kantor Pusat</span>
          </p>
          <p class="text-textPrimary flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-emerald-600 text-[14px]">check_circle</span>
            <span>Akses Billing Statement & Invoice Korporat Bulanan</span>
          </p>
        </div>

        <!-- Button Tugaskan -->
        <button
          type="button"
          class="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">person_add</span>
          <span>Tugaskan Hak Akses User</span>
        </button>
      </div>

      <!-- User Aktif Maskapai ini -->
      <div class="pt-3 border-t border-gray-100 space-y-2 text-xs">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-textMuted uppercase">USER AKTIF MASKAPAI INI (2)</span>
          <a href="#" class="text-[10px] text-primary hover:underline font-bold">lihat semua</a>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">AP</div>
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary text-[11px]">Andi Pratama</span>
                <span class="text-[9px] text-textMuted">Booker • KC Salemba</span>
              </div>
            </div>
            <span class="text-[10px] text-emerald-600 font-bold">Aktif</span>
          </div>

          <div class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">SN</div>
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary text-[11px]">Siti Nurhaliza</span>
                <span class="text-[9px] text-textMuted">Admin Travel • KP Div. SDM</span>
              </div>
            </div>
            <span class="text-[10px] text-emerald-600 font-bold">Aktif</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Integritas Audit Internal -->
    <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs space-y-2 text-xs font-body">
      <div class="flex items-center gap-1.5 text-textPrimary font-bold">
        <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
        <span>Integritas Audit Internal</span>
      </div>
      <p class="text-textMuted text-[10px] leading-relaxed">
        Setiap perubahan konfigurasi tarif, penambahan sub-kelas tiket dinas, dan pengalihan hak akses tercatat secara kriptografis pada Log Audit e-TO untuk pemeriksaan BPK & Tim Kepatuhan.
      </p>
      <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-textMuted font-mono">
        <span>ISO 27001 BPJS Verified</span>
        <span class="text-emerald-700 font-bold">SHA-256 Enabled</span>
      </div>
    </div>
  </div>
</template>