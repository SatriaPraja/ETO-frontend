<script setup lang="ts">
import { computed } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

const editStore = useTravelOrderEditStore()

function formatDate(dateStr?: string) {
  if (!dateStr) return '14 Mei 2026, 11:20 WIB'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const lastReturnedLog = computed(() => {
  return editStore.approvalLogs?.find((log: any) => log.action === 'RETURNED')
})

const cleanedNotes = computed(() => {
  const rawNotes = lastReturnedLog.value?.notes || editStore.notes || ''
  return rawNotes.replace(/^Dikembalikan untuk Koreksi (Draf|Order)\s*-\s*Catatan:\s*/i, '').trim()
})
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FEF6EC] to-[#FFF9F2] shadow-sm mb-6 p-4 md:p-6 font-body">
    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F0932B]"></div>
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-xl bg-[#F0932B]/15 flex items-center justify-center text-[#F0932B] shrink-0 mt-0.5">
        <span class="material-symbols-outlined text-[24px]">assignment_late</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-semibold text-gray-800 font-headline">Pengajuan Dikembalikan untuk Koreksi</h2>
            <span class="px-2 py-0.5 rounded-full bg-[#F0932B] text-white text-[10px] tracking-wide uppercase font-bold">
              Wajib Tindak Lanjut
            </span>
          </div>
          <span class="text-xs text-gray-500">Revisi ke-1</span>
        </div>
        
        <div class="mt-2 p-3 rounded-lg bg-white/90 shadow-sm text-gray-800 text-sm">
          <p class="italic">
            “{{ cleanedNotes || 'Tanggal keberangkatan tidak sesuai dengan Sprin. Mohon disesuaikan dengan jadwal acara tanggal 20 Mei 2026 dan lampiran manifest.' }}”
          </p>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-gray-500 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-[#F0932B]">account_circle</span>
            <span>Dikembalikan oleh: <strong class="text-gray-800 font-medium">{{ lastReturnedLog?.actorNama || editStore.approverNama || 'H. Mochammad Irfan, S.E., M.M.' }}</strong> (Kepala Kantor Wilayah Jawa Timur)</span>
          </div>
          <span class="hidden sm:inline">•</span>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>{{ formatDate(lastReturnedLog?.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>