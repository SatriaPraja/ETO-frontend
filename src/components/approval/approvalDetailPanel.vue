<script setup lang="ts">
const travelerList = [
  { name: 'Bambang Sugianto', position: 'Penata Madya • Gol. IV', route: 'CGK ⇄ SUB (Pesawat)', price: 'Rp 2.850.000' },
  { name: 'Dian Lestari, S.Psi.', position: 'Asisten Ahli • Gol. III', route: 'CGK ⇄ SUB (Pesawat)', price: 'Rp 2.800.000' },
  { name: 'Rendra Wijaya', position: 'Analis TI • Gol. II', route: 'CGK ⇄ SUB (Pesawat)', price: 'Rp 2.800.000' },
]
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Header Card Detail -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-1">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-bold text-textPrimary font-headline">Detail Pengajuan:</h2>
          <span class="text-xl font-extrabold text-primary font-headline">TO/2026/05/00187</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Menunggu Persetujuan Anda</span>
          </span>
          <button type="button" class="p-1 text-textMuted hover:text-textPrimary" title="Salin Link">
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
          </button>
        </div>
      </div>

      <div class="text-xs text-textMuted flex items-center gap-3 pt-1">
        <span>Diajukan: <strong>14 Mei 2026, 09:30 WIB</strong></span>
        <span>•</span>
        <span>Versi Draft: <strong>1.0</strong></span>
      </div>
    </div>

    <!-- Alert Validasi Pagu Anggaran -->
    <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-900 shadow-2xs">
      <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
        ✓
      </div>
      <div class="space-y-0.5">
        <h3 class="font-bold text-emerald-900 text-xs font-headline">Saldo Anggaran Mencukupi & Pagu Kegiatan Valid</h3>
        <p class="text-[11px] text-emerald-800 leading-relaxed">
          Verifikasi otomatis sistem keuangan terintegrasi: Pos Anggaran Sosialisasi Kantor Wilayah Jatim 2026 memiliki sisa pagu aktif sebesar <strong class="text-emerald-900">Rp 145.750.000</strong>. Pembebanan sebesar <strong class="text-emerald-900">Rp 8.450.000</strong> aman dan berada di bawah ambang batas toleransi kuartal berjalan.
        </p>
      </div>
    </div>

    <!-- Section Informasi Kegiatan & Surat Perintah -->
    <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">assignment</span>
          <h3 class="text-sm font-bold text-textPrimary font-headline">Informasi Kegiatan & Surat Perintah</h3>
        </div>
        <span class="text-xs font-mono font-bold text-textMuted">SPRIN/0491/052026</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">NAMA KEGIATAN</span>
          <p class="font-bold text-textPrimary leading-snug">Sosialisasi Program JKP Wilayah Jatim Tahun Anggaran 2026</p>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">NOMOR SPRIN / SPPD</span>
          <p class="font-bold text-primary">SPRIN/0491/052026 <span class="text-textMuted font-normal text-[11px]">• 12 Mei 2026</span></p>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">UNIT KERJA PENGAJU</span>
          <p class="font-bold text-textPrimary">Kantor Wilayah Jawa Timur • Bidang Kepesertaan</p>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">KEPALA UNIT KERJA / ATASAN</span>
          <p class="font-bold text-textPrimary">H. Mochammad Irfan, S.E., M.M.</p>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">MATA ANGGARAN (COA)</span>
          <p class="font-bold text-textPrimary font-mono">5.2.1.04.01 <span class="font-sans font-normal text-textMuted text-[11px]">• Biaya Perjalanan Dinas Sosialisasi</span></p>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">SISA SALDO ANGGARAN</span>
          <p class="font-bold text-emerald-700">Rp 145.750.000 <span class="text-textMuted font-normal text-[11px]">(Aman)</span></p>
        </div>
      </div>

      <!-- Ringkasan Tugas -->
      <div class="p-3.5 rounded-xl bg-surfaceCanvas border border-gray-100 text-xs space-y-1">
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">RINGKASAN TUGAS DARI SPRIN</span>
        <p class="italic text-textMuted leading-relaxed">
          Pelaksanaan sosialisasi implementasi skema baru klaim Jaminan Kehilangan Pekerjaan (JKP) bersama jajaran Dinas Ketenagakerjaan Provinsi Jawa Timur serta perwakilan APINDO Kota Surabaya bertempat di Hotel Santika Premiere Gubeng.
        </p>
      </div>
    </div>

    <!-- Section Daftar Pelaksana Perjalanan (Traveller) -->
    <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">groups</span>
          <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Pelaksana Perjalanan (Traveller)</h3>
        </div>
        <span class="text-xs text-textMuted font-semibold">3 Orang • Kelas Ekonomi</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th class="p-2.5">PEGAWAI</th>
              <th class="p-2.5">JABATAN / GOLONGAN</th>
              <th class="p-2.5">RUTE & MODA</th>
              <th class="p-2.5 text-right">ESTIMASI TIKET</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="t in travelerList" :key="t.name" class="hover:bg-surfaceCanvas/50">
              <td class="p-2.5 font-bold text-textPrimary font-headline">{{ t.name }}</td>
              <td class="p-2.5 text-textMuted">{{ t.position }}</td>
              <td class="p-2.5 font-semibold text-textPrimary">{{ t.route }}</td>
              <td class="p-2.5 text-right font-extrabold text-textPrimary font-headline">{{ t.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>