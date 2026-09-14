<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/master/vendors')
}

function saveVendor() {
  alert('Data Master Maskapai Berhasil Disimpan!')
  router.push('/master/vendors')
}
</script>

<template>
  <div class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-4 px-6 lg:px-8 flex items-center justify-between z-30 shadow-lg font-body">
    <button
      type="button"
      @click="goBack"
      class="px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
    >
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      <span>Kembali ke Daftar Master Maskapai</span>
    </button>

    <div class="flex items-center gap-2">
      <button
        type="button"
        @click="goBack"
        class="px-4 py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors cursor-pointer"
      >
        Batal
      </button>

      <button
        type="button"
        @click="saveVendor"
        class="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
      >
        <span class="material-symbols-outlined text-[18px]">check_circle</span>
        <span>Simpan Data Maskapai</span>
      </button>
    </div>
  </div>
</template>