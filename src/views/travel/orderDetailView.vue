<script setup lang="ts">
import DetailHeader from '@/components/history/detail/detailHeader.vue'
import ActivitySummaryCard from '@/components/history/detail/activitySummaryCard.vue'
import ApprovalWorkflowCard from '@/components/history/detail/approvalWorkflowCard.vue'
import TravelerManifestCard from '@/components/history/detail/travelerManifestCard.vue'
import PolicyRulesCard from '@/components/history/detail/policyRulesCard.vue'
import BudgetRatioCard from '@/components/history/detail/budgetRatioCard.vue'
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Section (Breadcrumb, Status Badge, Action Buttons) -->
    <DetailHeader />

    <!-- 2 Column Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Main Column (2 Span) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 1. Ringkasan Kegiatan & Pembebanan Anggaran -->
        <ActivitySummaryCard />

        <!-- 2. Manifest Penerbangan & Personel -->
        <TravelerManifestCard />

        <!-- 3. Grand Total & Rasio Penggunaan Pagu -->
        <BudgetRatioCard />
      </div>

      <!-- Right Sidebar Column (1 Span) -->
      <div class="space-y-6">
        <!-- 1. Riwayat Persetujuan Workflow -->
        <ApprovalWorkflowCard />

        <!-- 2. Kebijakan & Ketentuan Tiket -->
        <PolicyRulesCard />
      </div>
    </div>
  </div>
</template>