<script setup lang="ts">
import { ref, computed } from 'vue'

export interface ExistingTOItem {
  id: string
  toCode: string
  status: 'Menunggu Persetujuan Pejabat' | 'Disetujui' | 'Perlu Koreksi'
  date: string
  title: string
  unitKerja: string
  bookerName: string
  bookerNpp: string
  totalEstimate: string
  transports: {
    type: 'flight' | 'train' | 'hotel' | 'bus' | 'car'
    label: string
  }[]
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: ExistingTOItem): void
}>()

// Filter State
const searchQuery = ref('')
const selectedStatusFilter = ref<'ALL' | 'WAITING' | 'APPROVED' | 'CORRECTION'>('ALL')

// Dummy Data Travel Order Existing
const existingOrders = ref<ExistingTOItem[]>([
  {
    id: '1',
    toCode: 'TO/2026/05/00187',
    status: 'Menunggu Persetujuan Pejabat',
    date: '14 Mei 2026, 09:30 WIB',
    title: 'Sosialisasi Program Jaminan Kehilangan Pekerjaan (JKP) Wilayah Jatim',
    unitKerja: 'Unit Kerja Kanwil Jatim',
    bookerName: 'Andi Pratama',
    bookerNpp: '982144',
    totalEstimate: 'Rp 8.450.000',
    transports: [{ type: 'flight', label: 'Pesawat Udara (3 Orang)' }],
  },
  {
    id: '2',
    toCode: 'TO/2026/05/00186',
    status: 'Menunggu Persetujuan Pejabat',
    date: '14 Mei 2026, 08:15 WIB',
    title: 'Audit Kepatuhan Iuran Badan Usaha Skala Menengah',
    unitKerja: 'Kantor Cabang Surabaya Rungkut',
    bookerName: 'Budi Santoso',
    bookerNpp: '982105',
    totalEstimate: 'Rp 3.120.000',
    transports: [{ type: 'train', label: 'Kereta Api (2 Orang)' }],
  },
  {
    id: '3',
    toCode: 'TO/2026/05/00185',
    status: 'Disetujui',
    date: '13 Mei 2026, 14:00 WIB',
    title: 'Rakor Nasional Pelayanan Klaim Terpadu',
    unitKerja: 'Wilayah Jawa Timur',
    bookerName: 'Dewi Anggraini',
    bookerNpp: '982301',
    totalEstimate: 'Rp 14.800.000',
    transports: [
      { type: 'flight', label: 'Pesawat (4 Orang)' },
      { type: 'hotel', label: 'Hotel (2 Kamar)' },
    ],
  },
  {
    id: '4',
    toCode: 'TO/2026/05/00180',
    status: 'Perlu Koreksi',
    date: '12 Mei 2026, 11:20 WIB',
    title: 'Monev Operasional Layanan Cabang Malang',
    unitKerja: 'Wilayah Jawa Timur',
    bookerName: 'Andi Pratama',
    bookerNpp: '982144',
    totalEstimate: 'Rp 5.250.000',
    transports: [{ type: 'car', label: 'Mobil Dinas (1 Kendaraan)' }],
  },
])

// Filtering Logic
const filteredOrders = computed(() => {
  return existingOrders.value.filter((item) => {
    // Search Filter
    const query = searchQuery.value.toLowerCase()
    const matchesSearch =
      !query ||
      item.toCode.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.bookerName.toLowerCase().includes(query)

    // Status Filter
    let matchesStatus = true
    if (selectedStatusFilter.value === 'WAITING') {
      matchesStatus = item.status === 'Menunggu Persetujuan Pejabat'
    } else if (selectedStatusFilter.value === 'APPROVED') {
      matchesStatus = item.status === 'Disetujui'
    } else if (selectedStatusFilter.value === 'CORRECTION') {
      matchesStatus = item.status === 'Perlu Koreksi'
    }

    return matchesSearch && matchesStatus
  })
})

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'Menunggu Persetujuan Pejabat':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'Disetujui':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Perlu Koreksi':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

