<script setup lang="ts">
import { computed } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

const editStore = useTravelOrderEditStore()

function formatDate(dateStr?: string) {
  if (!dateStr) return '21 September 2026, 10:30 WIB'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const cleanedNotes = computed(() => {
  return editStore.notes || 'Tanggal keberangkatan dan alokasi anggaran perlu disesuaikan kembali dengan Surat Perintah resmi.'
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FEF6EC] to-[#FFF9F2] shadow-sm mb-6 p-4 md:p-6 font-body border border-amber-200/60">
    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F0932B]"></div>
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-xl bg-[#F0932B]/15 flex items-center justify-center text-[#F0932B] shrink-0 mt-0.5">
        <span class="material-symbols-outlined text-[24px]">assignment_late</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-gray-800 font-headline">Pengajuan Dikembalikan untuk Koreksi</h2>
            <span class="px-2.5 py-0.5 rounded-full bg-[#F0932B] text-white text-[10px] tracking-wide uppercase font-bold">
              Wajib Tindak Lanjut
            </span>
          </div>
          <span class="text-xs font-semibold text-amber-800">Status: Perlu Perbaikan</span>
        </div>
        
        <div class="mt-2 p-3.5 rounded-xl bg-white/90 shadow-2xs border border-amber-100 text-gray-800 text-xs leading-relaxed">
          <p class="italic font-medium text-gray-700">
            “{{ cleanedNotes }}”
          </p>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-gray-500 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-[#F0932B]">verified_user</span>
            <span>Peninjau: <strong class="text-gray-800 font-medium">{{ editStore.approverNama || 'Pejabat Penyetuju' }}</strong></span>
          </div>
          <span class="hidden sm:inline">•</span>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>{{ formatDate(editStore.orderDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>