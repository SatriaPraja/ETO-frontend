<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()

function getTransportIcon(type: string) {
  switch (type) {
    case 'flight': return { icon: 'flight', bg: 'bg-[#30C5F7]' }
    case 'train': return { icon: 'train', bg: 'bg-[#FF8927]' }
    case 'sea': return { icon: 'directions_boat', bg: 'bg-[#0099FF]' }
    case 'bus': return { icon: 'directions_bus', bg: 'bg-[#6A0000]' }
    case 'car': return { icon: 'directions_car', bg: 'bg-[#00BE5F]' }
    case 'hotel': return { icon: 'hotel', bg: 'bg-[#930049]' }
    default: return { icon: 'travel_explore', bg: 'bg-primary' }
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'pending': return { label: 'Menunggu Persetujuan Pejabat', bg: 'bg-blue-50 text-blue-600', dot: 'bg-blue-600' }
    case 'approved': return { label: 'Disetujui', bg: 'bg-green-50 text-emerald-600', dot: 'bg-emerald-600' }
    case 'returned': return { label: 'Dikembalikan', bg: 'bg-amber-50 text-amber-600', dot: 'bg-amber-600' }
    case 'rejected': return { label: 'Ditolak', bg: 'bg-red-50 text-red-600', dot: 'bg-red-600' }
    default: return { label: 'Draft', bg: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' }
  }
}
</script>

<template>
  <section class="rounded-xl bg-surfaceCard shadow-sm overflow-hidden border border-gray-100">
    <!-- Header Toolbar & Filters -->
    <div class="p-5 space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-textPrimary tracking-tight font-headline">Pengajuan Terakhir</h2>
          <p class="text-xs text-textMuted font-body">Daftar rekonsiliasi pengajuan perjalanan dinas dalam 30 hari kalender terakhir</p>
        </div>

        <!-- Filter Chips -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            v-for="filter in [
              { key: 'all', label: 'Semua (18)' },
              { key: 'pending', label: 'Menunggu (3)' },
              { key: 'approved', label: 'Disetujui (12)' },
              { key: 'returned', label: 'Perlu Revisi (2)' }
            ]"
            :key="filter.key"
            type="button"
            @click="dashboardStore.setFilter(filter.key)"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0',
              dashboardStore.activeFilter === filter.key
                ? 'bg-primary text-onPrimary shadow-sm'
                : 'bg-surfaceCanvas text-textMuted hover:text-textPrimary'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Search Toolbar -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div class="relative w-full sm:w-80">
          <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
          <input
            v-model="dashboardStore.searchQuery"
            type="text"
            placeholder="Cari no. e-TO, nama kegiatan..."
            class="w-full h-9 pl-9 pr-4 rounded-lg bg-surfaceCanvas text-xs font-body text-textPrimary placeholder:text-textMuted focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surfaceCanvas text-textMuted text-xs font-semibold">
            <span class="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Mei 2026</span>
          </div>
          <button type="button" class="h-9 px-3 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary flex items-center gap-1.5 text-xs font-semibold transition-colors">
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
          <tr class="bg-surfaceCanvas/80 h-9 text-textMuted uppercase text-[10px] font-bold tracking-wider border-y border-gray-100">
            <th class="px-4 py-2">No. Travel Order</th>
            <th class="px-3 py-2">Nama Kegiatan & Unit Kerja</th>
            <th class="px-3 py-2">Tanggal Rekam</th>
            <th class="px-2 py-2 text-center">Total Traveller</th>
            <th class="px-3 py-2">Status Persetujuan</th>
            <th class="px-4 py-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <tr
            v-for="order in dashboardStore.filteredOrders"
            :key="order.id"
            class="h-14 bg-surfaceCard hover:bg-surfaceCanvas/50 transition-colors group"
          >
            <!-- Order Code & Transport Type -->
            <td class="px-4 py-2.5">
              <div class="flex items-center gap-2.5">
                <div :class="['w-7 h-7 rounded-lg flex items-center justify-center text-onPrimary shadow-sm shrink-0', getTransportIcon(order.type).bg]">
                  <span class="material-symbols-outlined text-[16px]">{{ getTransportIcon(order.type).icon }}</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-bold text-textPrimary font-headline text-xs truncate">{{ order.code }}</span>
                  <span class="text-[10px] text-textMuted truncate">{{ order.subType }}</span>
                </div>
              </div>
            </td>

            <!-- Activity & Unit -->
            <td class="px-3 py-2.5">
              <div class="flex flex-col max-w-[220px] xl:max-w-[300px]">
                <span class="font-bold text-textPrimary truncate text-xs">{{ order.title }}</span>
                <span class="text-[10px] text-textMuted truncate">{{ order.unit }}</span>
              </div>
            </td>

            <!-- Date & Time -->
            <td class="px-3 py-2.5 whitespace-nowrap">
              <span class="text-textPrimary font-semibold block text-[11px]">{{ order.date }}</span>
              <span class="block text-[10px] text-textMuted">{{ order.time }}</span>
            </td>

            <!-- Travellers Count -->
            <td class="px-2 py-2.5 text-center whitespace-nowrap">
              <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surfaceCanvas font-bold text-textPrimary text-[11px]">
                {{ order.travellersCount }} Orang
              </span>
            </td>

            <!-- Status Badge -->
            <td class="px-3 py-2.5 whitespace-nowrap">
              <span :class="['inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold', getStatusBadge(order.status).bg]">
                <span :class="['w-1.5 h-1.5 rounded-full shrink-0', getStatusBadge(order.status).dot]"></span>
                <span>{{ getStatusBadge(order.status).label }}</span>
              </span>
            </td>

            <!-- Actions -->
            <td class="px-4 py-2.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1">
                <!-- Status: Approved -->
                <template v-if="order.status === 'approved'">
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-[11px] font-semibold transition-colors">
                    Detail
                  </button>
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-[11px] font-semibold inline-flex items-center gap-1 transition-colors">
                    <span class="material-symbols-outlined text-[14px]">print</span>
                    <span>Cetak e-TO</span>
                  </button>
                </template>

                <!-- Status: Returned -->
                <template v-else-if="order.status === 'returned'">
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-semibold transition-colors inline-flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">edit</span>
                    <span>Perbaiki</span>
                  </button>
                  <button type="button" class="p-1 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceCanvas transition-colors" title="Catatan Reviewer">
                    <span class="material-symbols-outlined text-[16px]">comment</span>
                  </button>
                </template>

                <!-- Status: Rejected -->
                <template v-else-if="order.status === 'rejected'">
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-[11px] font-semibold transition-colors">
                    Alasan Penolakan
                  </button>
                </template>

                <!-- Default / Pending -->
                <template v-else>
                  <button type="button" class="px-2.5 py-1 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-[11px] font-semibold transition-colors">
                    Lihat Detail
                  </button>
                  <button type="button" class="p-1 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceCanvas transition-colors" title="Cetak e-TO">
                    <span class="material-symbols-outlined text-[16px]">print</span>
                  </button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination & Footer -->
    <div class="px-5 py-3 bg-surfaceCard flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
      <div class="text-xs text-textMuted font-body">
        Menampilkan <strong class="text-textPrimary">1 - 5</strong> dari total <strong class="text-textPrimary">18</strong> pengajuan e-TO
      </div>
      
      <div class="flex items-center gap-1 text-xs font-semibold">
        <button type="button" disabled class="w-7 h-7 rounded-lg bg-surfaceCanvas text-textMuted flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors">
          <span class="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
        <button type="button" class="w-7 h-7 rounded-lg bg-primary text-onPrimary flex items-center justify-center shadow-sm">
          1
        </button>
        <button type="button" class="w-7 h-7 rounded-lg text-textPrimary hover:bg-surfaceCanvas flex items-center justify-center transition-colors">
          2
        </button>
        <button type="button" class="w-7 h-7 rounded-lg text-textPrimary hover:bg-surfaceCanvas flex items-center justify-center transition-colors">
          3
        </button>
        <button type="button" class="w-7 h-7 rounded-lg text-textPrimary hover:bg-surfaceCanvas flex items-center justify-center transition-colors">
          4
        </button>
        <button type="button" class="w-7 h-7 rounded-lg bg-surfaceCanvas text-textPrimary flex items-center justify-center hover:bg-gray-200 transition-colors">
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
</template>