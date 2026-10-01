<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReportStore } from '@/stores/reportStore'

const router = useRouter()
const reportStore = useReportStore()

onMounted(async () => {
  // Panggil API secara paralel untuk mengisi angka rekapitulasi di kartu
  await Promise.allSettled([reportStore.fetchHotelReport(), reportStore.fetchTransportReport()])
})

function goToReport(type: 'hotel' | 'transport') {
  if (type === 'hotel') {
    router.push('/reports/hotel')
  } else {
    router.push('/reports/transport')
  }
}

function formatRupiah(amount?: number) {
  const num = Number(amount) || 0
  return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num)}`
}
</script>

<template>
  <div class="space-y-4 sm:space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted flex-wrap">
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Laporan Eksekutif</strong>
    </div>

    <!-- Header Banner (Diperbaiki Responsifnya) -->
    <div class="bg-surfaceCard p-4 sm:p-6 rounded-xl border border-gray-100 shadow-2xs space-y-1.5">
      <div class="flex items-start sm:items-center gap-2.5">
        <div
          class="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-[22px] sm:text-[26px]">analytics</span>
        </div>
        <h1
          class="text-lg sm:text-xl lg:text-2xl font-bold text-textPrimary font-headline leading-snug"
        >
          Pusat Laporan Eksekutif & Rekapitulasi
        </h1>
      </div>
      <p class="text-xs text-textMuted leading-relaxed pl-0 sm:pl-[38px]">
        Pilih kategori laporan untuk audit transaksi, rekapitulasi biaya, dan pemantauan kepatuhan
        Standar Biaya Umum (SBU).
      </p>
    </div>

    <!-- 2 Pilihan Utama Kartu Laporan -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <!-- Option 1: Laporan Hotel & Akomodasi -->
      <div
        @click="goToReport('hotel')"
        class="group bg-surfaceCard p-4 sm:p-6 rounded-xl border border-gray-100 shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-5 sm:space-y-6 active:scale-[0.99]"
      >
        <div class="space-y-3 sm:space-y-4">
          <div class="flex items-center justify-between gap-2">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-50 text-[#930049] flex items-center justify-center font-bold shrink-0"
            >
              <span class="material-symbols-outlined text-[24px] sm:text-[28px]">hotel</span>
            </div>
            <span
              class="px-2.5 py-1 rounded-full bg-pink-50 text-[#930049] text-[11px] sm:text-xs font-bold border border-pink-100 shrink-0"
            >
              Modul Akomodasi
            </span>
          </div>

          <div class="space-y-1">
            <h2
              class="text-base sm:text-lg font-bold text-textPrimary font-headline group-hover:text-primary transition-colors flex items-center justify-between gap-2"
            >
              <span>Laporan Hotel & Akomodasi Dinas</span>
              <span
                class="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:inline-block"
                >arrow_forward</span
              >
            </h2>
            <p class="text-xs text-textMuted leading-relaxed">
              Audit transaksi pemesanan kamar, kepatuhan Standar Biaya Umum (SBU) hotel berbintang,
              durasi menginap, dan realisasi beban akomodasi.
            </p>
          </div>
        </div>

        <!-- Ringkasan Angka Dinamis dari API -->
        <div
          class="pt-3.5 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-textMuted"
        >
          <span v-if="reportStore.isHotelLoading" class="animate-pulse">Memuat data...</span>
          <span v-else class="font-medium">{{ reportStore.hotelTotalData }} Transaksi</span>

          <strong class="text-[#930049] font-headline font-bold text-xs sm:text-sm">
            {{ formatRupiah(reportStore.hotelStats.totalBebanHotel) }}
          </strong>
        </div>
      </div>

      <!-- Option 2: Laporan Transportasi -->
      <div
        @click="goToReport('transport')"
        class="group bg-surfaceCard p-4 sm:p-6 rounded-xl border border-gray-100 shadow-2xs hover:shadow-md hover:border-sky-500 transition-all cursor-pointer flex flex-col justify-between space-y-5 sm:space-y-6 active:scale-[0.99]"
      >
        <div class="space-y-3 sm:space-y-4">
          <div class="flex items-center justify-between gap-2">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0"
            >
              <span class="material-symbols-outlined text-[24px] sm:text-[28px]"
                >directions_transit</span
              >
            </div>
            <span
              class="px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 text-[11px] sm:text-xs font-bold border border-sky-100 shrink-0"
            >
              Modul Transportasi
            </span>
          </div>

          <div class="space-y-1">
            <h2
              class="text-base sm:text-lg font-bold text-textPrimary font-headline group-hover:text-primary transition-colors flex items-center justify-between gap-2"
            >
              <span>Laporan Transportasi Dinas</span>
              <span
                class="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:inline-block"
                >arrow_forward</span
              >
            </h2>
            <p class="text-xs text-textMuted leading-relaxed">
              Rekapitulasi tiket pesawat, kereta api, kapal laut, bus/travel, dan operasional sewa
              mobil dinas seluruh unit kerja.
            </p>
          </div>
        </div>

        <!-- Ringkasan Angka Dinamis dari API -->
        <div
          class="pt-3.5 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-textMuted"
        >
          <span v-if="reportStore.isTransportLoading" class="animate-pulse">Memuat data...</span>
          <span v-else class="font-medium"
            >{{ reportStore.transportTotalData }} Rute Diterbitkan</span
          >

          <strong class="text-sky-600 font-headline font-bold text-xs sm:text-sm">
            {{ formatRupiah(reportStore.transportStats.realisasiAnggaran) }}
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>
