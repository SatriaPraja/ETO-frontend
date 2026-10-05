<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReportStore } from '@/stores/reportStore'

const reportStore = useReportStore()
const activeTab = ref<'INTERNAL' | 'EKSTERNAL'>('INTERNAL')

// 🟢 Load data awal saat komponen pertama kali dipasang
onMounted(() => {
  reportStore.transportFilters.category = activeTab.value
  reportStore.transportFilters.page = 1
  reportStore.fetchTransportReport()
})

function switchTab(cat: 'INTERNAL' | 'EKSTERNAL') {
  activeTab.value = cat
  reportStore.transportFilters.category = cat
  reportStore.transportFilters.page = 1
  reportStore.fetchTransportReport()
}

function changePage(newPage: number) {
  if (newPage >= 1 && newPage <= reportStore.transportTotalPages) {
    reportStore.transportFilters.page = newPage
    reportStore.fetchTransportReport()
  }
}

function handleLimitChange(e: Event) {
  const target = e.target as HTMLSelectElement
  reportStore.transportFilters.limit = Number(target.value)
  reportStore.transportFilters.page = 1
  reportStore.fetchTransportReport()
}
</script>

<template>
  <div
    class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0"
  >
    <!-- Header Tabs Filter -->
    <div
      class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100"
    >
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="switchTab('INTERNAL')"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            activeTab === 'INTERNAL'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">badge</span>
          <span>Traveller Internal BPJS TK</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] font-bold transition-colors',
              activeTab === 'INTERNAL'
                ? 'bg-emerald-800 text-white'
                : 'bg-surfaceCanvas text-textMuted',
            ]"
          >
            {{ reportStore.transportStats?.internalBPJS ?? 0 }}
          </span>
        </button>

        <button
          type="button"
          @click="switchTab('EKSTERNAL')"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
            activeTab === 'EKSTERNAL'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'text-textMuted hover:bg-surfaceCanvas',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">person_add</span>
          <span>Traveller Eksternal / Tamu</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] font-bold transition-colors',
              activeTab === 'EKSTERNAL'
                ? 'bg-emerald-800 text-white'
                : 'bg-surfaceCanvas text-textMuted',
            ]"
          >
            {{ reportStore.transportStats?.eksternalTamu ?? 0 }}
          </span>
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

    <!-- Data Table Container -->
    <div class="overflow-x-auto relative">
      <!-- Loading Overlay -->
      <div
        v-if="reportStore.isTransportLoading"
        class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10"
      >
        <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
          <span class="material-symbols-outlined animate-spin">sync</span>
          Memuat data transportasi...
        </span>
      </div>

      <table class="w-full text-left text-xs">
        <thead
          class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100"
        >
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
          <tr v-if="reportStore.transportTransactions.length === 0">
            <td colspan="7" class="p-8 text-center text-textMuted">
              Tidak ada data riwayat perjalanan dinas yang ditemukan.
            </td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in reportStore.transportTransactions"
            :key="item.id || index"
            class="hover:bg-surfaceCanvas/50 transition-colors"
          >
            <td class="p-3 text-center text-textMuted font-bold">
              {{
                ((reportStore.transportFilters.page || 1) - 1) *
                  (reportStore.transportFilters.limit || 10) +
                index +
                1
              }}
            </td>
            <td class="p-3 text-textMuted font-medium">{{ item.tglRekam }}</td>
            <td class="p-3 font-bold text-emerald-800 font-headline">{{ item.toCode }}</td>
            <td class="p-3">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline">{{
                  item.guestName
                }}</strong>
                <span class="text-[10px] text-textMuted">
                  NPK: {{ item.npkOrKtp || '-' }} {{ item.jabatan ? `• ${item.jabatan}` : '' }}
                </span>
              </div>
            </td>
            <td class="p-3">
              <span class="font-extrabold text-textPrimary font-headline">{{
                item.routeInfo
              }}</span>
            </td>
            <td class="p-3">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary">{{ item.departureDate }}</strong>
                <span class="text-[10px] text-textMuted">
                  {{ item.isRoundTrip ? `s/d ${item.returnDate || '-'}` : 'Sekali Jalan' }}
                </span>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                <div
                  v-if="item.transportType === 'flight'"
                  class="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-[14px]">flight</span>
                </div>
                <div
                  v-else
                  class="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-[14px]">train</span>
                </div>
                <div class="flex flex-col">
                  <strong class="font-bold text-textPrimary">{{
                    item.maskapai || 'Transport'
                  }}</strong>
                  <span class="text-[10px] text-textMuted">{{ item.transportType }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div
      class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted"
    >
      <span>
        Menampilkan
        <strong
          >{{ reportStore.transportTransactions.length > 0 ? 1 : 0 }} -
          {{ reportStore.transportTransactions.length }}</strong
        >
        dari <strong>{{ reportStore.transportTotalData }}</strong> data perjalanan dinas
      </span>

      <div class="flex items-center gap-2">
        <span>Baris:</span>
        <select
          :value="reportStore.transportFilters.limit"
          @change="handleLimitChange"
          class="h-7 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none mr-2"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>

        <div class="flex items-center gap-1">
          <button
            type="button"
            @click="changePage((reportStore.transportFilters.page || 1) - 1)"
            :disabled="(reportStore.transportFilters.page || 1) <= 1"
            class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
          >
            ‹
          </button>

          <button
            v-for="p in reportStore.transportTotalPages"
            :key="p"
            type="button"
            @click="changePage(p)"
            :class="[
              'w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer',
              p === reportStore.transportFilters.page
                ? 'bg-emerald-800 text-white'
                : 'border border-gray-200 bg-surfaceCard text-textPrimary hover:bg-gray-100',
            ]"
          >
            {{ p }}
          </button>

          <button
            type="button"
            @click="changePage((reportStore.transportFilters.page || 1) + 1)"
            :disabled="(reportStore.transportFilters.page || 1) >= reportStore.transportTotalPages"
            class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
