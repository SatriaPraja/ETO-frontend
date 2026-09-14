<script setup lang="ts">
import EditBannerAlert from '@/components/history/edit/editBannerAlert.vue'
import EditActivityForm from '@/components/history/edit/editActivityForm.vue'
import EditTravelerTable from '@/components/history/edit/editTravelerTable.vue'
import EditDocumentUpload from '@/components/history/edit/editDocumentUpload.vue'
import EditFooterBar from '@/components/history/edit/editFooterBar.vue'
</script>

<template>
  <div class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden">
    <!-- Sub-header Breadcrumb -->
    <div class="flex items-center gap-1.5 text-xs text-textMuted">
      <span class="material-symbols-outlined text-[15px]">arrow_back</span>
      <span>Beranda</span>
      <span>›</span>
      <span>Riwayat Pengajuan</span>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Koreksi Travel Order</strong>
    </div>

    <!-- Title Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-textPrimary font-headline">Koreksi Travel Order – TO/2026/05/00187</h1>
      </div>
      <div class="flex items-center gap-3 text-xs">
        <span class="text-amber-800 font-bold flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Status: Dikembalikan</span>
        </span>
        <button type="button" class="text-textMuted hover:text-textPrimary flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">history</span>
          <span>Log Catatan</span>
        </button>
      </div>
    </div>

    <!-- 1. Banner Alert Alasan Dikembalikan -->
    <EditBannerAlert />

    <!-- 2. Form Informasi Kegiatan & Sprin -->
    <EditActivityForm />

    <!-- 3. Tabel Modifikasi Tanggal Perjalanan -->
    <EditTravelerTable />

    <!-- 4. Upload Dokumen Revisi -->
    <EditDocumentUpload />

    <!-- 5. Bottom Sticky Footer -->
    <EditFooterBar />
  </div>
</template>