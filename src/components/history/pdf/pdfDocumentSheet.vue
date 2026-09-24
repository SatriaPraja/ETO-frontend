<script setup lang="ts">
import { computed } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

// 🟢 Check status otorisasi
const isApproved = computed(() => {
  return props.detail?.status === 'APPROVED'
})

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
</script>

<template>
  <div
    class="relative bg-white text-gray-900 p-8 sm:p-10 rounded-lg shadow-xl font-body max-w-[210mm] min-h-[297mm] mx-auto space-y-6 text-xs border border-gray-200 overflow-hidden print:shadow-none print:border-none print:max-w-none print:w-full"
  >
    <!-- 🔴 WATERMARK DRAFT (Tampil jika dokumen BELUM APPROVED) -->
    <div
      v-if="!isApproved"
      class="absolute inset-0 pointer-events-none z-10 flex items-center justify-center select-none overflow-hidden"
    >
      <div
        class="text-red-500/15 font-extrabold text-7xl sm:text-8xl tracking-widest uppercase -rotate-45 transform border-8 border-dashed border-red-500/15 p-6 rounded-2xl text-center whitespace-nowrap"
      >
        DRAFT
      </div>
    </div>

    <!-- Header Kop Surat BPJS Ketenagakerjaan -->
    <div class="flex items-center justify-between pb-4 border-b-2 border-emerald-800 relative z-20">
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shrink-0"
        >
          <span class="material-symbols-outlined text-[28px]">shield</span>
        </div>
        <div>
          <h2
            class="font-extrabold text-sm text-emerald-900 uppercase font-headline tracking-tight"
          >
            BPJS KETENAGAKERJAAN
          </h2>
          <p class="text-[10px] text-gray-600 uppercase font-semibold">
            BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN
          </p>
          <p class="text-[9px] text-gray-500">Republik Indonesia • {{ detail.unitKerjaNama }}</p>
        </div>
      </div>

      <!-- Badge Kop Surat Dinamis (RESMI vs DRAFT) -->
      <div class="text-right">
        <span
          v-if="isApproved"
          class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 block uppercase tracking-wider"
        >
          e-TO RESMI
        </span>
        <span
          v-else
          class="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-300 block uppercase tracking-wider"
        >
          DRAFT e-TO
        </span>
        <span class="text-[9px] text-gray-400 block mt-1">
          {{ isApproved ? 'Salinan Elektronik Tersertifikasi' : 'Dokumen Pengajuan Sementara' }}
        </span>
      </div>
    </div>

    <!-- Title Document -->
    <div class="text-center space-y-1 py-1 relative z-20">
      <h1 class="text-base font-extrabold text-gray-900 uppercase font-headline tracking-wide">
        FORMULIR ELECTRONIC TRAVEL ORDER (E-TO)
      </h1>
      <p class="text-[11px] font-mono font-bold text-emerald-800">
        NOMOR REGISTRASI: {{ detail.toCode }}/{{ detail.unitKerjaKode }}
      </p>
    </div>

    <!-- Grid Metadata Sprin -->
    <div
      class="border border-gray-200 rounded-lg p-3.5 bg-gray-50/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] relative z-20"
    >
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block"
          >No. Surat Perintah (SPRIN):</span
        >
        <strong class="font-bold text-gray-900">{{ detail.sprinNumber }}</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Tanggal Diterbitkan:</span>
        <strong class="font-bold text-gray-900">{{ formatDate(detail.orderDate) }}</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Mata Anggaran (MAK):</span>
        <strong class="font-bold text-gray-900 font-mono">{{ detail.budgetAccountNumber }}</strong>
      </div>
      <div>
        <span class="text-[9px] text-gray-500 font-bold uppercase block">Official Booker:</span>
        <strong class="font-bold text-gray-900">{{ detail.bookerNama }}</strong>
      </div>
      <div class="sm:col-span-4 border-t border-gray-200/80 pt-2">
        <span class="text-[9px] text-gray-500 font-bold uppercase block"
          >Uraian / Dasar Penugasan:</span
        >
        <p class="font-medium text-gray-800">
          {{ detail.activityName }} — {{ detail.sprinDetail }}
        </p>
      </div>
    </div>

    <!-- Section 1: Manifest Delegasi & Tiket Penerbangan -->
    <div class="space-y-2 relative z-20">
      <div class="flex items-center justify-between pb-1 border-b border-gray-200">
        <h3
          class="text-xs font-bold text-gray-900 font-headline uppercase flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-emerald-800 text-[16px]">groups</span>
          <span>1. MANIFEST DELEGASI & TIKET PENERBANGAN</span>
        </h3>
        <span class="text-[10px] text-gray-500 font-semibold">
          {{ detail.transports?.length || 0 }} Personel Terdaftar
        </span>
      </div>

      <table class="w-full text-left border-collapse text-[10px]">
        <thead class="bg-gray-100 text-gray-600 font-bold uppercase border-y border-gray-200">
          <tr>
            <th class="p-2 text-center w-8">NO</th>
            <th class="p-2">NAMA & IDENTITAS</th>
            <th class="p-2">JABATAN DINAS</th>
            <th class="p-2">RUTE & MASKAPAI</th>
            <th class="p-2 text-center">KEBERANGKATAN</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 border-b border-gray-200">
          <tr v-if="!detail.transports || detail.transports.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-400">Tidak ada jadwal penerbangan.</td>
          </tr>
          <tr v-else v-for="(item, idx) in detail.transports" :key="item.id">
            <td class="p-2 text-center font-bold text-gray-500">{{ idx + 1 }}</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">{{ item.guestName }}</strong>
              <span class="text-[9px] text-gray-500">NPK/KTP: {{ item.npkOrKtp || '-' }}</span>
            </td>
            <td class="p-2 font-medium">{{ item.jabatan || item.instansi || '-' }}</td>
            <td class="p-2">
              <strong class="font-bold text-gray-900 block">{{ item.routeInfo }}</strong>
              <span class="text-[9px] text-gray-500">{{ item.maskapai }}</span>
            </td>
            <td class="p-2 text-center">
              <span class="font-bold text-gray-900 block">{{
                formatDate(item.departureDate)
              }}</span>
              <span class="text-[9px] text-gray-500">{{ formatTime(item.departureTime) }} WIB</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 2: Reservasi Akomodasi Hotel -->
    <div class="space-y-2 pt-1 relative z-20">
      <div class="flex items-center justify-between pb-1 border-b border-gray-200">
        <h3
          class="text-xs font-bold text-gray-900 font-headline uppercase flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-emerald-800 text-[16px]">hotel</span>
          <span>2. RESERVASI AKOMODASI HOTEL</span>
        </h3>
      </div>

      <div
        v-if="!detail.hotels || detail.hotels.length === 0"
        class="p-3 text-center text-gray-400 border border-gray-200 rounded-lg"
      >
        Tidak ada reservasi akomodasi hotel.
      </div>
      <div
        v-else
        v-for="hotel in detail.hotels"
        :key="hotel.id"
        class="border border-gray-200 rounded-lg p-3 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]"
      >
        <div>
          <strong class="font-bold text-gray-900 text-xs block">{{ hotel.hotelNameCustom }}</strong>
          <p class="text-gray-600 mt-0.5">{{ hotel.cityName }} • {{ hotel.roomCount }} Kamar</p>
        </div>
        <div class="text-left sm:text-right font-medium">
          <span class="block">
            In: <strong>{{ formatDate(hotel.checkInDate) }}</strong> • Out:
            <strong>{{ formatDate(hotel.checkOutDate) }}</strong>
          </span>
          <span class="text-gray-500 block">DURASI: {{ hotel.durationNights }} MALAM</span>
        </div>
      </div>
    </div>

    <!-- Signature & QR Section -->
    <div
      class="pt-4 flex flex-col sm:flex-row items-end justify-between gap-6 text-[10px] border-t border-gray-200 relative z-20"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-18 h-18 bg-gray-100 border border-gray-300 p-1 rounded flex items-center justify-center shrink-0"
        >
          <div
            class="w-full h-full bg-gray-800 flex items-center justify-center text-white text-[7px] font-mono text-center p-1"
          >
            {{ isApproved ? '[QR BSrE]' : '[DRAFT LOG]' }}
          </div>
        </div>

        <div class="space-y-0.5 text-gray-600">
          <span
            :class="[
              'px-1.5 py-0.2 rounded font-bold text-[9px] inline-block',
              isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
            ]"
          >
            {{ isApproved ? 'TERVERIFIKASI DIGITAL' : 'DRAFT PRATINJAU' }}
          </span>
          <p class="text-[9px]">
            {{
              isApproved
                ? 'Dipindai untuk validasi integritas dokumen melalui Core Engine e-TO BPJS TK'
                : 'Dokumen draf pratinjau belum memiliki legalitas hukum sampai disetujui.'
            }}
          </p>
        </div>
      </div>

      <div class="text-center space-y-1 min-w-[180px]">
        <p class="text-gray-600">Diterbitkan pada {{ formatDate(detail.createdAt) }}</p>
        <strong class="font-bold text-gray-900 block">Menyetujui Penugasan,</strong>
        <p class="text-gray-500 text-[9px]">{{ detail.approverJabatan }}</p>

        <!-- Blok Tanda Tangan BSrE (Kondisional Approved vs Waiting) -->
        <div
          v-if="isApproved"
          class="my-1.5 py-2 border border-dashed border-emerald-300 rounded bg-emerald-50/50 flex flex-col items-center justify-center"
        >
          <span class="material-symbols-outlined text-emerald-700 text-[18px]">verified</span>
          <span class="text-[8px] font-bold text-emerald-800 uppercase">BSrE DIGITALLY SIGNED</span>
        </div>
        <div
          v-else
          class="my-1.5 py-2 border border-dashed border-amber-300 rounded bg-amber-50/50 flex flex-col items-center justify-center"
        >
          <span class="material-symbols-outlined text-amber-700 text-[18px]">schedule</span>
          <span class="text-[8px] font-bold text-amber-800 uppercase">MENUNGGU OTORISASI</span>
        </div>

        <strong class="font-bold text-gray-900 block text-xs underline">
          {{ detail.approverNama || '-' }}
        </strong>
      </div>
    </div>

    <!-- Footer Disclaimer -->
    <div class="pt-3 border-t border-gray-100 text-[8px] text-gray-400 text-center relative z-20">
      Dokumen Resmi Elektronik BPJS Ketenagakerjaan (UU ITE No. 11/2008 Ps. 5) • Halaman 1 dari 1
    </div>
  </div>
</template>
