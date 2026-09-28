<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()

onMounted(() => {
  reportStore.fetchHotelReport()
})

function formatRupiah(amount?: number) {
  const num = Number(amount) || 0
  return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num)}`
}

function changePage(newPage: number) {
  if (newPage >= 1 && newPage <= reportStore.hotelTotalPages) {
    reportStore.hotelFilters.page = newPage
    reportStore.fetchHotelReport()
  }
}

function handleLimitChange(e: Event) {
  const target = e.target as HTMLSelectElement
  reportStore.hotelFilters.limit = Number(target.value)
  reportStore.hotelFilters.page = 1
  reportStore.fetchHotelReport()
}
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <!-- Sub Header -->
    <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Transaksi Akomodasi</h3>
        <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
          {{ reportStore.hotelTotalData }} Data Ditemukan
        </span>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <span class="text-textMuted">Tampilkan:</span>
        <select
          :value="reportStore.hotelFilters.limit"
          @change="handleLimitChange"
          class="h-8 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none"
        >
          <option :value="10">10 Baris</option>
          <option :value="25">25 Baris</option>
          <option :value="50">50 Baris</option>
        </select>
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto relative">
      <!-- Loading Overlay -->
      <div v-if="reportStore.isHotelLoading" class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
        <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
          <span class="material-symbols-outlined animate-spin">sync</span>
          Memuat data laporan...
        </span>
      </div>

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
          <tr v-if="reportStore.hotelTransactions.length === 0">
            <td colspan="8" class="p-8 text-center text-textMuted">
              Tidak ada data transaksi akomodasi yang sesuai filter.
            </td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in reportStore.hotelTransactions"
            :key="item.id || index"
            class="hover:bg-surfaceCanvas/50 transition-colors"
          >
            <td class="p-3.5 text-center font-bold text-textMuted">
              {{ ((reportStore.hotelFilters.page || 1) - 1) * (reportStore.hotelFilters.limit || 10) + index + 1 }}
            </td>
            <td class="p-3.5">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded bg-pink-50 text-[#930049] flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[15px]">hotel</span>
                </span>
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary font-headline text-xs">{{ item.hotelName }}</span>
                  <span v-if="item.starRating" class="text-[10px] text-amber-500 font-semibold">
                    ★ (Bintang {{ item.starRating }})
                  </span>
                </div>
              </div>
            </td>
            <td class="p-3.5 font-medium text-textPrimary">{{ item.cityName || '-' }}</td>
            <td class="p-3.5 text-center font-medium text-textPrimary">{{ item.checkInDate }}</td>
            <td class="p-3.5 text-center font-medium text-textPrimary">{{ item.checkOutDate }}</td>
            <td class="p-3.5 text-center">
              <span class="px-2 py-0.5 rounded bg-surfaceCanvas text-textPrimary font-bold text-[11px]">
                {{ item.durationNights }} Malam
              </span>
            </td>
            <td class="p-3.5 text-center font-bold text-textPrimary">{{ item.roomCount }} Kamar</td>
            <td class="p-3.5 text-right font-extrabold text-textPrimary font-headline">
              {{ formatRupiah(item.pricePerNight) }}
            </td>
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
          <strong class="text-emerald-900 font-extrabold text-sm">
            {{ reportStore.hotelStats.totalKamar }} Kamar
          </strong>
        </div>
        <div>
          <span class="text-[10px] text-emerald-800 font-bold block">TOTAL ROOM-NIGHTS:</span>
          <strong class="text-emerald-900 font-extrabold text-sm">
            {{ reportStore.hotelStats.totalRoomNights }} ROOM-NIGHTS
          </strong>
        </div>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <span>
        Menampilkan <strong>{{ reportStore.hotelTransactions.length > 0 ? 1 : 0 }} - {{ reportStore.hotelTransactions.length }}</strong>
        dari <strong>{{ reportStore.hotelTotalData }}</strong> reservasi akomodasi
      </span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          @click="changePage((reportStore.hotelFilters.page || 1) - 1)"
          :disabled="(reportStore.hotelFilters.page || 1) <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
        >
          ‹
        </button>

        <button
          v-for="p in reportStore.hotelTotalPages"
          :key="p"
          type="button"
          @click="changePage(p)"
          :class="[
            'w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer',
            p === reportStore.hotelFilters.page
              ? 'bg-emerald-800 text-white'
              : 'border border-gray-200 bg-surfaceCard text-textPrimary hover:bg-gray-100'
          ]"
        >
          {{ p }}
        </button>

        <button
          type="button"
          @click="changePage((reportStore.hotelFilters.page || 1) + 1)"
          :disabled="(reportStore.hotelFilters.page || 1) >= reportStore.hotelTotalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>