<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryDetailStore } from '@/stores/historyDetailStore'

import PdfControlHeader from '@/components/history/pdf/pdfViewerHeader.vue'
import PdfSidebarInfo from '@/components/history/pdf/pdfSidebarActions.vue'
import PdfDocumentSheet from '@/components/history/pdf/pdfDocumentSheet.vue'

const route = useRoute()
const store = useHistoryDetailStore()

const zoomPercent = ref<number>(100)

// Konversi param URL TO-2026-09-99601 kembali menjadi TO/2026/09/99601
const toCodeParam = computed(() => {
  const param = (route.params.toCode || route.params.id) as string
  if (!param) return ''
  if (param.includes('-') && !param.includes('/')) {
    return param.replace(/-/g, '/')
  }
  return param
})

onMounted(async () => {
  if (toCodeParam.value) {
    await store.loadOrderDetail(toCodeParam.value)
  }
})
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="p-8 sm:p-12 text-center text-textMuted bg-surfaceCard rounded-xl border border-gray-100"
    >
      <span class="material-symbols-outlined animate-spin text-[32px] text-primary"
        >progress_activity</span
      >
      <p class="mt-2 text-xs font-semibold">Memuat dokumen PDF e-TO...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.errorMessage || !store.detail"
      class="p-6 sm:p-8 text-center text-rose-600 bg-surfaceCard rounded-xl border border-rose-100"
    >
      <span class="material-symbols-outlined text-[36px]">error</span>
      <p class="mt-2 text-xs font-bold">
        {{ store.errorMessage || 'Data Travel Order tidak ditemukan.' }}
      </p>
    </div>

    <!-- Main View Content -->
    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
        <!-- Main Canvas Area (Kiri - 2 Kolom) -->
        <div
          class="lg:col-span-2 space-y-0 shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex flex-col w-full min-w-0"
        >
          <PdfControlHeader
            :to-code="store.detail.toCode"
            v-model:zoom-percent="zoomPercent"
            :current-page="1"
            :total-pages="1"
          />

          <!-- 🟢 CANVAS SCROLLBOX RESPONSIF & SIMETRIS -->
          <div
            class="overflow-x-auto overflow-y-auto bg-gray-800/30 min-h-[60vh] sm:min-h-[75vh] w-full p-3 sm:p-8 flex justify-center items-start"
          >
            <div
              :style="{
                transform: `scale(${zoomPercent / 100})`,
                transformOrigin: 'top center',
              }"
              class="transition-transform duration-200 w-full sm:w-auto flex justify-center shrink-0"
            >
              <PdfDocumentSheet :detail="store.detail" />
            </div>
          </div>
        </div>

        <!-- Sidebar Area (Kanan - 1 Kolom) -->
        <div class="lg:col-span-1 space-y-4 w-full">
          <PdfSidebarInfo :detail="store.detail" />
        </div>
      </div>
    </div>
  </div>
</template>