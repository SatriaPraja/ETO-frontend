<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BudgetItem } from '@/models/reference'
import { useReferenceStore } from '@/stores/referenceStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: BudgetItem): void
}>()

const refStore = useReferenceStore()
const searchQuery = ref('')

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      searchQuery.value = ''
      refStore.loadBudgets()
    }
  }
)

function handleSearch() {
  refStore.loadBudgets(searchQuery.value)
}

function handleSelect(item: BudgetItem) {
  emit('select', item)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
    >
      <div class="bg-surfaceCard w-full max-w-2xl rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[85vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-sky-50 text-sky-800 shrink-0">
              <span class="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Pilih Mata Anggaran (MAK)
              </h3>
              <p class="text-xs text-textMuted mt-0.5">
                Daftar Pembebanan Anggaran Operasional Perjalanan Dinas Aktif
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="emit('close')"
            class="p-1 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceCanvas transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-100 bg-surfaceCanvas/50 shrink-0">
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">search</span>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Cari Kode MAK (e.g. 521211), Nama Akun, atau Program..."
              class="w-full h-10 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
            />
          </div>
        </div>

        <!-- Content Body -->
        <div class="p-4 overflow-y-auto flex-1 space-y-2.5">
          <div v-if="refStore.isBudgetsLoading" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-[24px] text-primary">progress_activity</span>
            <span>Memuat data Mata Anggaran...</span>
          </div>

          <div v-else-if="refStore.budgetsError" class="py-10 text-center text-rose-600 text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">error</span>
            <span>{{ refStore.budgetsError }}</span>
            <button @click="refStore.loadBudgets(searchQuery)" class="mt-2 text-primary font-bold underline cursor-pointer">Coba lagi</button>
          </div>

          <div v-else-if="refStore.budgets.length === 0" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">folder_off</span>
            <span>Mata Anggaran tidak ditemukan.</span>
          </div>

          <div
            v-else
            v-for="item in refStore.budgets"
            :key="item.id"
            @click="handleSelect(item)"
            class="p-4 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-emerald-50/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div class="flex flex-col space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                  {{ item.accountNumber }}
                </span>
                <span class="text-xs font-bold text-textPrimary group-hover:text-primary transition-colors">
                  {{ item.accountName }}
                </span>
              </div>
              <p class="text-[11px] text-textMuted">
                Program: <strong class="text-textPrimary font-medium">{{ item.programName }}</strong>
              </p>
              <p class="text-[10px] text-textMuted">
                Unit: {{ item.officeName }}
              </p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
              <div class="text-left sm:text-right">
                <span class="text-[10px] text-textMuted block">Sisa Saldo:</span>
                <span class="text-xs font-extrabold text-emerald-700 font-headline">
                  Rp {{ (item.paguBudget - item.usedBudget).toLocaleString('id-ID') }}
                </span>
              </div>

              <button
                type="button"
                class="px-3 py-1.5 rounded-lg bg-surfaceCanvas group-hover:bg-primary group-hover:text-onPrimary text-textPrimary text-xs font-bold transition-colors shrink-0"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Bar -->
        <div class="p-3 px-5 border-t border-gray-100 bg-surfaceCanvas text-right shrink-0">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-xl bg-surfaceCard hover:bg-gray-200 border border-gray-200 text-textPrimary text-xs font-bold transition-colors cursor-pointer"
          >
            Batal / Tutup
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>