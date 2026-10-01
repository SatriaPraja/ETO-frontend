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
  return (
    editStore.notes ||
    'Tanggal keberangkatan dan alokasi anggaran perlu disesuaikan kembali dengan Surat Perintah resmi.'
  )
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FEF6EC] to-[#FFF9F2] shadow-2xs mb-6 p-3.5 sm:p-5 font-body border border-amber-200/70"
  >
    <!-- Accent Line Kiri -->
    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F0932B]"></div>

    <div class="flex items-start gap-3 sm:gap-4 pl-1">
      <!-- Icon Alert -->
      <div
        class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F0932B]/15 flex items-center justify-center text-[#F0932B] shrink-0 mt-0.5"
      >
        <span class="material-symbols-outlined text-[20px] sm:text-[24px]">assignment_late</span>
      </div>

      <div class="flex-1 min-w-0">
        <!-- Header & Badge -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-1"
        >
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-sm sm:text-base font-bold text-gray-800 font-headline leading-snug">
              Pengajuan Dikembalikan untuk Koreksi
            </h2>
            <span
              class="px-2.5 py-0.5 rounded-full bg-[#F0932B] text-white text-[10px] tracking-wide uppercase font-bold shrink-0 whitespace-nowrap"
            >
              Wajib Tindak Lanjut
            </span>
          </div>

          <span class="text-[11px] sm:text-xs font-semibold text-amber-800 shrink-0">
            Status: Perlu Perbaikan
          </span>
        </div>

        <!-- Box Catatan Tambahan (Notes) -->
        <div
          class="mt-2 p-3 rounded-xl bg-white/90 shadow-2xs border border-amber-100 text-gray-800 text-xs leading-relaxed"
        >
          <p class="italic font-medium text-gray-700 break-words">“{{ cleanedNotes }}”</p>
        </div>

        <!-- Metadata Peninjau & Waktu -->
        <div
          class="mt-2.5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-gray-500 text-[11px] sm:text-xs"
        >
          <div class="flex items-start sm:items-center gap-1.5">
            <span
              class="material-symbols-outlined text-[16px] text-[#F0932B] shrink-0 mt-0.5 sm:mt-0"
            >
              verified_user
            </span>
            <span class="leading-tight">
              Peninjau:
              <strong class="text-gray-800 font-medium">
                {{ editStore.approverNama || 'Pejabat Penyetuju' }}
              </strong>
            </span>
          </div>

          <span class="hidden sm:inline text-gray-300">•</span>

          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] shrink-0">schedule</span>
            <span>{{ formatDate(editStore.orderDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
