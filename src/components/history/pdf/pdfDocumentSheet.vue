<template>
  <div class="bg-white text-gray-900 p-8 sm:p-10 rounded-lg shadow-xl font-body max-w-[210mm] min-h-[297mm] mx-auto space-y-6 text-xs border border-gray-200">
    <!-- Header Kop Surat BPJS Ketenagakerjaan -->
    <div class="flex items-center justify-between pb-4 border-b-2 border-emerald-800">
      <div class="flex items-center gap-3">
        <!-- Logo Icon -->
        <div class="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shrink-0">
          <span class="material-symbols-outlined text-[28px]">shield</span>
        </div>
        <div>
          <h2 class="font-extrabold text-sm text-emerald-900 uppercase font-headline tracking-tight">BPJS KETENAGAKERJAAN</h2>
          <p class="text-[10px] text-gray-600 uppercase font-semibold">BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN</p>
          <p class="text-[9px] text-gray-500">Republik Indonesia • Kantor Wilayah Jawa Timur</p>
        </div>
      </div>

      <div class="text-right">
        <span class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 block uppercase tracking-wider">
          e-TO RESMI
        </span>
        <span class="text-[9px] text-gray-400 block mt-1">Salinan Elektronik Tersertifikasi</span>
      </div>
    </div>

    <!-- Title Doc -->
    <div class="text-center space-y-1 py-2">
      <h1 class="text-base font-extrabold text-gray-900 uppercase font-headline tracking-wide">
        FORMULIR ELECTRONIC TRAVEL ORDER (E-TO)
      </h1>
      <p class="text-[11px] font-mono font-bold text-emerald-800">
        NOMOR REGISTRASI: NO: e-TO/2026/05/00187/KANWIL-JATIM
      </p>
    </div>

    <!-- Grid Metadata Sprin -->
    <div class="border border-gray-200 rounded-lg p-3.5 bg-gray-50/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">No. Surat Perintah (SPRIN):</span>
        <strong class="font-bold text-gray-900">SPRIN/0491/052026</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Tanggal Diterbitkan:</span>
        <strong class="font-bold text-gray-900">14 Mei 2026</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Mata Anggaran (MAK):</span>
        <strong class="font-bold text-gray-900 font-mono">5.2.1.04.01</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Official Booker (NPP):</span>
        <strong class="font-bold text-gray-900">Andi Pratama (982144)</strong>
      </div>
      <div class="sm:col-span-4 border-t border-gray-200/80 pt-2">
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Uraian / Dasar Penugasan:</span>
        <p class="font-medium text-gray-800">Sosialisasi Terpadu Manfaat Program JKP Kanwil Jatim Semester I-2026</p>
      </div>
    </div>

    <!-- Section 1: Manifest Delegasi & Tiket Penerbangan -->
    <div class="space-y-2">
      <div class="flex items-center justify-between pb-1 border-b border-gray-200">
        <h3 class="text-xs font-bold text-gray-900 font-headline uppercase flex items-center gap-1.5">
          <span class="material-symbols-outlined text-emerald-800 text-[16px]">groups</span>
          <span>1. MANIFEST DELEGASI & TIKET PENERBANGAN</span>
        </h3>
        <span class="text-[10px] text-gray-500 font-semibold">3 Traveller Terdaftar</span>
      </div>

      <table class="w-full text-left border-collapse text-[10px]">
        <thead class="bg-gray-100 text-gray-600 font-bold uppercase border-y border-gray-200">
          <tr>
            <th class="p-2 text-center w-8">NO</th>
            <th class="p-2">NAMA & NPK</th>
            <th class="p-2">JABATAN DINAS</th>
            <th class="p-2">RUTE & MASKAPAI</th>
            <th class="p-2 text-center">KEBERANGKATAN</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 border-b border-gray-200">
          <tr>
            <td class="p-2 text-center font-bold text-gray-500">1</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">Bambang Sugianto, M.M.</strong>
              <span class="text-[9px] text-gray-500">NPK: 104882 • Gol. IV/B</span>
            </td>
            <td class="p-2 font-medium">Kabid Kepesertaan Kanwil</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">CGK ➔ SUB (PP)</strong>
              <span class="text-[9px] text-gray-500">Garuda GA-312 / GA-319</span>
            </td>
            <td class="p-2 text-center">
              <span class="font-bold text-gray-900 block">20 Mei 2026</span>
              <span class="text-[9px] text-gray-500">07:45 WIB</span>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-center font-bold text-gray-500">2</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">Dian Lestari, S.E.</strong>
              <span class="text-[9px] text-gray-500">NPK: 128904 • Gol. III/C</span>
            </td>
            <td class="p-2 font-medium">Penata Madya Sosialisasi</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">CGK ➔ SUB (PP)</strong>
              <span class="text-[9px] text-gray-500">Garuda GA-312 / GA-319</span>
            </td>
            <td class="p-2 text-center">
              <span class="font-bold text-gray-900 block">20 Mei 2026</span>
              <span class="text-[9px] text-gray-500">07:45 WIB</span>
            </td>
          </tr>
          <tr>
            <td class="p-2 text-center font-bold text-gray-500">3</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">Rendra Wijaya, S.Kom.</strong>
              <span class="text-[9px] text-gray-500">NPK: 140221 • Gol. III/A</span>
            </td>
            <td class="p-2 font-medium">Analis Sistem Informasi</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">CGK ➔ SUB (PP)</strong>
              <span class="text-[9px] text-gray-500">Garuda GA-312 / GA-319</span>
            </td>
            <td class="p-2 text-center">
              <span class="font-bold text-gray-900 block">20 Mei 2026</span>
              <span class="text-[9px] text-gray-500">07:45 WIB</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 2: Reservasi Akomodasi Hotel -->
    <div class="space-y-2 pt-2">
      <div class="flex items-center justify-between pb-1 border-b border-gray-200">
        <h3 class="text-xs font-bold text-gray-900 font-headline uppercase flex items-center gap-1.5">
          <span class="material-symbols-outlined text-emerald-800 text-[16px]">hotel</span>
          <span>2. RESERVASI AKOMODASI HOTEL</span>
        </h3>
      </div>

      <div class="border border-gray-200 rounded-lg p-3 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
        <div>
          <strong class="font-bold text-gray-900 text-xs block">Hotel Santika Premiere Gubeng Surabaya</strong>
          <p class="text-gray-600 mt-0.5">Jl. Raya Gubeng No.54, Surabaya, Jawa Timur • 2 Kamar Deluxe Twin</p>
        </div>
        <div class="text-left sm:text-right font-medium">
          <span class="block">In: <strong>20 Mei 2026</strong> • Out: <strong>23 Mei 2026</strong></span>
          <span class="text-gray-500 block">DURASI: 3 MALAM (ROOM & BREAKFAST)</span>
        </div>
      </div>
    </div>

    <!-- Signature & QR Section -->
    <div class="pt-6 flex flex-col sm:flex-row items-end justify-between gap-6 text-[10px] border-t border-gray-200">
      <!-- Digital Stamp & QR -->
      <div class="flex items-center gap-3">
        <!-- QR Code Block -->
        <div class="w-20 h-20 bg-gray-100 border border-gray-300 p-1 rounded flex items-center justify-center shrink-0">
          <div class="w-full h-full bg-gray-800 flex items-center justify-center text-white text-[8px] font-mono text-center">
            [QR CODE BSrE]
          </div>
        </div>

        <div class="space-y-0.5 text-gray-600">
          <span class="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] inline-block">
            TERVERIFIKASI DIGITAL
          </span>
          <p class="text-[9px]">Dipindai untuk validasi integritas dokumen melalui Core Engine e-TO BPJS TK</p>
          <span class="font-mono text-[8px] text-gray-400 block">Hash: f182-c430-b91a-77e2-94fa</span>
        </div>
      </div>

      <!-- Tanda Tangan Penyetuju -->
      <div class="text-center space-y-1 min-w-[180px]">
        <p class="text-gray-600">Surabaya, 14 Mei 2026</p>
        <strong class="font-bold text-gray-900 block">Menyetujui Penugasan,</strong>
        <p class="text-gray-500 text-[9px]">Kepala Kantor Wilayah Jawa Timur</p>

        <div class="my-2 py-3 border border-dashed border-emerald-300 rounded bg-emerald-50/50 flex flex-col items-center justify-center">
          <span class="material-symbols-outlined text-emerald-700 text-[20px]">verified</span>
          <span class="text-[8px] font-bold text-emerald-800 uppercase">BSrE TK JATIM DIGITALLY SIGNED</span>
        </div>

        <strong class="font-bold text-gray-900 block text-xs underline">H. Mochammad Irfan, S.E., M.M.</strong>
        <span class="text-[9px] text-gray-500 font-mono">NPP: 88102910</span>
      </div>
    </div>

    <!-- Page Footer Disclaimer -->
    <div class="pt-4 border-t border-gray-100 text-[8px] text-gray-400 text-center">
      Dokumen Resmi Elektronik BPJS Ketenagakerjaan (UU ITE No. 11/2008 Ps. 5) & Halaman 1 dari 2
    </div>
  </div>
</template>