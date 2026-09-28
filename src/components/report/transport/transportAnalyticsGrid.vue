<script setup lang="ts">
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()

function getTransportTypeLabel(type: string) {
  switch (type) {
    case 'flight':
      return 'Pesawat Udara'
    case 'train':
      return 'Kereta Api (KAI)'
    case 'car':
      return 'Kendaraan Dinas / Sewa'
    case 'bus':
      return 'Bus Travel'
    case 'sea':
      return 'Kapal Laut'
    default:
      return type
  }
}

function getTransportColorClass(type: string) {
  switch (type) {
    case 'flight':
      return 'bg-sky-500'
    case 'train':
      return 'bg-orange-500'
    default:
      return 'bg-emerald-600'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 font-body">
    <!-- Card 1: Komposisi Moda Transportasi -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Komposisi Moda Transportasi</h3>
        <span class="text-[10px] text-textMuted">Analisis Transaksi</span>
      </div>

      <div class="space-y-3 text-xs">
        <div
          v-for="item in reportStore.transportCompositions"
          :key="item.transportType"
        >
          <div class="flex justify-between font-semibold mb-1">
            <span class="flex items-center gap-1.5">
              <span :class="['w-2.5 h-2.5 rounded-full', getTransportColorClass(item.transportType)]"></span>
              <span>{{ getTransportTypeLabel(item.transportType) }}</span>
            </span>
            <strong class="font-headline">{{ item.count }} Order ({{ item.percentage }}%)</strong>
          </div>
          <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              :class="['h-full rounded-full', getTransportColorClass(item.transportType)]"
              :style="{ width: `${item.percentage}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Rute Terpadat (Top Corridors) -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between pb-1 border-b border-gray-100">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Rute Terpadat (Top Corridors)</h3>
        <span class="text-[10px] text-textMuted uppercase font-bold">Volume Personel</span>
      </div>

      <div class="space-y-2 text-xs">
        <div
          v-for="(corridor, idx) in reportStore.transportTopCorridors"
          :key="corridor.route"
          class="flex items-center justify-between p-2 rounded-lg bg-surfaceCanvas"
        >
          <div class="flex items-center gap-2">
            <span
              :class="[
                'w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center',
                idx === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-textMuted'
              ]"
            >
              {{ idx + 1 }}
            </span>
            <span class="font-bold text-textPrimary">{{ corridor.route }}</span>
          </div>
          <strong class="font-headline font-extrabold text-textPrimary">{{ corridor.volumePersonel }} Pax</strong>
        </div>
      </div>
    </div>

    <!-- Card 3: Kepatuhan SBM Perjalanan Dinas -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
          <h3 class="font-bold text-textPrimary text-xs font-headline">Kepatuhan SBM Perjalanan Dinas</h3>
        </div>
        <p class="text-[11px] text-textMuted leading-relaxed">
          Standar Biaya Masukan (SBM) transportasi dinas berada pada indeks kepatuhan <strong>99.4%</strong>. Tidak ada deviasi tarif kelas bisnis yang tidak terotorisasi Dewan Direksi.
        </p>
      </div>

      <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <div>
          <span class="text-[9px] text-textMuted uppercase block font-bold">STATUS AUDIT TERAKHIR</span>
          <strong class="text-emerald-800 font-bold">Clean & Verified</strong>
        </div>
        <span class="px-2.5 py-1 rounded bg-emerald-800 text-white font-bold text-[10px]">
          BPK Certified
        </span>
      </div>
    </div>
  </div>
</template>