<script setup lang="ts">
const vendors = [
  {
    no: '01',
    icon: 'flight',
    iconBg: 'text-sky-500 bg-sky-50',
    code: 'GA',
    name: 'Garuda Indonesia',
    company: 'PT Garuda Indonesia (Persero) Tbk',
    type: 'Pesawat',
    typeBg: 'text-sky-600 bg-sky-50',
    apiStatus: 'API B2B Aktif',
    apiBg: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    classes: '5 Kelas Ekonomi, Bisnis, First',
    status: 'Aktif',
    statusBg: 'text-emerald-700 bg-emerald-50',
  },
  {
    no: '02',
    icon: 'flight',
    iconBg: 'text-sky-500 bg-sky-50',
    code: 'QG',
    name: 'Citilink Indonesia',
    company: 'PT Citilink Indonesia',
    type: 'Pesawat',
    typeBg: 'text-sky-600 bg-sky-50',
    apiStatus: 'API B2B Aktif',
    apiBg: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    classes: '2 Kelas Reguler, GreenZone',
    status: 'Aktif',
    statusBg: 'text-emerald-700 bg-emerald-50',
  },
  {
    no: '03',
    icon: 'flight',
    iconBg: 'text-sky-500 bg-sky-50',
    code: 'ID',
    name: 'Batik Air',
    company: 'Lion Group Carrier',
    type: 'Pesawat',
    typeBg: 'text-sky-600 bg-sky-50',
    apiStatus: 'API B2B Aktif',
    apiBg: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    classes: '3 Kelas Ekonomi, Bisnis',
    status: 'Aktif',
    statusBg: 'text-emerald-700 bg-emerald-50',
  },
  {
    no: '04',
    icon: 'train',
    iconBg: 'text-orange-500 bg-orange-50',
    code: 'KAI',
    name: 'PT Kereta Api Indonesia (Persero)',
    company: 'Kereta Api Jarak Jauh & Komuter',
    type: 'Kereta Api',
    typeBg: 'text-orange-600 bg-orange-50',
    apiStatus: 'API B2B Aktif',
    apiBg: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    classes: '4 Kelas Eksekutif, Bisnis, Ekonomi',
    status: 'Aktif',
    statusBg: 'text-emerald-700 bg-emerald-50',
  },
  {
    no: '05',
    icon: 'directions_boat',
    iconBg: 'text-blue-500 bg-blue-50',
    code: 'PELNI',
    name: 'PT PELNI (Persero)',
    company: 'Armada Penumpang Nusantara',
    type: 'Kapal Laut',
    typeBg: 'text-blue-600 bg-blue-50',
    apiStatus: 'Voucher Manual',
    apiBg: 'text-gray-600 bg-gray-100',
    classes: '2 Kelas Kelas 1A, Ekonomi Kabin',
    status: 'Aktif',
    statusBg: 'text-emerald-700 bg-emerald-50',
  },
  {
    no: '06',
    icon: 'flight',
    iconBg: 'text-gray-400 bg-gray-50',
    code: 'JT',
    name: 'Lion Air',
    company: 'PKS Dalam Perpanjangan',
    type: 'Pesawat',
    typeBg: 'text-gray-600 bg-gray-100',
    apiStatus: 'Koneksi Nonaktif',
    apiBg: 'text-gray-500 bg-gray-100',
    classes: '1 Kelas Ekonomi',
    status: 'Nonaktif',
    statusBg: 'text-gray-500 bg-gray-100',
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
            <th class="p-3.5 text-center w-12">SIMBOL</th>
            <th class="p-3.5">KODE MITRA</th>
            <th class="p-3.5">NAMA MASKAPAI / VENDOR</th>
            <th class="p-3.5">JENIS MODA</th>
            <th class="p-3.5">INTEGRASI SISTEM</th>
            <th class="p-3.5">ARMADA & KELAS</th>
            <th class="p-3.5 text-center">STATUS</th>
            <th class="p-3.5 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in vendors" :key="item.no" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center text-textMuted font-medium">{{ item.no }}</td>
            <td class="p-3.5 text-center">
              <span :class="['w-7 h-7 rounded-lg inline-flex items-center justify-center material-symbols-outlined text-[16px]', item.iconBg]">
                {{ item.icon }}
              </span>
            </td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.code }}</td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline">{{ item.name }}</strong>
                <span class="text-[10px] text-textMuted">{{ item.company }}</span>
              </div>
            </td>
            <td class="p-3.5">
              <span :class="['px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1', item.typeBg]">
                <span class="material-symbols-outlined text-[12px]">{{ item.icon }}</span>
                <span>{{ item.type }}</span>
              </span>
            </td>
            <td class="p-3.5">
              <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1', item.apiBg]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{{ item.apiStatus }}</span>
              </span>
            </td>
            <td class="p-3.5 text-textMuted font-medium">{{ item.classes }}</td>
            <td class="p-3.5 text-center">
              <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold', item.statusBg]">
                {{ item.status }}
              </span>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" class="p-1 hover:text-textPrimary" title="Detail"><span class="material-symbols-outlined text-[16px]">visibility</span></button>
                <button type="button" class="p-1 hover:text-textPrimary" title="Edit"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" class="p-1 hover:text-red-600" title="Hapus"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <span>Menampilkan <strong>1-6</strong> dari <strong>24</strong> maskapai rekanan</span>

      <div class="flex items-center gap-1">
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40" disabled>‹</button>
        <button type="button" class="w-7 h-7 rounded bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">2</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">3</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">4</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary">›</button>
      </div>
    </div>
  </div>
</template>