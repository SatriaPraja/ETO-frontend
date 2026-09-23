<script setup lang="ts">
import PdfViewerHeader from '@/components/history/pdf/pdfViewerHeader.vue'
import PdfDocumentSheet from '@/components/history/pdf/pdfDocumentSheet.vue'
import PdfSidebarActions from '@/components/history/pdf/pdfSidebarActions.vue'
</script>

<template>
  <div class="space-y-4 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Breadcrumb Sub-Header -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <span class="material-symbols-outlined text-[15px]">arrow_back</span>
      <span>Beranda</span>
      <span>›</span>
      <span>Riwayat Pengajuan</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Cetak PDF Formulir e-TO</strong>
    </div>

    <!-- Main Layout Grid (PDF Viewer Left + Actions Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column: PDF Printable Sheet Viewer (8 Span) -->
      <div class="lg:col-span-8 bg-gray-950 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <!-- PDF Dark Header Bar -->
        <PdfViewerHeader />

        <!-- Scrollable Document Container -->
        <div class="p-4 sm:p-8 bg-gray-900/90 overflow-y-auto max-h-[85vh] flex justify-center">
          <PdfDocumentSheet />
        </div>
      </div>

      <!-- Right Column: Sidebar Status & Actions (4 Span) -->
      <div class="lg:col-span-4">
        <PdfSidebarActions />
      </div>
    </div>
  </div>
</template>