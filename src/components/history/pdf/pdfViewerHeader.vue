<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="bg-gray-900 text-white px-4 py-2.5 rounded-t-xl flex items-center justify-between text-xs font-body shrink-0 border-b border-gray-800">
    <!-- Left Document Title -->
    <div class="flex items-center gap-2">
      <button type="button" @click="goBack" class="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors" title="Kembali">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
      </button>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-red-500 text-[18px]">picture_as_pdf</span>
        <span class="font-semibold text-gray-200">Formulir_eTO_TO-2026-05-00187.pdf</span>
        <span class="px-1.5 py-0.2 rounded bg-gray-800 text-[10px] text-gray-400 font-mono">PDF/A-1b</span>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-3 text-gray-300">
      <div class="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-[11px]">
        <button type="button" class="hover:text-white">-</button>
        <span class="px-1 font-bold text-white">100%</span>
        <button type="button" class="hover:text-white">+</button>
      </div>

      <span class="text-gray-600">|</span>

      <span class="text-[11px] text-gray-400">Hal <strong>1</strong> dari 2</span>

      <span class="text-gray-600">|</span>

      <div class="flex items-center gap-1">
        <button type="button" class="p-1 hover:bg-gray-800 rounded text-gray-300 hover:text-white" title="Fit to width">
          <span class="material-symbols-outlined text-[16px]">aspect_ratio</span>
        </button>
        <button type="button" class="p-1 hover:bg-gray-800 rounded text-gray-300 hover:text-white" title="Rotate">
          <span class="material-symbols-outlined text-[16px]">rotate_right</span>
        </button>
      </div>
    </div>
  </div>
</template>