function selectTO(item: ExistingTOItem) {
  emit('select', item)
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-neutralText/50 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 overflow-y-auto"
  >
    <div
      class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200 font-body"
    >
      <!-- Modal Header -->
      <div
        class="p-6 border-b border-gray-100 flex items-start justify-between bg-surfaceCard shrink-0"
      >
        <div class="flex items-start gap-3.5">
          <!-- 🟢 PERBAIKAN (Ganti Ikon ke add_link): -->
          <div
            class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-primary flex items-center justify-center shrink-0"
          >
            <span class="material-symbols-outlined text-[22px]">add_link</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Pilih Travel Order yang Sudah Ada
              </h3>
              <span
                class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"
              >
                Pencarian Multi-Moda
              </span>
            </div>
            <p class="text-xs text-textMuted mt-1">
              Tempelkan atau gabungkan reservasi transportasi/hotel baru ke nomor Travel Order aktif
              yang sudah dibuat sebelumnya.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="text-textMuted hover:text-textPrimary p-1.5 rounded-xl hover:bg-surfaceCanvas transition-colors shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body Search & Filters -->
      <div class="p-6 overflow-y-auto space-y-4 flex-1">
        <!-- Search Bar -->
        <div class="relative">
          <span
            class="material-symbols-outlined absolute left-3.5 top-2.5 text-textMuted text-[18px]"
            >search</span
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nomor TO (misal: TO/2026/05/...), nama kegiatan, atau nama booker..."
            class="w-full h-10 pl-10 pr-4 bg-surfaceCard border border-gray-200 rounded-xl text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary transition-all"
          />
        </div>

        <!-- Filter Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            @click="selectedStatusFilter = 'ALL'"
            :class="[
              'px-3 py-1.5 rounded-lg font-bold transition-all shrink-0',
              selectedStatusFilter === 'ALL'
                ? 'bg-primary text-onPrimary shadow-2xs'
                : 'bg-surfaceCanvas text-textMuted hover:bg-gray-200',
            ]"
          >
            Semua Status ({{ existingOrders.length }})
          </button>
          <button
            type="button"
            @click="selectedStatusFilter = 'WAITING'"
            :class="[
              'px-3 py-1.5 rounded-lg font-bold transition-all shrink-0',
              selectedStatusFilter === 'WAITING'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-surfaceCanvas text-textMuted hover:bg-gray-200',
            ]"
          >
            Menunggu Persetujuan Pejabat (2)
          </button>
          <button
            type="button"
            @click="selectedStatusFilter = 'APPROVED'"
            :class="[
              'px-3 py-1.5 rounded-lg font-bold transition-all shrink-0',
              selectedStatusFilter === 'APPROVED'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-surfaceCanvas text-textMuted hover:bg-gray-200',
            ]"
          >
            Disetujui (1)
          </button>
          <button
            type="button"
            @click="selectedStatusFilter = 'CORRECTION'"
            :class="[
              'px-3 py-1.5 rounded-lg font-bold transition-all shrink-0',
              selectedStatusFilter === 'CORRECTION'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-surfaceCanvas text-textMuted hover:bg-gray-200',
            ]"
          >
            Perlu Koreksi (1)
          </button>
        </div>

        <!-- List Travel Order Existing Cards -->
        <div class="space-y-3 pt-1">
          <div
            v-for="item in filteredOrders"
            :key="item.id"
            class="p-4 rounded-xl border border-gray-200 hover:border-primary/50 bg-surfaceCard transition-all hover:shadow-sm flex flex-col gap-3 group"
          >
            <!-- Top Header Card -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold font-headline text-textPrimary tracking-tight">
                  {{ item.toCode }}
                </span>
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold border',
                    getStatusBadgeClass(item.status),
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1"></span>
                  {{ item.status }}
                </span>
                <span class="text-[11px] text-textMuted flex items-center gap-1 ml-1">
                  <span class="material-symbols-outlined text-[14px]">schedule</span>
                  {{ item.date }}
                </span>
              </div>

              <div class="text-left sm:text-right">
                <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block"
                  >TOTAL ESTIMASI TERAKUMULASI</span
                >
                <span class="text-xs font-bold text-textPrimary font-headline">{{
                  item.totalEstimate
                }}</span>
              </div>
            </div>

            <!-- Content Title & Metadata -->
            <div
              class="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1 border-t border-gray-100"
            >
              <div class="space-y-1.5">
                <h4 class="text-xs font-bold text-textPrimary leading-snug">
                  {{ item.title }}
                </h4>
                <div class="text-[11px] text-textMuted flex items-center gap-2 flex-wrap">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">domain</span>
                    {{ item.unitKerja }}
                  </span>
                  <span>•</span>
                  <span
                    >Official Booker:
                    <strong class="text-textPrimary font-semibold"
                      >{{ item.bookerName }} (NPP: {{ item.bookerNpp }})</strong
                    ></span
                  >
                </div>

                <!-- Transport / Hotel Badges -->
                <div class="flex items-center gap-2 pt-1 flex-wrap">
                  <span class="text-[10px] text-textMuted font-semibold">Moda Tersedia:</span>
                  <div
                    v-for="(tr, idx) in item.transports"
                    :key="idx"
                    class="px-2 py-0.5 rounded-md bg-blue-50/80 border border-blue-100 text-blue-700 text-[10px] font-semibold flex items-center gap-1"
                  >
                    <span class="material-symbols-outlined text-[13px]">
                      {{
                        tr.type === 'flight'
                          ? 'flight'
                          : tr.type === 'train'
                            ? 'train'
                            : tr.type === 'hotel'
                              ? 'hotel'
                              : 'directions_car'
                      }}
                    </span>
                    <span>{{ tr.label }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                type="button"
                @click="selectTO(item)"
                class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-2xs transition-all active:scale-[0.98] shrink-0"
              >
                <span class="material-symbols-outlined text-[16px]">link</span>
                <span>+ Pilih & Gabungkan Pesanan</span>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredOrders.length === 0"
            class="py-12 text-center text-textMuted space-y-2"
          >
            <span class="material-symbols-outlined text-[36px]">find_in_page</span>
            <p class="text-xs font-bold text-textPrimary">Tidak ada Travel Order yang cocok</p>
            <p class="text-[11px]">Coba cari dengan kata kunci lain atau ubah filter status.</p>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="p-4 px-6 border-t border-gray-100 bg-surfaceCanvas flex items-center justify-between shrink-0 text-xs"
      >
        <span class="text-[11px] text-textMuted flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Menampilkan {{ filteredOrders.length }} Travel Order aktif yang dapat digabungkan
        </span>

        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 rounded-xl bg-surfaceCard border border-gray-200 text-textPrimary font-bold hover:bg-gray-100 transition-colors"
        >
          Tutup / Batal
        </button>
      </div>
    </div>
  </div>
</template>
