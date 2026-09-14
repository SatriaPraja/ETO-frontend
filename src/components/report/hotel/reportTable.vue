<script setup lang="ts">
const hotelData = [
  {
    no: 1,
    name: 'Hotel Santika Premiere Gubeng',
    rating: '★★★★☆ (Bintang 4)',
    city: 'Surabaya',
    checkIn: '12 Mei 2026',
    checkOut: '15 Mei 2026',
    duration: '3 Malam',
    rooms: '2 Kamar',
    rate: 'Rp 850.000',
  },
  {
    no: 2,
    name: 'Hotel Santika Premiere Slipi',
    rating: '★★★★☆ (Bintang 4)',
    city: 'Jakarta',
    checkIn: '14 Mei 2026',
    checkOut: '16 Mei 2026',
    duration: '2 Malam',
    rooms: '1 Kamar',
    rate: 'Rp 920.000',
  },
  {
    no: 3,
    name: 'Hotel Santika Premiere ICE BSD',
    rating: '★★★★☆ (Bintang 4)',
    city: 'Tangerang / BSD',
    checkIn: '18 Mei 2026',
    checkOut: '21 Mei 2026',
    duration: '3 Malam',
    rooms: '3 Kamar',
    rate: 'Rp 880.000',
  },
  {
    no: 4,
    name: 'JW Marriott Surabaya',
    rating: '★★★★★ (Bintang 5)',
    city: 'Surabaya',
    checkIn: '22 Mei 2026',
    checkOut: '24 Mei 2026',
    duration: '2 Malam',
    rooms: '1 Kamar',
    rate: 'Rp 1.450.000',
  },
  {
    no: 5,
    name: 'The Papandayan Hotel',
    rating: '★★★★★ (Bintang 5)',
    city: 'Bandung',
    checkIn: '05 Mei 2026',
    checkOut: '08 Mei 2026',
    duration: '3 Malam',
    rooms: '2 Kamar',
    rate: 'Rp 890.000',
  },
]
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <!-- Sub Header -->
    <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Transaksi Akomodasi</h3>
        <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
          142 Data Ditemukan
        </span>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <span class="text-textMuted">Tampilkan:</span>
        <select class="h-8 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary">
          <option>10 Baris</option>
          <option>25 Baris</option>
          <option>50 Baris</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5">NAMA HOTEL & BINTANG</th>
            <th class="p-3.5">KOTA</th>
            <th class="p-3.5 text-center">TGL CHECK-IN</th>
            <th class="p-3.5 text-center">TGL CHECK-OUT</th>
            <th class="p-3.5 text-center">DURASI</th>
            <th class="p-3.5 text-center">JML KAMAR</th>
            <th class="p-3.5 text-right">TARIF / KAMAR</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in hotelData" :key="item.no" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center font-bold text-textMuted">{{ item.no }}</td>
            <td class="p-3.5">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded bg-pink-50 text-[#930049] flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[15px]">hotel</span>
                </span>
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary font-headline text-xs">{{ item.name }}</span>
                  <span class="text-[10px] text-amber-500 font-semibold">{{ item.rating }}</span>
                </div>
              </div>
            </td>
            <td class="p-3.5 font-medium text-textPrimary">{{ item.city }}</td>
            <td class="p-3.5 text-center font-medium text-textPrimary">{{ item.checkIn }}</td>
            <td class="p-3.5 text-center font-medium text-textPrimary">{{ item.checkOut }}</td>
            <td class="p-3.5 text-center">
              <span class="px-2 py-0.5 rounded bg-surfaceCanvas text-textPrimary font-bold text-[11px]">
                {{ item.duration }}
              </span>
            </td>
            <td class="p-3.5 text-center font-bold text-textPrimary">{{ item.rooms }}</td>
            <td class="p-3.5 text-right font-extrabold text-textPrimary font-headline">{{ item.rate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Rekapitulasi Baris Kumulatif -->
    <div class="p-4 bg-emerald-50/60 border-t border-b border-emerald-100 flex items-center justify-between text-xs font-headline">
      <div>
        <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">TOTAL KUMULATIF SELURUH PERIODE:</span>
        <strong class="text-sm font-extrabold text-emerald-900">TOTAL REKAPITULASI LAPORAN</strong>
      </div>

      <div class="flex items-center gap-8 text-right">
        <div>
          <span class="text-[10px] text-emerald-800 font-bold block">TOTAL KAMAR:</span>
          <strong class="text-emerald-900 font-extrabold text-sm">216 Kamar</strong>
        </div>
        <div>
          <span class="text-[10px] text-emerald-800 font-bold block">TOTAL ROOM-NIGHTS:</span>
          <strong class="text-emerald-900 font-extrabold text-sm">584 ROOM-NIGHTS</strong>
        </div>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <span>Menampilkan <strong>1 - 10</strong> dari <strong>142</strong> reservasi akomodasi</span>

      <div class="flex items-center gap-1">
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40" disabled>
          ‹
        </button>
        <button type="button" class="w-7 h-7 rounded bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">2</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">3</button>
        <span class="px-1 text-textMuted">...</span>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">15</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary">
          ›
        </button>
      </div>
    </div>
  </div>
</template>