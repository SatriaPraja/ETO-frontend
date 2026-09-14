<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('internal')

const transportRecords = [
  {
    no: '01',
    recordDate: '05/05/2026',
    toCode: 'eTO-2026-0891',
    name: 'Bambang Sugianto, SE',
    meta: 'NPK: 18042910 • Gol. IV/B',
    route: 'CGK ⇄ SUB PP',
    departDate: '12/05/2026',
    returnDate: 's/d 14/05/2026',
    type: 'flight',
    vendor: 'Garuda Indonesia',
    class: 'Ekonomi (Y) • GA312',
  },
  {
    no: '02',
    recordDate: '05/05/2026',
    toCode: 'eTO-2026-0890',
    name: 'Bambang Sugianto, SE',
    meta: 'NPK: 18042910 • Gol. IV/B',
    route: 'GMR ➔ BD OW',
    departDate: '18/05/2026',
    returnDate: 'Sekali Jalan',
    type: 'train',
    vendor: 'KAI Argo Parahyangan',
    class: 'Eksekutif (A) • KA7002',
  },
  {
    no: '03',
    recordDate: '04/05/2026',
    toCode: 'eTO-2026-0874',
    name: 'Dra. Endah Sulistiyowati',
    meta: 'NPK: 15021884 • Gol. IV/C',
    route: 'SUB ⇄ DPS PP',
    departDate: '10/05/2026',
    returnDate: 's/d 13/05/2026',
    type: 'flight',
    vendor: 'Batik Air',
    class: 'Ekonomi Fleksi • ID6510',
  },
  {
    no: '04',
    recordDate: '03/05/2026',
    toCode: 'eTO-2026-0862',
    name: 'Hendra Gunawan, ST',
    meta: 'NPK: 21087402 • Gol. III/A',
    route: 'CGK ⇄ UPG PP',
    departDate: '15/05/2026',
    returnDate: 's/d 17/05/2026',
    type: 'flight',
    vendor: 'Citilink',
    class: 'Ekonomi (N) • QG240',
  },
  {
    no: '05',
    recordDate: '02/05/2026',
    toCode: 'eTO-2026-0855',
    name: 'Siti Nurhaliza, M.M.',
    meta: 'NPK: 19034451 • Gol. III/C',
    route: 'SUB ⇄ YK PP',
    departDate: '08/05/2026',
    returnDate: 's/d 09/05/2026',
    type: 'train',
    vendor: 'KAI Sancaka',
    class: 'Eksekutif (AA) • KA176',
  },
  {
    no: '06',
    recordDate: '02/05/2026',
    toCode: 'eTO-2026-0849',
    name: 'Agus Wijayanto',
    meta: 'NPK: 16019943 • Gol. III/B',
    route: 'CGK ⇄ KNO PP',
    departDate: '14/05/2026',
    returnDate: 's/d 16/05/2026',
    type: 'flight',
    vendor: 'Garuda Indonesia',
    class: 'Ekonomi (M) • GA188',
  },
  {
    no: '07',
    recordDate: '01/05/2026',
    toCode: 'eTO-2026-0831',
    name: 'Dewi Lestari, S.Psi',
    meta: 'NPK: 20056122 • Gol. III/A',
    route: 'HLP ⇄ SOC PP',
    departDate: '06/05/2026',
    returnDate: 's/d 07/05/2026',
    type: 'flight',
    vendor: 'Batik Air',
    class: 'Ekonomi • ID7055',
  },
]
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <!-- Header Tabs Filter -->
    <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="activeTab = 'internal'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
            activeTab === 'internal'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">badge</span>
          <span>Traveller Internal BPJS TK</span>
          <span class="px-1.5 py-0.2 rounded-full bg-emerald-800 text-white text-[10px]">284</span>
        </button>

        <button
          type="button"
          @click="activeTab = 'external'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
            activeTab === 'external'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">person_add</span>
          <span>Traveller Eksternal / Tamu</span>
          <span class="px-1.5 py-0.2 rounded-full bg-surfaceCanvas text-textMuted text-[10px]">58</span>
        </button>
      </div>

      <div class="flex items-center gap-3 text-[11px] text-textMuted font-medium">
        <span>Transportasi:</span>
        <span class="flex items-center gap-1 font-bold text-sky-600">
          <span class="w-2 h-2 rounded-full bg-sky-500"></span> Pesawat
        </span>
        <span class="flex items-center gap-1 font-bold text-orange-600">
          <span class="w-2 h-2 rounded-full bg-orange-500"></span> Kereta
        </span>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3 text-center w-10">NO</th>
            <th class="p-3">TGL REKAM</th>
            <th class="p-3">NO. TRAVEL ORDER</th>
            <th class="p-3">NAMA TRAVELLER & NPK</th>
            <th class="p-3">RUTE PERJALANAN</th>
            <th class="p-3">TGL BERANGKAT / PULANG</th>
            <th class="p-3">MODA & KELAS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in transportRecords" :key="item.no" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3 text-center text-textMuted font-bold">{{ item.no }}</td>
            <td class="p-3 text-textMuted font-medium">{{ item.recordDate }}</td>
            <td class="p-3 font-bold text-emerald-800 font-headline">{{ item.toCode }}</td>
            <td class="p-3">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline">{{ item.name }}</strong>
                <span class="text-[10px] text-textMuted">{{ item.meta }}</span>
              </div>
            </td>
            <td class="p-3">
              <span class="font-extrabold text-textPrimary font-headline">{{ item.route }}</span>
            </td>
            <td class="p-3">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary">{{ item.departDate }}</strong>
                <span class="text-[10px] text-textMuted">{{ item.returnDate }}</span>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <div v-if="item.type === 'flight'" class="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[14px]">flight</span>
                </div>
                <div v-else class="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[14px]">train</span>
                </div>
                <div class="flex flex-col">
                  <strong class="font-bold text-textPrimary">{{ item.vendor }}</strong>
                  <span class="text-[10px] text-textMuted">{{ item.class }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <span>Menampilkan <strong>1-10</strong> dari <strong>342</strong> data perjalanan dinas</span>

      <div class="flex items-center gap-2">
        <span>Baris:</span>
        <select class="h-7 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary mr-2">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>

        <div class="flex items-center gap-1">
          <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40" disabled>‹</button>
          <button type="button" class="w-7 h-7 rounded bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
          <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">2</button>
          <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">3</button>
          <span class="px-1 text-textMuted">...</span>
          <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary font-semibold">35</button>
          <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary">›</button>
        </div>
      </div>
    </div>
  </div>
</template>