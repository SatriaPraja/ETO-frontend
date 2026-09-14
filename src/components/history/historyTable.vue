<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface TravelOrderRecord {
  no: string
  toCode: string
  transportType: 'flight' | 'train' | 'car' | 'sea'
  transportBadge: string
  routeDetail?: string
  activityName: string
  sprinNumber: string
  submitDate: string
  submitTime: string
  travellerCount: string
  estimatedCost: string
  status: 'pending_pejabat' | 'approved' | 'returned' | 'rejected' | 'canceled'
  statusLabel: string
}

const records: TravelOrderRecord[] = [
  {
    no: '01',
    toCode: 'TO/2026/05/00187',
    transportType: 'flight',
    transportBadge: 'CGK ➔ SUB',
    activityName: 'Monitoring & Evaluasi Kepatuhan...',
    sprinNumber: 'SPRIN/142/DIR-OPS/V/2026',
    submitDate: '19 Mei 2026',
    submitTime: '14:22 WIB',
    travellerCount: '3 Traveller',
    estimatedCost: 'Rp 14.850.000',
    status: 'pending_pejabat',
    statusLabel: 'Menunggu Pejabat',
  },
  {
    no: '02',
    toCode: 'TO/2026/05/00164',
    transportType: 'train',
    transportBadge: 'GMR ➔ BDG',
    activityName: 'Sosialisasi Jaminan Kehilangan...',
    sprinNumber: 'SPRIN/118/SDM-PEL/V/2026',
    submitDate: '16 Mei 2026',
    submitTime: '09:15 WIB',
    travellerCount: '1 Traveller',
    estimatedCost: 'Rp 3.200.000',
    status: 'approved',
    statusLabel: 'Disetujui',
  },
  {
    no: '03',
    toCode: 'TO/2026/05/00142',
    transportType: 'car',
    transportBadge: 'Zona Operasional Banten',
    activityName: 'Pemeriksaan Lapangan Klaim JKK...',
    sprinNumber: 'SPRIN/097/YAN-JKK/V/2026',
    submitDate: '14 Mei 2026',
    submitTime: '16:40 WIB',
    travellerCount: '2 Traveller',
    estimatedCost: 'Rp 1.450.000',
    status: 'returned',
    statusLabel: 'Dikembalikan',
  },
  {
    no: '04',
    toCode: 'TO/2026/05/00119',
    transportType: 'flight',
    transportBadge: 'HLP ➔ DPS',
    activityName: 'Rapat Koordinasi Nasional Pelayana...',
    sprinNumber: 'SPRIN/085/DIR-UT/V/2026',
    submitDate: '10 Mei 2026',
    submitTime: '11:05 WIB',
    travellerCount: '4 Traveller',
    estimatedCost: 'Rp 28.600.000',
    status: 'approved',
    statusLabel: 'Disetujui',
  },
  {
    no: '05',
    toCode: 'TO/2026/05/00098',
    transportType: 'train',
    transportBadge: 'JKT ➔ CRB',
    activityName: 'Studi Banding Kelembagaan Sistem...',
    sprinNumber: 'SPRIN/071/KACAB-JKT/V/2026',
    submitDate: '06 Mei 2026',
    submitTime: '13:10 WIB',
    travellerCount: '5 Traveller',
    estimatedCost: 'Rp 8.900.000',
    status: 'rejected',
    statusLabel: 'Ditolak',
  },
  {
    no: '06',
    toCode: 'TO/2026/05/00073',
    transportType: 'sea',
    transportBadge: 'KMP Merak ➔ Bakauheni',
    activityName: 'Pendampingan Audit Lapangan...',
    sprinNumber: 'SPRIN/044/WAS-PMI/V/2026',
    submitDate: '02 Mei 2026',
    submitTime: '08:00 WIB',
    travellerCount: '1 Traveller',
    estimatedCost: 'Rp 2.100.000',
    status: 'canceled',
    statusLabel: 'Batal',
  },
]

