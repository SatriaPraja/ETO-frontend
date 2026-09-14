<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('internal')

const internalTravelers = [
  {
    no: '01',
    name: 'Bambang Sugianto',
    npk: '19840215',
    position: 'Penata Madya',
    nik: '3171092804840002',
    route: 'JKT ➔ SUB (PP)',
    departDate: '18 Mei 2026 (07:15)',
    returnDate: '21 Mei 2026 (16:40)',
    vendor: 'Garuda Indonesia',
    flightNo: 'GA-312 / GA-319',
    class: 'Ekonomi V',
    price: 'Rp 2.850.000',
  },
  {
    no: '02',
    name: 'Dian Lestari, S.Psi.',
    npk: '19910811',
    position: 'Asisten Ahli',
    nik: '3275085108910003',
    route: 'JKT ➔ SUB (PP)',
    departDate: '18 Mei 2026 (07:15)',
    returnDate: '21 Mei 2026 (16:40)',
    vendor: 'Garuda Indonesia',
    flightNo: 'GA-312 / GA-319',
    class: 'Ekonomi V',
    price: 'Rp 2.800.000',
  },
  {
    no: '03',
    name: 'Rendra Wijaya, S.Kom.',
    npk: '19941120',
    position: 'Analis TI',
    nik: '3174052011940001',
    route: 'JKT ➔ SUB (PP)',
    departDate: '18 Mei 2026 (07:15)',
    returnDate: '21 Mei 2026 (16:40)',
    vendor: 'Garuda Indonesia',
    flightNo: 'GA-312 / GA-319',
    class: 'Ekonomi V',
    price: 'Rp 2.800.000',
  },
]
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-4 p-6">
    <!-- Category Tabs Filter Header -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="activeTab = 'internal'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5',
            activeTab === 'internal'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">groups</span>
          <span>Traveller Internal</span>
          <span class="px-1.5 py-0.2 rounded-full bg-emerald-800 text-white text-[10px]">3</span>
        </button>

        <button
          type="button"
          @click="activeTab = 'hotel'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5',
            activeTab === 'hotel'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">hotel</span>
          <span>Akomodasi Hotel</span>
          <span class="px-1.5 py-0.2 rounded-full bg-surfaceCanvas text-textMuted text-[10px]">1</span>
        </button>

        <button
          type="button"
          @click="activeTab = 'external'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5',
            activeTab === 'external'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">person_add</span>
          <span>Traveller Eksternal</span>
          <span class="px-1.5 py-0.2 rounded-full bg-surfaceCanvas text-textMuted text-[10px]">0</span>
        </button>
      </div>

      <div class="text-xs text-textMuted font-medium">
        Rute: <strong class="text-textPrimary font-bold">CGK ➔ SUB (PP)</strong>
      </div>
    </div>

    <!-- Section Title -->
    <div class="flex items-center justify-between pt-1">
      <h3 class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-sky-500"></span>
        <span>Manifest Penerbangan & Personel</span>
      </h3>
    </div>

    <!-- Manifest Table -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3 text-center w-10">NO</th>
            <th class="p-3">TRAVELLER</th>
            <th class="p-3">RUTE & JADWAL</th>
            <th class="p-3">MASKAPAI & KELAS</th>
            <th class="p-3 text-right">ESTIMASI BIAYA</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in internalTravelers" :key="item.no" class="hover:bg-surfaceCanvas/50">
            <td class="p-3 text-center text-textMuted font-bold">{{ item.no }}</td>
            <td class="p-3">
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary font-headline text-xs">{{ item.name }}</span>
                <span class="text-[10px] text-textMuted">NPK: {{ item.npk }} • {{ item.position }}</span>
                <span class="text-[10px] text-textMuted font-mono">KTP: {{ item.nik }}</span>
              </div>
            </td>
            <td class="p-3">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary text-xs">{{ item.route }}</strong>
                <span class="text-[10px] text-textMuted">Berangkat: {{ item.departDate }}</span>
                <span class="text-[10px] text-textMuted">Kembali: {{ item.returnDate }}</span>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[15px]">flight</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary text-xs">{{ item.vendor }}</span>
                  <span class="text-[10px] text-textMuted">{{ item.flightNo }} ({{ item.class }})</span>
                </div>
              </div>
            </td>
            <td class="p-3 text-right">
              <span class="font-bold text-textPrimary font-headline text-xs">{{ item.price }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Subtotal Footer Banner -->
    <div class="p-3 rounded-xl bg-surfaceCanvas border border-gray-100 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-textMuted">
        <span class="material-symbols-outlined text-[16px]">info</span>
        <span>Termasuk bagasi tercatat 20kg dan asuransi kecelakaan kerja dinas.</span>
      </div>
      <div class="text-right">
        <span class="text-[10px] font-bold text-textMuted uppercase block">SUBTOTAL TIKET PESAWAT:</span>
        <strong class="text-emerald-800 font-extrabold text-sm font-headline">Rp 8.450.000</strong>
      </div>
    </div>
  </div>
</template>