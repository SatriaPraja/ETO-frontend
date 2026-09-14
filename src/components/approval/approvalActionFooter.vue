<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleApprove() {
  alert('Pengajuan e-TO/2026/05/00187 Berhasil Disetujui!')
  router.push('/history')
}

function handleReject() {
  alert('Pengajuan e-TO/2026/05/00187 Telah Ditolak.')
}

function handleReturn() {
  alert('Pengajuan Dikembalikan ke Booker untuk Koreksi.')
}
</script>

<template>
  <div class="sticky bottom-0 bg-surfaceCard border-t border-gray-200 p-4 rounded-b-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg font-body z-20">
    <div class="flex items-center gap-2 text-xs text-textMuted">
      <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
      <span>Anda menyetujui sebagai: <strong class="text-textPrimary font-bold">Kepala Kantor Wilayah Jawa Timur</strong></span>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-auto">
      <!-- Tombol Kembalikan (Koreksi) -->
      <button
        type="button"
        @click="handleReturn"
        class="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">history_edu</span>
        <span>Kembalikan (Koreksi)</span>
      </button>

      <!-- Tombol Tolak -->
      <button
        type="button"
        @click="handleReject"
        class="px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <span class="material-symbols-outlined text-[16px]">cancel</span>
        <span>Tolak Pengajuan</span>
      </button>

      <!-- Tombol Setujui -->
      <button
        type="button"
        @click="handleApprove"
        class="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
      >
        <span class="material-symbols-outlined text-[18px]">check_circle</span>
        <span>Setujui Pengajuan</span>
      </button>
    </div>
  </div>
</template>