<script setup lang="ts">
import { useBudgetStore } from '@/stores/budgetStore'
import type { BudgetItem } from '@/models/budget'

const store = useBudgetStore()

const emit = defineEmits(['open-detail', 'open-edit', 'open-delete'])

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val || 0)
}

function getProgramIcon(programName: string): string {
  const p = (programName || '').toLowerCase()
  if (p.includes('kepesertaan')) return 'trending_up'
  if (p.includes('tata kelola')) return 'corporate_fare'
  if (p.includes('mitigasi') || p.includes('klaim')) return 'gavel'
  if (p.includes('kepatuhan') || p.includes('iuran')) return 'policy'
  if (p.includes('human') || p.includes('sertifikasi')) return 'psychology'
  if (p.includes('spi') || p.includes('audit')) return 'verified_user'
  return 'work'
}

function changePage(newPage: number) {
  if (newPage >= 1 && newPage <= store.totalPages) {
    store.filters.page = newPage
    store.fetchBudgets()
  }
}

function handleLimitChange(e: Event) {
  const limit = parseInt((e.target as HTMLSelectElement).value, 10)
  store.filters.limit = limit
  store.filters.page = 1
  store.fetchBudgets()
}
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0 relative">
    <!-- Loading Overlay -->
    <div v-if="store.isLoading" class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
      <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
        <span class="material-symbols-outlined animate-spin">sync</span>
        Memuat data anggaran...
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5">KANTOR / UNIT KERJA</th>
            <th class="p-3.5">NOMOR AKUN (COA)</th>
            <th class="p-3.5">NAMA URAIAN ANGGARAN</th>
            <th class="p-3.5">PROGRAM KERJA RESMI</th>
            <th class="p-3.5 text-right">PAGU AWAL</th>
            <th class="p-3.5 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.budgets.length === 0">
            <td colspan="7" class="p-8 text-center text-textMuted">Tidak ada data mata anggaran yang ditemukan.</td>
          </tr>
          <tr
            v-else
            v-for="(item, idx) in store.budgets"
            :key="item.id"
            class="hover:bg-surfaceCanvas/50 transition-colors"
          >
            <td class="p-3.5 text-center text-textMuted font-medium">
              {{ ((store.filters.page || 1) - 1) * (store.filters.limit || 10) + idx + 1 }}
            </td>
            <td class="p-3.5 font-bold text-textPrimary">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-textMuted text-[16px]">domain</span>
                <span>{{ item.officeName }}</span>
              </div>
            </td>
            <td class="p-3.5 font-mono font-bold text-emerald-800 text-xs">{{ item.accountNumber }}</td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline leading-tight">{{ item.accountName }}</strong>
                <span class="text-[10px] text-textMuted mt-0.5">{{ item.activityName }}</span>
              </div>
            </td>
            <td class="p-3.5">
              <div class="flex items-center gap-1.5 text-textPrimary font-semibold">
                <span class="material-symbols-outlined text-textMuted text-[16px]">
                  {{ getProgramIcon(item.programName) }}
                </span>
                <span>{{ item.programName }}</span>
              </div>
            </td>
            <td class="p-3.5 text-right font-extrabold text-textPrimary font-headline text-xs">
              {{ formatCurrency(item.paguBudget) }}
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" @click="emit('open-detail', item)" class="p-1 hover:text-textPrimary cursor-pointer" title="Detail">
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
                <button type="button" @click="emit('open-edit', item)" class="p-1 hover:text-textPrimary cursor-pointer" title="Edit">
                  <span class="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button type="button" @click="emit('open-delete', item)" class="p-1 hover:text-red-600 cursor-pointer" title="Hapus">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <div class="flex items-center gap-2">
        <span>Baris per halaman:</span>
        <select
          :value="store.filters.limit"
          @change="handleLimitChange"
          class="h-7 px-2 rounded bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
        <span class="border-l border-gray-200 pl-3 hidden md:inline">Terkoneksi ke Core ERP Keuangan (SAP/SMILE BPJS)</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          @click="changePage(1)"
          :disabled="(store.filters.page || 1) <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
        >
          |&lt;
        </button>
        <button
          type="button"
          @click="changePage((store.filters.page || 1) - 1)"
          :disabled="(store.filters.page || 1) <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
        >
          &lt;
        </button>

        <button
          v-for="p in store.totalPages"
          :key="p"
          type="button"
          @click="changePage(p)"
          :class="[
            'w-7 h-7 rounded text-xs font-bold flex items-center justify-center cursor-pointer',
            p === store.filters.page ? 'bg-emerald-800 text-white' : 'border border-gray-200 bg-surfaceCard text-textPrimary'
          ]"
        >
          {{ p }}
        </button>

        <button
          type="button"
          @click="changePage((store.filters.page || 1) + 1)"
          :disabled="(store.filters.page || 1) >= store.totalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
        >
          &gt;
        </button>
        <button
          type="button"
          @click="changePage(store.totalPages)"
          :disabled="(store.filters.page || 1) >= store.totalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
        >
          &gt;|
        </button>
      </div>
    </div>
  </div>
</template>