function goToDetail(toCode: string) {
  const cleanId = toCode.replace(/\//g, '-')
  router.push(`/history/order-detail/${cleanId}`)
}
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <!-- Table Sub-header -->
    <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-textMuted text-[20px]">view_list</span>
        <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Pengajuan e-TO</h3>
        <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold">24 Pengajuan</span>
      </div>

      <div class="flex items-center gap-2">
        <div class="bg-surfaceCanvas p-0.5 rounded-lg border border-gray-200 flex items-center text-xs">
          <button type="button" class="px-2.5 py-1 rounded bg-surfaceCard shadow-2xs font-bold text-textPrimary flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">table_rows</span>
            <span>Tabel Lengkap</span>
          </button>
          <button type="button" class="px-2.5 py-1 rounded text-textMuted hover:text-textPrimary flex items-center gap-1 font-medium">
            <span class="material-symbols-outlined text-[15px]">grid_view</span>
            <span>Ringkas</span>
          </button>
        </div>
        <button type="button" class="p-1.5 rounded-lg border border-gray-200 text-textMuted hover:text-textPrimary">
          <span class="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-12">NO</th>
            <th class="p-3.5">NO. TRAVEL ORDER</th>
            <th class="p-3.5">NAMA KEGIATAN & NO. SPRIN</th>
            <th class="p-3.5 text-center">TANGGAL PENGAJUAN</th>
            <th class="p-3.5 text-right">TRAVELLER & ESTIMASI</th>
            <th class="p-3.5 text-center">STATUS PERSETUJUAN</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr 
            v-for="item in records" 
            :key="item.toCode" 
            @click="goToDetail(item.toCode)"
            class="hover:bg-emerald-50/40 cursor-pointer transition-colors"
          >
            <td class="p-3.5 text-center text-textMuted font-medium">{{ item.no }}</td>
            <td class="p-3.5">
              <div class="flex flex-col gap-1">
                <span class="font-bold text-primary hover:underline font-headline text-xs">{{ item.toCode }}</span>
                <div class="flex items-center gap-1">
                  <span v-if="item.transportType === 'flight'" class="w-4 h-4 rounded bg-sky-500 text-white flex items-center justify-center text-[10px] material-symbols-outlined">flight</span>
                  <span v-else-if="item.transportType === 'train'" class="w-4 h-4 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] material-symbols-outlined">train</span>
                  <span v-else-if="item.transportType === 'car'" class="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] material-symbols-outlined">directions_car</span>
                  <span v-else class="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] material-symbols-outlined">directions_boat</span>
                  
                  <span class="text-[10px] font-semibold text-textMuted bg-surfaceCanvas px-1.5 py-0.5 rounded border border-gray-100">{{ item.transportBadge }}</span>
                </div>
              </div>
            </td>
            <td class="p-3.5">
              <div class="flex flex-col gap-0.5">
                <span class="font-semibold text-textPrimary truncate max-w-xs">{{ item.activityName }}</span>
                <span class="text-[11px] text-textMuted flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">description</span>
                  <span>{{ item.sprinNumber }}</span>
                </span>
              </div>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex flex-col">
                <span class="font-semibold text-textPrimary">{{ item.submitDate }}</span>
                <span class="text-[10px] text-textMuted">{{ item.submitTime }}</span>
              </div>
            </td>
            <td class="p-3.5 text-right">
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary flex items-center justify-end gap-1">
                  <span class="material-symbols-outlined text-[14px] text-textMuted">group</span>
                  <span>{{ item.travellerCount }}</span>
                </span>
                <span class="font-extrabold text-textPrimary font-headline text-xs mt-0.5">{{ item.estimatedCost }}</span>
              </div>
            </td>
            <td class="p-3.5 text-center">
              <span
                v-if="item.status === 'pending_pejabat'"
                class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold inline-flex items-center gap-1 border border-blue-100"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Menunggu Pejabat</span>
              </span>
              <span
                v-else-if="item.status === 'approved'"
                class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-100"
              >
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Disetujui</span>
              </span>
              <span
                v-else-if="item.status === 'returned'"
                class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold inline-flex items-center gap-1 border border-amber-100"
              >
                <span class="material-symbols-outlined text-[14px]">warning</span>
                <span>Dikembalikan</span>
              </span>
              <span
                v-else-if="item.status === 'rejected'"
                class="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold inline-flex items-center gap-1 border border-red-100"
              >
                <span class="material-symbols-outlined text-[14px]">cancel</span>
                <span>Ditolak</span>
              </span>
              <span
                v-else
                class="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold inline-flex items-center gap-1"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span>Batal</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <div class="flex items-center gap-2">
        <span>Menampilkan <strong>1-6</strong> dari <strong>24</strong> data pengajuan</span>
        <span class="mx-1">•</span>
        <span>Tampilkan:</span>
        <select class="h-7 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>

      <div class="flex items-center gap-1">
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted hover:bg-surfaceCanvas disabled:opacity-40" disabled>
          ‹
        </button>
        <button type="button" class="w-7 h-7 rounded bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-surfaceCanvas font-semibold">2</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-surfaceCanvas font-semibold">3</button>
        <button type="button" class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-surfaceCanvas">
          ›
        </button>
      </div>
    </div>
  </div>
</template>