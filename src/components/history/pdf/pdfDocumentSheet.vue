<script setup lang="ts">
import { computed } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

const isApproved = computed(() => props.detail?.status === 'APPROVED')

function formatDate(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(timeStr?: string) {
  if (!timeStr) return ''
  return timeStr.substring(0, 5)
}

// Logika Pembagian Halaman A4 Presisi
const FIRST_PAGE_ITEMS = 11
const SUBSEQUENT_PAGE_ITEMS = 14

const transportPages = computed(() => {
  const items = props.detail?.transports || []
  if (items.length === 0) return [[]]

  const pages: (typeof items)[] = []
  pages.push(items.slice(0, FIRST_PAGE_ITEMS))

  let remainingIndex = FIRST_PAGE_ITEMS
  while (remainingIndex < items.length) {
    pages.push(items.slice(remainingIndex, remainingIndex + SUBSEQUENT_PAGE_ITEMS))
    remainingIndex += SUBSEQUENT_PAGE_ITEMS
  }

  return pages
})

function getRowIndex(pageIdx: number, itemIdx: number) {
  if (pageIdx === 0) {
    return itemIdx + 1
  }
  return FIRST_PAGE_ITEMS + (pageIdx - 1) * SUBSEQUENT_PAGE_ITEMS + itemIdx + 1
}
</script>

<template>
  <div class="a4-multi-page-wrapper space-y-6 sm:space-y-8 mx-auto print:space-y-0 w-[210mm]">
    <div
      v-for="(pageTransports, pageIdx) in transportPages"
      :key="pageIdx"
      class="a4-sheet relative bg-white text-gray-900 p-8 rounded-lg shadow-xl font-body w-[210mm] min-h-[297mm] mx-auto flex flex-col justify-between text-xs border border-gray-200 box-border print:shadow-none print:border-none print:w-full print:m-0 print:p-0 print:break-after-page"
    >
      <div class="space-y-3 sm:space-y-4">
        <!-- Watermark Draft -->
        <div
          v-if="!isApproved"
          class="absolute inset-0 pointer-events-none z-10 flex items-center justify-center select-none overflow-hidden"
        >
          <div
            class="text-red-500/15 font-extrabold text-4xl sm:text-7xl tracking-widest uppercase -rotate-45 transform border-4 sm:border-8 border-dashed border-red-500/15 p-3 sm:p-6 rounded-2xl text-center whitespace-nowrap"
          >
            DRAFT
          </div>
        </div>

        <!-- Kop Surat BPJS Ketenagakerjaan -->
        <div
          class="flex items-center justify-between pb-2 sm:pb-2.5 border-b-2 border-emerald-800 relative z-20 gap-2"
        >
          <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div
              :class="[
                'rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold shrink-0',
                pageIdx === 0
                  ? 'w-8 h-8 sm:w-11 sm:h-11 text-base sm:text-lg'
                  : 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm',
              ]"
            >
              <span
                class="material-symbols-outlined"
                :class="pageIdx === 0 ? 'text-[20px] sm:text-[26px]' : 'text-[16px] sm:text-[20px]'"
                >shield</span
              >
            </div>
            <div class="min-w-0">
              <h2
                :class="[
                  'font-extrabold text-emerald-900 uppercase font-headline tracking-tight truncate',
                  pageIdx === 0 ? 'text-[11px] sm:text-sm' : 'text-[10px] sm:text-[11px]',
                ]"
              >
                BPJS KETENAGAKERJAAN
              </h2>
              <p
                v-if="pageIdx === 0"
                class="text-[8px] sm:text-[9px] text-gray-600 uppercase font-semibold truncate hidden sm:block"
              >
                BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN
              </p>
              <p class="text-[7.5px] sm:text-[8px] text-gray-500 truncate">
                {{ detail.unitKerjaNama }} — {{ detail.toCode }}
              </p>
            </div>
          </div>

          <div class="text-right shrink-0">
            <span
              v-if="isApproved"
              class="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[7.5px] sm:text-[8.5px] font-bold border border-emerald-200 inline-block uppercase tracking-wider"
            >
              e-TO RESMI
            </span>
            <span
              v-else
              class="px-1.5 sm:px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[7.5px] sm:text-[8.5px] font-bold border border-amber-300 inline-block uppercase tracking-wider"
            >
              DRAFT e-TO
            </span>
            <span class="text-[7.5px] sm:text-[8px] text-gray-400 block mt-0.5">
              Hal {{ pageIdx + 1 }} dari {{ transportPages.length }}
            </span>
          </div>
        </div>

        <!-- Title Document -->
        <div v-if="pageIdx === 0" class="text-center space-y-0.5 relative z-20">
          <h1
            class="text-xs sm:text-sm font-extrabold text-gray-900 uppercase font-headline tracking-wide"
          >
            FORMULIR ELECTRONIC TRAVEL ORDER (E-TO)
          </h1>
          <p class="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-800">
            NOMOR REGISTRASI: {{ detail.toCode }}/{{ detail.unitKerjaKode }}
          </p>
        </div>

        <!-- Grid Metadata Sprin -->
        <div
          v-if="pageIdx === 0"
          class="border border-gray-200 rounded-lg p-2.5 sm:p-3 bg-gray-50/50 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] sm:text-[10px] relative z-20"
        >
          <div>
            <span class="text-[7.5px] sm:text-[8px] text-gray-500 font-bold uppercase block"
              >No. SPRIN:</span
            >
            <strong class="font-bold text-gray-900 truncate block">{{ detail.sprinNumber }}</strong>
          </div>
          <div>
            <span class="text-[7.5px] sm:text-[8px] text-gray-500 font-bold uppercase block"
              >Tgl Diterbitkan:</span
            >
            <strong class="font-bold text-gray-900 block">{{
              formatDate(detail.orderDate)
            }}</strong>
          </div>
          <div>
            <span class="text-[7.5px] sm:text-[8px] text-gray-500 font-bold uppercase block"
              >MAK:</span
            >
            <strong class="font-bold text-gray-900 font-mono block">{{
              detail.budgetAccountNumber
            }}</strong>
          </div>
          <div>
            <span class="text-[7.5px] sm:text-[8px] text-gray-500 font-bold uppercase block"
              >Booker:</span
            >
            <strong class="font-bold text-gray-900 truncate block">{{ detail.bookerNama }}</strong>
          </div>
          <div class="col-span-2 sm:col-span-4 border-t border-gray-200/80 pt-1.5">
            <span class="text-[7.5px] sm:text-[8px] text-gray-500 font-bold uppercase block"
              >Dasar Penugasan:</span
            >
            <p class="font-medium text-gray-800 text-[8.5px] sm:text-[9.5px]">
              {{ detail.activityName }} — {{ detail.sprinDetail }}
            </p>
          </div>
        </div>

        <!-- Section 1: Manifest Delegasi -->
        <div class="space-y-1.5 sm:space-y-2 relative z-20">
          <div class="flex items-center justify-between pb-1 border-b border-gray-200">
            <h3
              class="text-[10px] sm:text-[11px] font-bold text-gray-900 font-headline uppercase flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-emerald-800 text-[14px] sm:text-[16px]"
                >groups</span
              >
              <span>1. MANIFEST DELEGASI & TIKET</span>
            </h3>
            <span class="text-[8px] sm:text-[9px] text-gray-500 font-semibold">
              Total {{ detail.transports?.length || 0 }} Personel
            </span>
          </div>

          <!-- Tabel Responsif -->
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse text-[8.5px] sm:text-[9.5px]">
              <thead class="bg-gray-100 text-gray-600 font-bold uppercase border-y border-gray-200">
                <tr>
                  <th class="p-1 sm:p-2 text-center w-6 sm:w-8">NO</th>
                  <th class="p-1 sm:p-2">NAMA & IDENTITAS</th>
                  <th class="p-1 sm:p-2 hidden sm:table-cell">JABATAN DINAS</th>
                  <th class="p-1 sm:p-2">RUTE & MASKAPAI</th>
                  <th class="p-1 sm:p-2 text-center">KEBERANGKATAN</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 border-b border-gray-200">
                <tr v-if="pageTransports.length === 0">
                  <td colspan="5" class="p-3 text-center text-gray-400">
                    Tidak ada jadwal penerbangan.
                  </td>
                </tr>
                <tr v-else v-for="(item, idx) in pageTransports" :key="item.id">
                  <td class="p-1 sm:p-2 text-center font-bold text-gray-500">
                    {{ getRowIndex(pageIdx, idx) }}
                  </td>
                  <td class="p-1 sm:p-2">
                    <strong class="font-bold text-gray-900 block text-[8.5px] sm:text-[10px]">{{
                      item.guestName
                    }}</strong>
                    <span class="text-[7.5px] sm:text-[8.5px] text-gray-500 block"
                      >NPK/KTP: {{ item.npkOrKtp || '-' }}</span
                    >
                    <span class="text-[7.5px] text-gray-400 block sm:hidden mt-0.5">
                      {{ item.jabatan || item.instansi || '-' }}
                    </span>
                  </td>
                  <td class="p-1 sm:p-2 font-medium hidden sm:table-cell">
                    {{ item.jabatan || item.instansi || '-' }}
                  </td>
                  <td class="p-1 sm:p-2">
                    <strong class="font-bold text-gray-900 block text-[8.5px] sm:text-[10px]">{{
                      item.routeInfo
                    }}</strong>
                    <span class="text-[7.5px] sm:text-[8.5px] text-gray-500">{{
                      item.maskapai
                    }}</span>
                  </td>
                  <td class="p-1 sm:p-2 text-center">
                    <span class="font-bold text-gray-900 block text-[8.5px] sm:text-[10px]">{{
                      formatDate(item.departureDate)
                    }}</span>
                    <span class="text-[7.5px] sm:text-[8.5px] text-gray-500"
                      >{{ formatTime(item.departureTime) }} WIB</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Reservasi Akomodasi Hotel -->
        <div
          v-if="pageIdx === transportPages.length - 1"
          class="space-y-1.5 sm:space-y-2 pt-1 relative z-20"
        >
          <div class="flex items-center justify-between pb-1 border-b border-gray-200">
            <h3
              class="text-[10px] sm:text-[11px] font-bold text-gray-900 font-headline uppercase flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-emerald-800 text-[14px] sm:text-[16px]"
                >hotel</span
              >
              <span>2. RESERVASI AKOMODASI HOTEL</span>
            </h3>
          </div>

          <div
            v-if="!detail.hotels || detail.hotels.length === 0"
            class="p-2 sm:p-2.5 text-center text-gray-400 border border-gray-200 rounded-lg text-[8.5px] sm:text-[9.5px]"
          >
            Tidak ada reservasi akomodasi hotel.
          </div>
          <div
            v-else
            v-for="hotel in detail.hotels"
            :key="hotel.id"
            class="border border-gray-200 rounded-lg p-2 sm:p-2.5 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-[8.5px] sm:text-[9.5px]"
          >
            <div>
              <strong class="font-bold text-gray-900 text-[10px] sm:text-xs block">{{
                hotel.hotelNameCustom
              }}</strong>
              <p class="text-gray-600 mt-0.5">{{ hotel.cityName }} • {{ hotel.roomCount }} Kamar</p>
            </div>
            <div class="text-left sm:text-right font-medium">
              <span class="block">
                In: <strong>{{ formatDate(hotel.checkInDate) }}</strong> • Out:
                <strong>{{ formatDate(hotel.checkOutDate) }}</strong>
              </span>
              <span class="text-gray-500 block text-[7.5px] sm:text-[8.5px]"
                >DURASI: {{ hotel.durationNights }} MALAM</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Signature & Footer -->
      <div
        v-if="pageIdx === transportPages.length - 1"
        class="space-y-2 pt-2 sm:pt-3 border-t border-gray-200 relative z-20 mt-4 sm:mt-0"
      >
        <div
          class="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 sm:gap-4 text-[8.5px] sm:text-[9.5px]"
        >
          <div
            class="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div
              class="w-10 h-10 sm:w-16 sm:h-16 bg-gray-100 border border-gray-300 p-1 rounded flex items-center justify-center shrink-0"
            >
              <div
                class="w-full h-full bg-gray-800 flex items-center justify-center text-white text-[6px] sm:text-[7px] font-mono text-center p-0.5"
              >
                {{ isApproved ? '[QR BSrE]' : '[DRAFT LOG]' }}
              </div>
            </div>

            <div class="space-y-0.5 text-gray-600 max-w-[200px]">
              <span
                :class="[
                  'px-1.5 py-0.2 rounded font-bold text-[7.5px] sm:text-[8.5px] inline-block',
                  isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
                ]"
              >
                {{ isApproved ? 'TERVERIFIKASI DIGITAL' : 'DRAFT PRATINJAU' }}
              </span>
              <p class="text-[7.5px] sm:text-[8.5px] leading-tight">
                {{
                  isApproved
                    ? 'Dipindai untuk validasi integritas dokumen melalui Core Engine e-TO BPJS TK'
                    : 'Dokumen draf pratinjau belum memiliki legalitas hukum.'
                }}
              </p>
            </div>
          </div>

          <div class="text-center space-y-0.5 min-w-[150px] sm:min-w-[170px] w-full sm:w-auto">
            <p class="text-gray-600 text-[8px] sm:text-[9px]">
              Diterbitkan pada {{ formatDate(detail.createdAt) }}
            </p>
            <strong class="font-bold text-gray-900 block text-[9px] sm:text-[10px]"
              >Menyetujui Penugasan,</strong
            >
            <p class="text-gray-500 text-[7.5px] sm:text-[8.5px]">{{ detail.approverJabatan }}</p>

            <div
              v-if="isApproved"
              class="my-1 py-1 border border-dashed border-emerald-300 rounded bg-emerald-50/50 flex flex-col items-center justify-center"
            >
              <span class="material-symbols-outlined text-emerald-700 text-[14px] sm:text-[16px]"
                >verified</span
              >
              <span class="text-[7.5px] sm:text-[8px] font-bold text-emerald-800 uppercase"
                >BSrE DIGITALLY SIGNED</span
              >
            </div>
            <div
              v-else
              class="my-1 py-1 border border-dashed border-amber-300 rounded bg-amber-50/50 flex flex-col items-center justify-center"
            >
              <span class="material-symbols-outlined text-amber-700 text-[14px] sm:text-[16px]"
                >schedule</span
              >
              <span class="text-[7.5px] sm:text-[8px] font-bold text-amber-800 uppercase"
                >MENUNGGU OTORISASI</span
              >
            </div>

            <strong class="font-bold text-gray-900 block text-[9.5px] sm:text-[10.5px] underline">
              {{ detail.approverNama || '-' }}
            </strong>
          </div>
        </div>

        <div
          class="pt-1.5 sm:pt-2 border-t border-gray-100 text-[7.5px] sm:text-[8px] text-gray-400 text-center"
        >
          Dokumen Resmi Elektronik BPJS Ketenagakerjaan (UU ITE No. 11/2008 Ps. 5) • Halaman
          {{ pageIdx + 1 }} dari {{ transportPages.length }}
        </div>
      </div>

      <!-- Footer Disclaimer Ringkas -->
      <div
        v-else
        class="pt-1.5 sm:pt-2 border-t border-gray-100 text-[7.5px] sm:text-[8px] text-gray-400 text-center relative z-20"
      >
        Dokumen Resmi Elektronik BPJS Ketenagakerjaan (UU ITE No. 11/2008 Ps. 5) • Halaman
        {{ pageIdx + 1 }} dari {{ transportPages.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  body {
    background-color: white !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .a4-multi-page-wrapper {
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .a4-sheet {
    box-shadow: none !important;
    border: none !important;
    width: 100% !important;
    height: 297mm !important;
    page-break-after: always !important;
    break-after: page !important;
    padding: 10mm !important;
  }
}
</style>
