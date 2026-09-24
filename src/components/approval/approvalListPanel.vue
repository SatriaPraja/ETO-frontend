<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useApprovalStore } from '@/stores/approvalStore'

const approvalStore = useApprovalStore()

onMounted(() => {
  approvalStore.fetchInbox()
})

// Refetch jika tab berubah
watch(() => approvalStore.activeTab, () => {
  approvalStore.fetchInbox()
})

// Debounce sederhana untuk pencarian
let searchTimeout: any = null
function handleSearchInput() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    approvalStore.fetchInbox()
  }, 400)
}
</script>

<template>
  <div class="space-y-3 font-body">
    <!-- Search Input -->
    <div class="relative">
      <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
      <input
        v-model="approvalStore.searchQuery"
        @input="handleSearchInput"
        type="text"
        placeholder="Cari No. TO, kegiatan, atau nama booker..."
        class="w-full h-9 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-100 text-xs text-textPrimary focus:outline-none focus:border-primary shadow-2xs"
      />
    </div>

    <!-- Toggle Sub-Tabs -->
    <div class="flex items-center gap-2 text-xs">
      <button
        type="button"
        @click="approvalStore.activeTab = 'pending'"
        :class="[
          'px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer',
          approvalStore.activeTab === 'pending'
            ? 'bg-surfaceCard text-textPrimary border border-gray-100 shadow-2xs'
            : 'text-textMuted hover:bg-surfaceCanvas'
        ]"
      >
        <span>Belum Diproses</span>
        <span class="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">
          {{ approvalStore.counts.pending }}
        </span>
      </button>

      <button
        type="button"
        @click="approvalStore.activeTab = 'history'"
        :class="[
          'px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer',
          approvalStore.activeTab === 'history'
            ? 'bg-surfaceCard text-textPrimary border border-gray-100 shadow-2xs'
            : 'text-textMuted hover:bg-surfaceCanvas'
        ]"
      >
        <span>Riwayat Persetujuan</span>
        <span class="px-1.5 py-0.2 rounded-full bg-surfaceCanvas text-textMuted text-[10px]">
          {{ approvalStore.counts.history }}
        </span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="approvalStore.isLoading" class="p-8 text-center text-xs text-textMuted">
      Memuat daftar pengajuan...
    </div>

    <!-- Empty State -->
    <div v-else-if="approvalStore.items.length === 0" class="p-8 text-center text-xs text-textMuted bg-surfaceCard rounded-xl border border-gray-100">
      Tidak ada pengajuan ditemukan.
    </div>

    <!-- List Item Cards (Real Data) -->
    <div v-else class="space-y-2">
      <div
        v-for="item in approvalStore.items"
        :key="item.id"
        @click="approvalStore.selectItem(item)"
        :class="[
          'p-4 rounded-xl border transition-all cursor-pointer font-body space-y-2.5',
          approvalStore.selectedItem?.id === item.id
            ? 'bg-emerald-50/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
            : 'bg-surfaceCard border-gray-100 hover:border-gray-200 shadow-2xs'
        ]"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-textPrimary font-headline flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{{ item.id }}</span>
          </span>
          <span class="text-[10px] text-textMuted flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">schedule</span>
            <span>{{ item.timeAgo }}</span>
          </span>
        </div>

        <div>
          <h4 class="font-bold text-textPrimary text-xs font-headline leading-snug line-clamp-2">
            {{ item.title }}
          </h4>
          <p class="text-[11px] text-textMuted mt-0.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">person</span>
            <span>{{ item.submitter }} • {{ item.unit }}</span>
          </p>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-gray-100/60 text-xs">
          <div class="flex items-center gap-1.5">
            <span :class="['w-5 h-5 rounded text-white flex items-center justify-center text-[12px] material-symbols-outlined', item.typeColor]">
              {{ item.typeIcon }}
            </span>
            <span class="px-2 py-0.5 rounded bg-surfaceCanvas text-[10px] font-bold text-textMuted">
              {{ item.travelerCount }}
            </span>
          </div>

          <div class="text-right">
            <strong class="font-extrabold text-textPrimary font-headline text-xs block">{{ item.amount }}</strong>
            <span :class="['text-[10px] font-bold block', approvalStore.selectedItem?.id === item.id ? 'text-primary' : 'text-textMuted']">
              {{ item.statusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>