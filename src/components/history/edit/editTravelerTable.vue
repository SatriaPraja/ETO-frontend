<script setup lang="ts">
const travelers = [
  {
    initials: 'BS',
    bgColor: 'bg-emerald-100 text-emerald-800',
    name: 'Bambang Sugianto',
    meta: 'NPK. 19840215 • Gol. IV',
    mode: 'CGK ⇄ SUB',
    subMode: 'Pulang Pergi (PP)',
    newDate: '20 Mei 2026',
    oldDate: 'Semula: 18 Mei 2026',
    airline: 'Garuda Indonesia',
    flightNo: 'GA-308 • Ekonomi Y',
    price: 'Rp 2.850.000',
  },
  {
    initials: 'DL',
    bgColor: 'bg-emerald-100 text-emerald-800',
    name: 'Dian Lestari, S.Psi.',
    meta: 'NPK. 19910811 • Gol. III',
    mode: 'CGK ⇄ SUB',
    subMode: 'Pulang Pergi (PP)',
    newDate: '20 Mei 2026',
    oldDate: 'Semula: 18 Mei 2026',
    airline: 'Garuda Indonesia',
    flightNo: 'GA-308 • Ekonomi Y',
    price: 'Rp 2.800.000',
  },
  {
    initials: 'RW',
    bgColor: 'bg-emerald-100 text-emerald-800',
    name: 'Rendra Wijaya',
    meta: 'NPK. 19941120 • Gol. II',
    mode: 'CGK ⇄ SUB',
    subMode: 'Pulang Pergi (PP)',
    newDate: '20 Mei 2026',
    oldDate: 'Semula: 18 Mei 2026',
    airline: 'Garuda Indonesia',
    flightNo: 'GA-308 • Ekonomi Y',
    price: 'Rp 2.800.000',
  },
]
</script>

<template>
  <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4 font-body">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
      <div>
        <h3 class="text-sm font-bold text-textPrimary font-headline flex items-center gap-2">
          <span>Data Traveller & Itinerary Perjalanan</span>
          <span class="px-2 py-0.2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
            • 1 Modifikasi Tanggal Terdeteksi
          </span>
        </h3>
        <p class="text-[11px] text-textMuted mt-0.5">Disesuaikan dengan jadwal Sprin revisi: Jakarta (CGK) menuju Surabaya (SUB) PP</p>
      </div>

      <button type="button" class="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 self-start sm:self-auto">
        <span class="material-symbols-outlined text-[16px]">person_add</span>
        <span>Tambah Traveller Baru</span>
      </button>
    </div>

    <!-- Alert Info Penerapan Serentak -->
    <div class="p-3 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center gap-2 text-xs text-blue-800">
      <span class="material-symbols-outlined text-blue-600 text-[18px]">info</span>
      <span>Perubahan tanggal dari sebelumnya <strong>18 Mei 2026</strong> menjadi <strong>20 Mei 2026</strong> telah diterapkan serentak untuk seluruh delegasi sesuai rekomendasi verifikator.</span>
    </div>

    <!-- Table Traveller -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3">NAMA PEGAWAI & NPK</th>
            <th class="p-3">MODA & RUTE</th>
            <th class="p-3">TANGGAL KEBERANGKATAN</th>
            <th class="p-3">MASKAPAI & KELAS</th>
            <th class="p-3 text-right">ESTIMASI BIAYA</th>
            <th class="p-3 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in travelers" :key="item.name" class="hover:bg-surfaceCanvas/50">
            <td class="p-3">
              <div class="flex items-center gap-2.5">
                <div :class="['w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0', item.bgColor]">
                  {{ item.initials }}
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary font-headline">{{ item.name }}</span>
                  <span class="text-[10px] text-textMuted">{{ item.meta }}</span>
                </div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[14px]">flight</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary">{{ item.mode }}</span>
                  <span class="text-[10px] text-textMuted">{{ item.subMode }}</span>
                </div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center gap-1.5">
                <strong class="font-bold text-textPrimary">{{ item.newDate }}</strong>
                <span class="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-bold">Diubah</span>
              </div>
              <span class="text-[10px] text-textMuted block line-through">{{ item.oldDate }}</span>
            </td>
            <td class="p-3">
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary">{{ item.airline }}</span>
                <span class="text-[10px] text-textMuted">{{ item.flightNo }}</span>
              </div>
            </td>
            <td class="p-3 text-right">
              <strong class="font-extrabold text-textPrimary font-headline">{{ item.price }}</strong>
            </td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center gap-1">
                <button type="button" class="p-1 text-textMuted hover:text-textPrimary" title="Edit"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" class="p-1 text-red-500 hover:text-red-700" title="Hapus"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>