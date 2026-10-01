<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import type { DashboardQueryParams } from '@/models/dashboard'

const dashboardStore = useDashboardStore()

const searchInput = ref(dashboardStore.filters.search || '')

// Debounce pencarian
let searchTimeout: ReturnType<typeof setTimeout>
function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    dashboardStore.setSearchQuery(searchInput.value)
  }, 400)
}

function getStatusBadge(status: DashboardQueryParams['status']) {
  switch (status) {
    case 'WAITING_PEJABAT':
      return { label: 'Menunggu Persetujuan', bg: 'bg-blue-50 text-blue-600', dot: 'bg-blue-600' }
    case 'APPROVED':
      return { label: 'Disetujui', bg: 'bg-green-50 text-emerald-600', dot: 'bg-emerald-600' }
    case 'RETURNED':
      return { label: 'Perlu Revisi', bg: 'bg-amber-50 text-amber-600', dot: 'bg-amber-600' }
    case 'REJECTED':
      return { label: 'Ditolak', bg: 'bg-red-50 text-red-600', dot: 'bg-red-600' }
    case 'CANCELLED':
      return { label: 'Dibatalkan', bg: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' }
    default:
      return { label: 'Semua Status', bg: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' }
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const statusFilters: { key: DashboardQueryParams['status']; label: string }[] = [
  { key: 'ALL', label: 'Semua' },
  { key: 'WAITING_PEJABAT', label: 'Menunggu' },
  { key: 'APPROVED', label: 'Disetujui' },
  { key: 'RETURNED', label: 'Perlu Revisi' },
]
</script>

<template>
  <section class="rounded-xl bg-surfaceCard shadow-sm overflow-hidden border border-gray-100">
    <!-- Header Toolbar & Filters -->
    <div class="p-5 space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-textPrimary tracking-tight font-headline">
            Pengajuan Terakhir
          </h2>
          <p class="text-xs text-textMuted font-body">
            Daftar rekonsiliasi pengajuan perjalanan dinas dalam 30 hari kalender terakhir
          </p>
        </div>

        <!-- Filter Chips -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            v-for="filter in statusFilters"
            :key="filter.key"
            type="button"
            @click="dashboardStore.setStatusFilter(filter.key)"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0',
              dashboardStore.filters.status === filter.key
                ? 'bg-primary text-onPrimary shadow-sm'
                : 'bg-surfaceCanvas text-textMuted hover:text-textPrimary',
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Search Toolbar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div class="relative w-full sm:w-80">
          <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]"
            >search</span
          >
          <input
            v-model="searchInput"
            @input="handleSearch"
            type="text"
            placeholder="Cari no. e-TO, nama kegiatan..."
            class="w-full h-9 pl-9 pr-4 rounded-lg bg-surfaceCanvas text-xs font-body text-textPrimary placeholder:text-textMuted focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            class="h-9 px-3 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary flex items-center gap-1.5 text-xs font-semibold transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">tune</span>
            <span>Filter Lanjutan</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Master Ledger Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left font-body table-auto">
        <thead>
          <tr
            class="bg-surfaceCanvas/80 h-9 text-textMuted uppercase text-[10px] font-bold tracking-wider border-y border-gray-100"
          >
            <th class="px-4 py-2">No. Travel Order</th>
            <th class="px-3 py-2">Nama Kegiatan & Unit Kerja</th>
            <th class="px-3 py-2">Tanggal Order</th>
            <th class="px-2 py-2 text-center">Total Traveller</th>
            <th class="px-3 py-2">Status Persetujuan</th>
            <!-- <th class="px-4 py-2 text-right">Aksi</th> -->
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <!-- Loading State -->
          <tr v-if="dashboardStore.isLoading">
            <td colspan="6" class="px-4 py-8 text-center text-textMuted">
              <span class="animate-pulse">Memuat data pengajuan...</span>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="dashboardStore.recentOrders.length === 0">
            <td colspan="6" class="px-4 py-8 text-center text-textMuted">
              Tidak ada data pengajuan yang ditemukan.
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-else
            v-for="order in dashboardStore.recentOrders"
            :key="order.id"
            class="h-14 bg-surfaceCard hover:bg-surfaceCanvas/50 transition-colors group"
          >
            <!-- Order Code -->
            <td class="px-4 py-2.5">
              <div class="flex items-center gap-2.5">
                <div
                  class="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-[16px]">confirmation_number</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-bold text-textPrimary font-headline text-xs truncate">{{
                    order.toCode
                  }}</span>
                  <span class="text-[10px] text-textMuted truncate">{{ order.unitKerjaKode }}</span>
                </div>
              </div>
            </td>

            <!-- Activity & Unit -->
            <td class="px-3 py-2.5">
              <div class="flex flex-col max-w-[220px] xl:max-w-[300px]">
                <span class="font-bold text-textPrimary truncate text-xs">{{
                  order.activityName
                }}</span>
                <span class="text-[10px] text-textMuted truncate">{{ order.unitKerjaNama }}</span>
              </div>
            </td>

            <!-- Date -->
            <td class="px-3 py-2.5 whitespace-nowrap">
              <span class="text-textPrimary font-semibold block text-[11px]">
                {{ formatDate(order.orderDate) }}
              </span>
            </td>

            <!-- Travellers Count -->
            <td class="px-2 py-2.5 text-center whitespace-nowrap">
              <span
                class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surfaceCanvas font-bold text-textPrimary text-[11px]"
              >
                {{ order.totalTravellers }} Orang
              </span>
            </td>

            <!-- Status Badge -->
            <td class="px-3 py-2.5 whitespace-nowrap">
              <span
                :class="[
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold',
                  getStatusBadge(order.status).bg,
                ]"
              >
                <span
                  :class="['w-1.5 h-1.5 rounded-full shrink-0', getStatusBadge(order.status).dot]"
                ></span>
                <span>{{ getStatusBadge(order.status).label }}</span>
              </span>
            </td>

            <!-- Actions
            <td class="px-4 py-2.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1">
                <template v-if="order.status === 'APPROVED'">
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-[11px] font-semibold transition-colors">
                    Detail
                  </button>
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-[11px] font-semibold inline-flex items-center gap-1 transition-colors">
                    <span class="material-symbols-outlined text-[14px]">print</span>
                    <span>Cetak e-TO</span>
                  </button>
                </template>

                <template v-else-if="order.status === 'RETURNED'">
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-semibold transition-colors inline-flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">edit</span>
                    <span>Perbaiki</span>
                  </button>
                </template>

                <template v-else>
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-[11px] font-semibold transition-colors">
                    Lihat Detail
                  </button>
                </template>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination & Footer -->
    <div
      class="px-5 py-3 bg-surfaceCard flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100"
    >
      <div class="text-xs text-textMuted font-body">
        Menampilkan
        <strong class="text-textPrimary">
          {{
            (dashboardStore.meta.currentPage - 1) * dashboardStore.meta.limit +
            (dashboardStore.recentOrders.length ? 1 : 0)
          }}
          -
          {{
            Math.min(
              dashboardStore.meta.currentPage * dashboardStore.meta.limit,
              dashboardStore.meta.totalData,
            )
          }}
        </strong>
        dari total
        <strong class="text-textPrimary">{{ dashboardStore.meta.totalData }}</strong> pengajuan e-TO
      </div>

      <div class="flex items-center gap-1 text-xs font-semibold">
        <button
          type="button"
          :disabled="dashboardStore.meta.currentPage <= 1"
          @click="dashboardStore.changePage(dashboardStore.meta.currentPage - 1)"
          class="w-7 h-7 rounded-lg bg-surfaceCanvas text-textMuted flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        <button
          v-for="page in dashboardStore.meta.totalPages"
          :key="page"
          type="button"
          @click="dashboardStore.changePage(page)"
          :class="[
            'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
            dashboardStore.meta.currentPage === page
              ? 'bg-primary text-onPrimary shadow-sm'
              : 'text-textPrimary hover:bg-surfaceCanvas',
          ]"
        >
          {{ page }}
        </button>

        <button
          type="button"
          :disabled="dashboardStore.meta.currentPage >= dashboardStore.meta.totalPages"
          @click="dashboardStore.changePage(dashboardStore.meta.currentPage + 1)"
          class="w-7 h-7 rounded-lg bg-surfaceCanvas text-textPrimary flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
</template>
