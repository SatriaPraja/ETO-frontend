<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApproverItem } from '@/models/reference'
import { useReferenceStore } from '@/stores/referenceStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: ApproverItem): void
}>()

const refStore = useReferenceStore()
const searchQuery = ref('')

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      searchQuery.value = ''
      refStore.loadApprovers()
    }
  }
)

function handleSearch() {
  refStore.loadApprovers(searchQuery.value)
}

function handleSelect(item: ApproverItem) {
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
            <div class="p-2 rounded-xl bg-emerald-50 text-emerald-800 shrink-0">
              <span class="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Pilih Kepala Unit Kerja (Pejabat Penyetuju)
              </h3>
              <p class="text-xs text-textMuted mt-0.5">
                Direktori Pejabat Penyetuju Anggaran Perjalanan Dinas BPJS Ketenagakerjaan
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
              placeholder="Cari Nama Pejabat, NPK, atau Jabatan..."
              class="w-full h-10 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
            />
          </div>
        </div>

        <!-- Content Body -->
        <div class="p-4 overflow-y-auto flex-1 space-y-2">
          <div v-if="refStore.isApproversLoading" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-[24px] text-primary">progress_activity</span>
            <span>Memuat data Pejabat Penyetuju...</span>
          </div>

          <div v-else-if="refStore.approversError" class="py-10 text-center text-rose-600 text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">error</span>
            <span>{{ refStore.approversError }}</span>
            <button @click="refStore.loadApprovers(searchQuery)" class="mt-2 text-primary font-bold underline cursor-pointer">Coba lagi</button>
          </div>

          <div v-else-if="refStore.approvers.length === 0" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">group_off</span>
            <span>Pejabat Penyetuju tidak ditemukan.</span>
          </div>

          <div
            v-else
            v-for="item in refStore.approvers"
            :key="item.id"
            @click="handleSelect(item)"
            class="p-3.5 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-emerald-50/40 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 font-headline">
                {{ item.avatarInitials || item.namaLengkap.charAt(0) }}
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-textPrimary group-hover:text-primary transition-colors">
                  {{ item.namaLengkap }}
                </span>
                <span class="text-[11px] text-textMuted font-mono">
                  NPK: {{ item.npk }} · {{ item.jabatan }}
                </span>
                <span class="text-[10px] text-emerald-700 font-medium mt-0.5">
                  {{ item.unitKerjaNama }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="px-3 py-1.5 rounded-lg bg-surfaceCanvas group-hover:bg-primary group-hover:text-onPrimary text-textPrimary text-xs font-bold transition-colors shrink-0"
            >
              Pilih
            </button>
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