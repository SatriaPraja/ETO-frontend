<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  toCode: string
  zoomPercent: number
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:zoomPercent', val: number): void
}>()

const router = useRouter()

function goBack() {
  router.back()
}

function zoomIn() {
  if (props.zoomPercent < 150) emit('update:zoomPercent', props.zoomPercent + 10)
}

function zoomOut() {
  if (props.zoomPercent > 50) emit('update:zoomPercent', props.zoomPercent - 10)
}
</script>

<template>
  <div class="bg-gray-900 text-white px-4 py-2.5 rounded-t-xl flex items-center justify-between text-xs font-body shrink-0 border-b border-gray-800 shadow-md">
    <!-- Left Document Title -->
    <div class="flex items-center gap-2">
      <button 
        type="button" 
        @click="goBack" 
        class="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer" 
        title="Kembali"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
      </button>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-red-500 text-[18px]">picture_as_pdf</span>
        <span class="font-semibold text-gray-200 font-mono">Formulir_eTO_{{ toCode?.replace(/\//g, '_') || 'Document' }}.pdf</span>
        <span class="px-1.5 py-0.2 rounded bg-gray-800 text-[10px] text-gray-400 font-mono">PDF/A-1b</span>
      </div>
    </div>

    <!-- Right Viewer Controls -->
    <div class="flex items-center gap-3 text-gray-300">
      <div class="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-[11px]">
        <button type="button" @click="zoomOut" class="hover:text-white px-1 font-bold cursor-pointer">-</button>
        <span class="px-1 font-bold text-white font-mono">{{ zoomPercent }}%</span>
        <button type="button" @click="zoomIn" class="hover:text-white px-1 font-bold cursor-pointer">+</button>
      </div>

      <span class="text-gray-600">|</span>

      <span class="text-[11px] text-gray-400">Hal <strong>{{ currentPage }}</strong> dari {{ totalPages }}</span>

      <span class="text-gray-600">|</span>

      <div class="flex items-center gap-1">
        <button type="button" @click="emit('update:zoomPercent', 100)" class="p-1 hover:bg-gray-800 rounded text-gray-300 hover:text-white cursor-pointer" title="Fit to width">
          <span class="material-symbols-outlined text-[16px]">aspect_ratio</span>
        </button>
      </div>
    </div>
  </div>
</template>