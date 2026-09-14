<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('pending')
const selectedId = ref('TO/2026/05/00187')

const emit = defineEmits(['select-item'])

interface ApprovalItem {
  id: string
  title: string
  submitter: string
  unit: string
  timeAgo: string
  typeIcon: string
  typeColor: string
  travelerCount: string
  amount: string
  statusText: string
  isActive?: boolean
}

const items: ApprovalItem[] = [
  {
    id: 'TO/2026/05/00187',
    title: 'Sosialisasi Program JKP Wilayah Jatim',
    submitter: 'Andi Pratama',
    unit: 'Wilayah Jawa Timur',
    timeAgo: '30 mnt lalu',
    typeIcon: 'flight',
    typeColor: 'bg-sky-500',
    travelerCount: '3 Karyawan',
    amount: 'Rp 8.450.000',
    statusText: 'Sedang Ditinjau ➔',
    isActive: true,
  },
  {
    id: 'TO/2026/05/00186',
    title: 'Audit Kepatuhan Iuran Badan Usaha Skala...',
    submitter: 'Budi Santoso',
    unit: 'Cabang Surabaya',
    timeAgo: '2 jam lalu',
    typeIcon: 'train',
    typeColor: 'bg-orange-500',
    travelerCount: '2 Karyawan',
    amount: 'Rp 3.120.000',
    statusText: '›',
  },
  {
    id: 'TO/2026/05/00185',
    title: 'Rakor Nasional Pelayanan Klaim Terpadu',
    submitter: 'Dewi Anggraini',
    unit: 'Wilayah Jawa Timur',
    timeAgo: '4 jam lalu',
    typeIcon: 'flight',
    typeColor: 'bg-sky-500',
    travelerCount: '4 Karyawan',
    amount: 'Rp 14.800.000',
    statusText: '›',
  },
  {
    id: 'TO/2026/05/00182',
    title: 'Penyerahan Santunan JKK & JKM Simbolis',
    submitter: 'Faisal Basri',
    unit: 'KCP Malang',
    timeAgo: 'Kemarin',
    typeIcon: 'directions_car',
    typeColor: 'bg-emerald-600',
    travelerCount: '2 Karyawan',
    amount: 'Rp 1.450.000',
    statusText: '›',
  },
  {
    id: 'TO/2026/05/00179',
    title: 'Inspeksi K3 Kawasan Industri Gresik',
    submitter: 'Hendra Wijaya',
    unit: 'Cabang Gresik',
    timeAgo: 'Kemarin',
    typeIcon: 'directions_bus',
    typeColor: 'bg-red-800',
    travelerCount: '3 Karyawan',
    amount: 'Rp 2.100.000',
    statusText: '›',
  },
]

function selectCard(item: ApprovalItem) {
  selectedId.value = item.id
  emit('select-item', item)
}
</script>

<template>
  <div class="space-y-3 font-body">
    <!-- Search Input -->
    <div class="relative">
      <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
      <input
        type="text"
        placeholder="Cari No. TO, kegiatan, atau nama booker..."
        class="w-full h-9 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-100 text-xs text-textPrimary focus:outline-none focus:border-primary shadow-2xs"
      />
    </div>

    <!-- Toggle Sub-Tabs -->
    <div class="flex items-center gap-2 text-xs">
      <button
        type="button"
        @click="activeTab = 'pending'"
        :class="[
          'px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5',
          activeTab === 'pending'
            ? 'bg-surfaceCard text-textPrimary border border-gray-100 shadow-2xs'
            : 'text-textMuted hover:bg-surfaceCanvas'
        ]"
      >
        <span>Belum Diproses</span>
        <span class="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">5</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'history'"
        :class="[
          'px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5',
          activeTab === 'history'
            ? 'bg-surfaceCard text-textPrimary border border-gray-100 shadow-2xs'
            : 'text-textMuted hover:bg-surfaceCanvas'
        ]"
      >
        <span>Riwayat Persetujuan</span>
        <span class="px-1.5 py-0.2 rounded-full bg-surfaceCanvas text-textMuted text-[10px]">38</span>
      </button>
    </div>

    <!-- List Item Cards -->
    <div class="space-y-2">
      <div
        v-for="item in items"
        :key="item.id"
        @click="selectCard(item)"
        :class="[
          'p-4 rounded-xl border transition-all cursor-pointer font-body space-y-2.5',
          selectedId === item.id
            ? 'bg-emerald-50/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
            : 'bg-surfaceCard border-gray-100 hover:border-gray-200 shadow-2xs'
        ]"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-textPrimary font-headline flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{{ item.id }}</span>
          </span>
          <span class="text-[10px] text-textMuted flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">schedule</span>
            <span>{{ item.timeAgo }}</span>
          </span>
        </div>

        <div>
          <h4 class="font-bold text-textPrimary text-xs font-headline leading-snug line-clamp-2">
            {{ item.title }}
          </h4>
          <p class="text-[11px] text-textMuted mt-0.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">person</span>
            <span>{{ item.submitter }} • {{ item.unit }}</span>
          </p>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-gray-100/60 text-xs">
          <div class="flex items-center gap-1.5">
            <span :class="['w-5 h-5 rounded text-white flex items-center justify-center text-[12px] material-symbols-outlined', item.typeColor]">
              {{ item.typeIcon }}
            </span>
            <span class="px-2 py-0.5 rounded bg-surfaceCanvas text-[10px] font-bold text-textMuted">
              {{ item.travelerCount }}
            </span>
          </div>

          <div class="text-right">
            <strong class="font-extrabold text-textPrimary font-headline text-xs block">{{ item.amount }}</strong>
            <span :class="['text-[10px] font-bold block', selectedId === item.id ? 'text-primary' : 'text-textMuted']">
              {{ item.statusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>