<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHistoryStore } from '@/stores/historyStore'
import { onMounted } from 'vue'

const router = useRouter()
const historyStore = useHistoryStore()

function goToDetail(toCode: string) {
  const cleanId = toCode.replace(/\//g, '-')
  router.push(`/history/order-detail/${cleanId}`)
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(() => {
  historyStore.loadHistory()
})
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <!-- Table Sub-header -->
    <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-textMuted text-[20px]">view_list</span>
        <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Pengajuan e-TO</h3>
        <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold">
          {{ historyStore.meta.totalData }} Pengajuan
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="historyStore.loadHistory()"
          class="p-1.5 rounded-lg border border-gray-200 text-textMuted hover:text-textPrimary cursor-pointer"
          title="Segarkan Data"
        >
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
            <th class="p-3.5">NO. TRAVEL ORDER & BOOKER</th>
            <th class="p-3.5">NAMA KEGIATAN & NO. SPRIN</th>
            <th class="p-3.5 text-center">TANGGAL PENGAJUAN</th>
            <th class="p-3.5 text-right">TRAVELLER & ESTIMASI</th>
            <th class="p-3.5 text-center">STATUS PERSETUJUAN</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <!-- Loading State -->
          <tr v-if="historyStore.isLoading">
            <td colspan="6" class="p-8 text-center text-textMuted">
              <span class="material-symbols-outlined animate-spin text-[24px] text-primary">progress_activity</span>
              <p class="mt-2 text-xs">Memuat data riwayat pengajuan...</p>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="historyStore.items.length === 0">
            <td colspan="6" class="p-8 text-center text-textMuted">
              Data pengajuan tidak ditemukan.
            </td>
          </tr>

          <!-- Data List -->
          <tr 
            v-else
            v-for="(item, idx) in historyStore.items" 
            :key="item.id" 
            @click="goToDetail(item.toCode)"
            class="hover:bg-emerald-50/40 cursor-pointer transition-colors"
          >
            <td class="p-3.5 text-center text-textMuted font-mono font-medium">
              {{ (historyStore.meta.currentPage - 1) * historyStore.meta.limit + idx + 1 }}
            </td>
            <td class="p-3.5">
              <div class="flex flex-col gap-0.5">
                <span class="font-bold text-primary hover:underline font-headline text-xs">{{ item.toCode }}</span>
                <span class="text-[11px] text-textMuted font-medium">Booker: {{ item.bookerNama || '-' }}</span>
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
            <td class="p-3.5 text-center font-medium text-textPrimary">
              {{ formatDate(item.orderDate || item.createdAt) }}
            </td>
            <td class="p-3.5 text-right">
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary flex items-center justify-end gap-1">
                  <span class="material-symbols-outlined text-[14px] text-textMuted">group</span>
                  <span>{{ item.totalTravellers }} Traveller</span>
                </span>
                <span class="font-extrabold text-textPrimary font-headline text-xs mt-0.5">
                  {{ formatRupiah(Number(item.totalEstimatedCost)) }}
                </span>
              </div>
            </td>
            <td class="p-3.5 text-center">
              <span
                v-if="item.status === 'WAITING_PEJABAT'"
                class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold inline-flex items-center gap-1 border border-blue-100"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Menunggu Pejabat</span>
              </span>
              <span
                v-else-if="item.status === 'APPROVED'"
                class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-100"
              >
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Disetujui</span>
              </span>
              <span
                v-else-if="item.status === 'RETURNED'"
                class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold inline-flex items-center gap-1 border border-amber-100"
              >
                <span class="material-symbols-outlined text-[14px]">warning</span>
                <span>Dikembalikan</span>
              </span>
              <span
                v-else-if="item.status === 'REJECTED'"
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
        <span>Menampilkan <strong>{{ historyStore.items.length }}</strong> dari <strong>{{ historyStore.meta.totalData }}</strong> data pengajuan</span>
      </div>

      <div class="flex items-center gap-1">
        <button 
          type="button" 
          @click="historyStore.setPage(historyStore.meta.currentPage - 1)"
          :disabled="historyStore.meta.currentPage <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted hover:bg-surfaceCanvas disabled:opacity-40 cursor-pointer"
        >
          ‹
        </button>
        <span class="px-3 font-bold text-textPrimary">
          Halaman {{ historyStore.meta.currentPage }} dari {{ historyStore.meta.totalPages || 1 }}
        </span>
        <button 
          type="button" 
          @click="historyStore.setPage(historyStore.meta.currentPage + 1)"
          :disabled="historyStore.meta.currentPage >= historyStore.meta.totalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-surfaceCanvas disabled:opacity-40 cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>