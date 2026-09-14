<script setup lang="ts">
const coaList = [
  {
    no: 1,
    unit: 'Kanwil Jawa Timur',
    coa: '5.2.1.04.01',
    title: 'Belanja Perjalanan Dinas Sosialisasi JKP',
    subTitle: 'Sub: Sosialisasi Jaminan Kehilangan Pekerjaan Wilayah II',
    program: 'Peningkatan Kepesertaan Aktif',
    programIcon: 'trending_up',
    initialBudget: 'Rp 200.000.000',
  },
  {
    no: 2,
    unit: 'Kanwil Jawa Timur',
    coa: '5.2.1.01.02',
    title: 'Perjalanan Dinas Rapat Koordinasi Wilayah',
    subTitle: 'Rakor Triwulanan Pimpinan Cabang Se-Jatim',
    program: 'Penguatan Tata Kelola Korporat',
    programIcon: 'corporate_fare',
    initialBudget: 'Rp 350.000.000',
  },
  {
    no: 3,
    unit: 'Cabang Surabaya Rungkut',
    coa: '5.2.1.03.01',
    title: 'Perjalanan Dinas Investigasi Klaim JKK & JKM',
    subTitle: 'Uji Petik Fakta Kecelakaan Kerja Lapangan',
    program: 'Mitigasi Risiko & Integritas',
    programIcon: 'gavel',
    initialBudget: 'Rp 120.000.000',
  },
  {
    no: 4,
    unit: 'Cabang Sidoarjo',
    coa: '5.2.1.02.04',
    title: 'Operasional Monitoring Kepatuhan PK/BU',
    subTitle: 'Kunjungan Terpadu Bersama Wasrik Ketenagakerjaan',
    program: 'Penegakan Kepatuhan Iuran',
    programIcon: 'policy',
    initialBudget: 'Rp 180.000.000',
  },
  {
    no: 5,
    unit: 'Cabang Malang',
    coa: '5.2.1.05.02',
    title: 'Perjalanan Dinas Pelatihan Sertifikasi CSO',
    subTitle: 'Diklat Pelayanan Prima Wilayah Timur',
    program: 'Transformasi Human Capital',
    programIcon: 'psychology',
    initialBudget: 'Rp 90.000.000',
  },
  {
    no: 6,
    unit: 'Kantor Pusat Jakarta',
    coa: '5.2.1.06.01',
    title: 'Audit Berkala SPI ke Seluruh Kantor Cabang',
    subTitle: 'Pemeriksaan Kepatuhan SOP & Keuangan Dinas',
    program: 'Satuan Pengawas Internal (SPI)',
    programIcon: 'verified_user',
    initialBudget: 'Rp 800.000.000',
  },
]
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5">KANTOR / UNIT KERJA</th>
            <th class="p-3.5">NOMOR AKUN (COA)</th>
            <th class="p-3.5">NAMA URAIAN ANGGARAN</th>
            <th class="p-3.5">PROGRAM KERJA RESMI</th>
            <th class="p-3.5 text-right">PAGU AWAL</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in coaList" :key="item.no" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center text-textMuted font-medium">{{ item.no }}</td>
            <td class="p-3.5 font-bold text-textPrimary">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-textMuted text-[16px]">domain</span>
                <span>{{ item.unit }}</span>
              </div>
            </td>
            <td class="p-3.5 font-mono font-bold text-emerald-800 text-xs">{{ item.coa }}</td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline leading-tight">{{ item.title }}</strong>
                <span class="text-[10px] text-textMuted mt-0.5">{{ item.subTitle }}</span>
              </div>
            </td>
            <td class="p-3.5">
              <div class="flex items-center gap-1.5 text-textPrimary font-semibold">
                <span class="material-symbols-outlined text-textMuted text-[16px]">{{ item.programIcon }}</span>
                <span>{{ item.program }}</span>
              </div>
            </td>
            <td class="p-3.5 text-right font-extrabold text-textPrimary font-headline text-xs">
              {{ item.initialBudget }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <div class="flex items-center gap-2">
        <span>Baris per halaman:</span>
        <select class="h-7 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span class="border-l border-gray-200 pl-3">Terkoneksi ke Core ERP Keuangan (SAP/SMILE BPJS)</span>
      </div>

      <div class="flex items-center gap-1">
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40" disabled>|<</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40" disabled><</button>
        <button type="button" class="w-7 h-7 rounded bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">2</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">3</button>
        <span class="px-1 text-textMuted">...</span>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">9</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary">></button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary">>|</button>
      </div>
    </div>
  </div>
</template>