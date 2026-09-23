<script setup lang="ts">
import ApprovalHeader from '@/components/approval/approvalHeader.vue'
import ApprovalListPanel from '@/components/approval/approvalListPanel.vue'
import ApprovalDetailPanel from '@/components/approval/approvalDetailPanel.vue'
import ApprovalActionFooter from '@/components/approval/approvalActionFooter.vue'
</script>

<template>
  <div class="space-y-5 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Section -->
    <ApprovalHeader />

    <!-- Split 2-Column Layout (List Left + Detail Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Panel Kiri: List Pengajuan Menunggu (5 Span) -->
      <div class="lg:col-span-5">
        <ApprovalListPanel />
      </div>

      <!-- Panel Kanan: Detail & Otorisasi Action (7 Span) -->
      <div class="lg:col-span-7 space-y-4">
        <ApprovalDetailPanel />

        <!-- Sticky Footer Action Buttons -->
        <ApprovalActionFooter />
      </div>
    </div>
  </div>
</template>